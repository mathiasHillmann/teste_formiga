import { useBoolean } from 'ahooks';
import { Button, Col, Form, Row } from 'antd';
import { MaskedInput } from 'antd-mask-input';
import { useForm } from 'antd/es/form/Form';
import useMessage from 'antd/es/message/useMessage';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useState } from 'react';
import { CnpjErrorResponse, CnpjForm } from './interfaces';
import { ModalCnpj } from './components/modal';

export const Cnpj: React.FC = () => {
  const [form] = useForm();
  const [message, contextHolder] = useMessage();
  const [loading, setLoading] = useBoolean(false);
  const [data, setData] = useState<Record<string, any> | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const fetchCnpjData = (cnpj: string) => {
    setLoading.setTrue();
    setData(null);

    axios
      .get(`${import.meta.env.VITE_BRASILAPI_URL}/cnpj/v1/${cnpj}`)
      .then((response: AxiosResponse<Record<string, any>>) => {
        setData(response.data);
        setIsOpen(true);
      })
      .catch((error: AxiosError<CnpjErrorResponse>) => {
        console.error(error);

        if (!error.isAxiosError || !error.response?.data) {
          message.error('Ocorreu um erro interno');
          return;
        }

        switch (error.status) {
          case 400:
            form.setFields([
              {
                name: 'cnpj',
                errors: [error.response?.data.message],
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

  const onFinish = (values: CnpjForm) => {
    fetchCnpjData(values.cnpj);
  };

  const onModalClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <ModalCnpj isOpen={isOpen} data={data} onModalClose={onModalClose}></ModalCnpj>
      <Row gutter={[16, 24]}>
        <Col span={24}>
          {contextHolder}
          <Form layout={'inline'} onFinish={onFinish} form={form} disabled={loading}>
            <Form.Item<CnpjForm>
              label="CNPJ"
              name="cnpj"
              rules={[
                { required: true, message: 'Favor digitar um CNPJ' },
                { len: 14, message: 'Cep deve ser 14 dígitos' },
              ]}
            >
              <MaskedInput
                mask={'00.000.000/0000-00'}
                onChange={(event) => {
                  form.setFieldValue('cnpj', event.unmaskedValue);
                  form.validateFields(['cnpj']);
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
      </Row>
    </>
  );
};
