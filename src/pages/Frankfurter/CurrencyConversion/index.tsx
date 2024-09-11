import { useBoolean } from 'ahooks';
import { Button, Card, Col, DatePicker, Form, InputNumber, Row, Space } from 'antd';
import { Rule } from 'antd/es/form';
import { useForm } from 'antd/es/form/Form';
import { Select } from 'antd/lib';
import axios, { AxiosError, AxiosResponse } from 'axios';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useCurrencyOptions } from '../useCurrencyOptions';
import { CurrencyConversionForm, CurrencyConversionResponse } from './interfaces';

export const CurrencyConversion: React.FC = () => {
  const [form] = useForm();
  const [loading, setLoading] = useBoolean(false);
  const [convertedValue, setConvertedValue] = useState<string>();
  const { fetchOptions, optionsLoading, currencyOptions, contextHolder, message } = useCurrencyOptions();

  const earliestConversionDate = dayjs('1999-01-04');

  const validationSchema: Record<keyof CurrencyConversionForm, Rule[]> = {
    fromCurrency: [{ required: true, message: 'Obrigatório' }],
    fromValue: [{ required: true, message: 'Obrigatório' }],
    toCurrency: [{ required: true, message: 'Obrigatório' }],
    conversionDate: [{ required: true, message: 'Obrigatório' }],
  };

  const fetchConvertedValue = () => {
    setLoading.setTrue();

    const queryDate = form.getFieldValue('conversionDate').format('YYYY-MM-DD');

    const queryParams = new URLSearchParams({
      amount: form.getFieldValue('fromValue') as unknown as string,
      from: form.getFieldValue('fromCurrency'),
      to: form.getFieldValue('toCurrency'),
    }).toString();

    axios
      .get(`${import.meta.env.VITE_FRANKFURTER_URL}/${queryDate}?${queryParams}`)
      .then((response: AxiosResponse<CurrencyConversionResponse>) => {
        setConvertedValue(`${Object.values(response?.data.rates)[0]} ${form.getFieldValue('toCurrency')}`);
      })
      .catch((error: AxiosError) => {
        console.error(error);

        if (!error.isAxiosError) {
          message.error('Ocorreu um erro interno');
          return;
        }

        if (error.response?.status === 404) {
          message.error('Data de conversão não encontrada na base de dados');
          return;
        }

        message.error('Ocorreu um erro desconhecido');
      })
      .finally(() => setLoading.setFalse());
  };

  useEffect(() => {
    fetchOptions();
    fetchConvertedValue();
  }, []);

  const onFinish = () => {
    fetchConvertedValue();
  };

  return (
    <>
      {contextHolder}
      <Row gutter={[16, 24]}>
        <Col span={8}>
          <Card>
            <Form
              layout="vertical"
              form={form}
              onFinish={onFinish}
              initialValues={{ fromCurrency: 'USD', toCurrency: 'BRL', fromValue: 1, conversionDate: dayjs() }}
            >
              <Form.Item<CurrencyConversionForm>
                name="fromCurrency"
                label="Moeda"
                rules={validationSchema.fromCurrency}
              >
                <Select options={currencyOptions} showSearch={true} loading={optionsLoading} style={{ width: '50%' }} />
              </Form.Item>
              <Form.Item<CurrencyConversionForm> name="fromValue" label="Valor" rules={validationSchema.fromValue}>
                <InputNumber decimalSeparator="," style={{ width: '50%' }} />
              </Form.Item>
              <Form.Item<CurrencyConversionForm>
                name="toCurrency"
                label="Converter para"
                rules={validationSchema.toCurrency}
              >
                <Select options={currencyOptions} showSearch={true} loading={optionsLoading} style={{ width: '50%' }} />
              </Form.Item>
              <Form.Item<CurrencyConversionForm>
                name="conversionDate"
                label="Data de conversão"
                rules={validationSchema.conversionDate}
              >
                <DatePicker style={{ width: '50%' }} format={'DD/MM/YYYY'} minDate={earliestConversionDate} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" disabled={loading}>
                  Converter
                </Button>
              </Form.Item>
              <Space>{convertedValue ? <span>Valor convertido: {convertedValue}</span> : <></>}</Space>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};
