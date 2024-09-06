import { Button, Card, Col, Descriptions, Empty, Form, Row, Skeleton } from 'antd';
import { MaskedInput } from 'antd-mask-input';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { CepData, CepErrorResponse, CepForm } from './interfaces';
import { useForm } from 'antd/es/form/Form';
import useMessage from 'antd/es/message/useMessage';
import { useBoolean } from 'ahooks';
import { useState } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { css } from '@emotion/css';

export const Cep = () => {
  const [form] = useForm();
  const [message, contextHolder] = useMessage();
  const [loading, setLoading] = useBoolean(false);
  const [data, setData] = useState<CepData | null>(null);

  const fetchCepData = (cep: string) => {
    setLoading.setTrue();
    setData(null);

    axios
      .get(`${import.meta.env.VITE_BRASILAPI_URL}/cep/v2/${cep}`)
      .then((response: AxiosResponse<CepData>) => {
        setData(response.data);
      })
      .catch((error: AxiosError<CepErrorResponse>) => {
        console.error(error);

        if (!error.isAxiosError) {
          message.error('Ocorreu um erro interno');
          return;
        }

        switch (error.status) {
          case 404:
            message.error('Cep não localizado em nenhuma base de dados');
            break;
          case 400:
            form.setFields([
              {
                name: 'cep',
                errors: error.response?.data.errors.map((err) => err.message),
              },
            ]);
            break;
          default:
            message.error('Ocorreu um erro desconhecido');
            break;
        }
      })
      .finally(() => setLoading.setFalse());
  };

  const onFinish = (values: CepForm) => {
    fetchCepData(values.cep);
  };

  const map = (
    <MapContainer
      center={[Number(data?.location.coordinates.latitude) || 0, Number(data?.location.coordinates.longitude) || 0]}
      zoom={15}
      className={css`
        height: 30em;
      `}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={[Number(data?.location.coordinates.latitude) || 0, Number(data?.location.coordinates.longitude) || 0]}
      ></Marker>
    </MapContainer>
  );

  const cardDescription = (
    <Descriptions
      bordered
      layout="vertical"
      items={[
        {
          key: 'city',
          label: 'Cidade',
          children: data?.city,
        },
        {
          key: 'state',
          label: 'Estado',
          children: data?.state,
        },
        {
          key: 'neighborhood',
          label: 'Bairro',
          children: data?.neighborhood,
        },
        {
          key: 'street',
          label: 'Rua',
          children: data?.street,
        },
      ]}
    ></Descriptions>
  );

  return (
    <Row gutter={[16, 24]}>
      <Col span={24}>
        {contextHolder}
        <Form layout={'inline'} onFinish={onFinish} form={form} disabled={loading}>
          <Form.Item<CepForm>
            label="CEP"
            name="cep"
            rules={[
              { required: true, message: 'Favor digitar um CEP' },
              { len: 8, message: 'Cep deve ser 8 dígitos' },
            ]}
          >
            <MaskedInput
              mask={'00000-000'}
              onChange={(event) => {
                form.setFieldValue('cep', event.unmaskedValue);
                form.validateFields(['cep']);
              }}
              maskOptions={{ lazy: true }}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Procurar
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <Col span={12}>
        <Card title="Endereço" style={{ width: '100%' }}>
          <Skeleton active loading={loading}>
            {data ? cardDescription : <Empty></Empty>}
          </Skeleton>
        </Card>
      </Col>
      <Col span={12}>
        <Card title="Mapa" style={{ width: '100%' }}>
          <Skeleton active loading={loading}>
            {data ? map : <Empty></Empty>}
          </Skeleton>
        </Card>
      </Col>
    </Row>
  );
};
