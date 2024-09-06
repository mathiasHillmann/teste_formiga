import { useBoolean, useRequest } from 'ahooks';
import { Card, Col, Descriptions, Empty, Form, Row, Select, Skeleton } from 'antd';
import { useForm } from 'antd/es/form/Form';
import useMessage from 'antd/es/message/useMessage';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useState } from 'react';
import { FipeData, FipeForm, FipeModelResponse, FipeOption } from './interfaces';
import { DefaultOptionType } from 'antd/es/select';

export const Fipe = () => {
  const [form] = useForm();
  const [message, contextHolder] = useMessage();
  const [loading, setLoading] = useBoolean(false);
  const [data, setData] = useState<FipeData | null>(null);
  const ZeroKM: string = '32000';

  const {
    data: brandData,
    loading: brandLoading,
    run: brandRun,
  } = useRequest(
    () => {
      const type: string = form.getFieldValue('type');

      return axios.get<FipeOption[]>(`${import.meta.env.VITE_FIPE_URL}/${type}/marcas`);
    },
    {
      manual: true,
    },
  );

  const {
    data: modelData,
    loading: modelLoading,
    run: modelRun,
  } = useRequest(
    () => {
      const type: string = form.getFieldValue('type');
      const brand: string = form.getFieldValue('brand');

      return axios.get<FipeModelResponse>(`${import.meta.env.VITE_FIPE_URL}/${type}/marcas/${brand}/modelos`);
    },
    {
      manual: true,
    },
  );

  const {
    data: yearsData,
    loading: yearsLoading,
    run: yearsRun,
  } = useRequest(
    () => {
      const type: string = form.getFieldValue('type');
      const brand: string = form.getFieldValue('brand');
      const model: string = form.getFieldValue('model');

      return axios.get<FipeOption[]>(`${import.meta.env.VITE_FIPE_URL}/${type}/marcas/${brand}/modelos/${model}/anos`);
    },
    {
      manual: true,
    },
  );

  const fetchFipeData = () => {
    setLoading.setTrue();
    setData(null);

    const type: string = form.getFieldValue('type');
    const brand: string = form.getFieldValue('brand');
    const model: string = form.getFieldValue('model');
    const year: string = form.getFieldValue('year');

    axios
      .get(`${import.meta.env.VITE_FIPE_URL}/${type}/marcas/${brand}/modelos/${model}/anos/${year}`)
      .then((response: AxiosResponse<FipeData>) => {
        setData(response.data);
      })
      .catch((error: AxiosError) => {
        console.error(error);

        if (error.isAxiosError && error.response?.status === 500) {
          message.error('Ocorreu um erro na API da FIPE');
        } else {
          message.error('Ocorreu um erro desconhecido');
        }
      })
      .finally(() => setLoading.setFalse());
  };

  const onFinish = (values: FipeForm) => {
    console.log(values);
    fetchFipeData();
  };

  const selectSearch = (input: string, option: any) =>
    ((option?.label as string) ?? '').toLowerCase().includes(input.toLowerCase());

  const fipeOptionsToOptions = (
    options: FipeOption[] | undefined,
    renameFn?: (option: FipeOption) => string,
  ): DefaultOptionType[] => {
    if (!options) {
      return [];
    }

    return options.map((option: FipeOption) => ({
      label: renameFn ? renameFn(option) : option.nome,
      value: option.codigo,
    }));
  };

  const cardDescription = (
    <Descriptions
      bordered
      layout="vertical"
      items={[
        {
          key: 'code',
          label: 'Código FIPE',
          children: data?.CodigoFipe,
        },
        {
          key: 'brand',
          label: 'Marca',
          children: data?.Marca,
        },
        {
          key: 'model',
          label: 'Modelo',
          children: data?.Modelo,
        },
        {
          key: 'year',
          label: 'Ano',
          children: data?.AnoModelo === Number(ZeroKM) ? 'Zero KM' : data?.AnoModelo,
        },
        {
          key: 'value',
          label: 'Valor',
          children: data?.Valor,
        },
        {
          key: 'fuelType',
          label: 'Combustivel',
          children: data?.Combustivel,
        },
        {
          key: 'reference',
          label: 'Mês de referência',
          children: data?.MesReferencia,
        },
      ]}
    ></Descriptions>
  );

  return (
    <Row gutter={[16, 24]}>
      <Col span={24}>
        {contextHolder}
        <Form layout={'inline'} onFinish={onFinish} form={form} disabled={loading}>
          <Form.Item<FipeForm> name="type" rules={[{ required: true, message: 'Favor selecionar um tipo de veículo' }]}>
            <Select
              placeholder="Tipo de veículo"
              style={{ width: '10em' }}
              options={[
                { label: 'Carros', value: 'carros' },
                { label: 'Motos', value: 'motos' },
                { label: 'Caminhões', value: 'caminhoes' },
              ]}
              onChange={(option) => {
                if (option) {
                  form.setFieldsValue({
                    brand: null,
                    model: null,
                    year: null,
                  });

                  brandRun();
                }
              }}
            ></Select>
          </Form.Item>
          <Form.Item<FipeForm> name="brand" rules={[{ required: true, message: 'Favor selecionar uma marca' }]}>
            <Select
              loading={brandLoading}
              placeholder="Marca"
              style={{ width: '15em' }}
              showSearch={true}
              filterOption={selectSearch}
              disabled={!brandData}
              options={fipeOptionsToOptions(brandData?.data)}
              onChange={(option) => {
                if (option) {
                  form.setFieldsValue({
                    model: null,
                    year: null,
                  });

                  modelRun();
                }
              }}
            ></Select>
          </Form.Item>
          <Form.Item<FipeForm> name="model" rules={[{ required: true, message: 'Favor selecionar um modelo' }]}>
            <Select
              loading={modelLoading}
              placeholder="Modelo"
              style={{ width: '20em' }}
              showSearch={true}
              filterOption={selectSearch}
              disabled={!modelData}
              options={fipeOptionsToOptions(modelData?.data?.modelos)}
              onChange={(option) => {
                if (option) {
                  form.setFieldsValue({
                    year: null,
                  });

                  yearsRun();
                }
              }}
            ></Select>
          </Form.Item>
          <Form.Item<FipeForm> name="year" rules={[{ required: true, message: 'Favor selecionar um ano' }]}>
            <Select
              loading={yearsLoading}
              placeholder="Ano"
              style={{ width: '20em' }}
              showSearch={true}
              filterOption={selectSearch}
              disabled={!yearsData}
              options={fipeOptionsToOptions(yearsData?.data, (option) => option.nome.replace(ZeroKM, 'Zero KM'))}
              onChange={(option) => {
                if (option) {
                  fetchFipeData();
                }
              }}
            ></Select>
          </Form.Item>
        </Form>
      </Col>
      <Col span={12}>
        <Card title="Veículo" style={{ width: '100%' }}>
          <Skeleton active loading={loading}>
            {data ? cardDescription : <Empty></Empty>}
          </Skeleton>
        </Card>
      </Col>
    </Row>
  );
};
