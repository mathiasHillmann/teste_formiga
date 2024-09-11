import { useBoolean, useDebounceFn } from 'ahooks';
import { Card, Col, DatePicker, Empty, Form, Row, Select, Skeleton } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect, useState } from 'react';
import { useCurrencyOptions } from '../useCurrencyOptions';
import { CurrencyHistoryFilters, CurrencyHistoryResponse, GraphSerie } from './interface';
import { Rule } from 'antd/es/form';
import dayjs from 'dayjs';
import { Line } from '@ant-design/charts';
import { AntLineConfig } from '../../../types/types';
import axios, { AxiosError, AxiosResponse } from 'axios';

export const CurrencyValueHistory: React.FC = () => {
  const [form] = useForm();
  const [data, setData] = useState<GraphSerie[] | undefined>();
  const [loading, setLoading] = useBoolean(false);
  const { fetchOptions, optionsLoading, currencyOptions, contextHolder, message } = useCurrencyOptions();

  const validationSchema: Record<keyof CurrencyHistoryFilters, Rule[]> = {
    fromCurrency: [{ required: true, message: 'Obrigatório' }],
    toCurrency: [{ required: true, message: 'Obrigatório' }],
    range: [{ required: true, message: 'Obrigatório' }],
  };
  const initialFilters: Record<keyof CurrencyHistoryFilters, any> = {
    fromCurrency: 'USD',
    toCurrency: ['BRL'],
    range: [dayjs().subtract(3, 'month'), dayjs()],
  };

  const { run } = useDebounceFn(
    () => {
      fetchData();
    },
    {
      wait: 500,
    },
  );

  const fetchData = () => {
    setLoading.setTrue();

    const formValues: CurrencyHistoryFilters = form.getFieldsValue();

    const [startDate, endDate] = formValues.range;

    const queryParams = new URLSearchParams({
      from: form.getFieldValue('fromCurrency'),
      to: form.getFieldValue('toCurrency').join(','),
    }).toString();

    axios
      .get(
        `${import.meta.env.VITE_FRANKFURTER_URL}/${startDate.format('YYYY-MM-DD')}..${endDate.format(
          'YYYY-MM-DD',
        )}?${queryParams}`,
      )
      .then((response: AxiosResponse<CurrencyHistoryResponse>) => {
        let graphData: GraphSerie[] = [];

        Object.entries(response.data.rates).forEach(([date, currencies]: [string, Record<string, any>]) => {
          graphData.push(
            ...Object.entries(currencies).map(([currency, value]: [string, number]) => ({
              category: currency,
              date: dayjs(date).format('DD/MM/YYYY'),
              value,
            })),
          );
        });

        setData(graphData);
      })
      .catch((error: AxiosError) => {
        console.error(error);

        if (!error.isAxiosError) {
          message.error('Ocorreu um erro interno');
          return;
        }

        if (error.response?.status === 404) {
          message.error('Faixa de data não encontrada na base de dados');
          return;
        }

        message.error('Ocorreu um erro desconhecido');
      })
      .finally(() => setLoading.setFalse());
  };

  const getGraphConfig = (): AntLineConfig => {
    return {
      data,
      xField: 'date',
      yField: 'value',
      colorField: 'category',
      style: {
        lineWidth: 2,
      },
      axis: {
        y: {
          labelFormatter: '.2f',
        },
      },
    };
  };

  useEffect(() => {
    fetchOptions();
    fetchData();
  }, []);

  return (
    <>
      {contextHolder}
      <Row gutter={[16, 24]}>
        <Col span={24}>
          <div>
            <Form layout="inline" form={form} onValuesChange={run} initialValues={initialFilters}>
              <Form.Item<CurrencyHistoryFilters> name="range" rules={validationSchema.range}>
                <DatePicker.RangePicker format={'DD/MM/YYYY'} />
              </Form.Item>
              <Form.Item<CurrencyHistoryFilters>
                name="fromCurrency"
                label="Moeda base"
                rules={validationSchema.fromCurrency}
              >
                <Select
                  options={currencyOptions}
                  showSearch={true}
                  loading={optionsLoading}
                  style={{ width: '15em' }}
                />
              </Form.Item>
              <Form.Item<CurrencyHistoryFilters>
                name="toCurrency"
                label="Converter para"
                rules={validationSchema.toCurrency}
              >
                <Select
                  mode="multiple"
                  options={currencyOptions}
                  showSearch={true}
                  loading={optionsLoading}
                  style={{ width: '15em' }}
                />
              </Form.Item>
            </Form>
          </div>
        </Col>
        <Col span={24}>
          <Card>
            <Skeleton active loading={loading}>
              {data ? <Line {...getGraphConfig()} /> : <Empty></Empty>}
            </Skeleton>
          </Card>
        </Col>
      </Row>
    </>
  );
};
