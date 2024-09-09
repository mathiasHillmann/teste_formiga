import { Descriptions, Divider, Empty, Modal, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import { CorretoraModalProps } from './interfaces';
import { useBoolean } from 'ahooks';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Corretora } from '../../interfaces';
import useMessage from 'antd/es/message/useMessage';
import { formatCnpjCpf } from '../../../../../helpers/string.helper';
import dayjs from 'dayjs';

export const ModalCorretora: React.FC<CorretoraModalProps> = ({
  isOpen,
  data: modalData,
  onModalClose,
}: CorretoraModalProps) => {
  const [loading, setLoading] = useBoolean(false);
  const [data, setData] = useState<Corretora | null>(null);
  const [message, contextHolder] = useMessage();

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  const fetchData = () => {
    setLoading.setTrue();

    axios
      .get(`${import.meta.env.VITE_BRASILAPI_URL}/cvm/corretoras/v1/${modalData?.cnpj}`)
      .then((response: AxiosResponse<Corretora>) => {
        setData(response.data);
      })
      .catch((error: AxiosError) => {
        console.error(error);

        if (!error.isAxiosError) {
          message.error('Ocorreu um erro interno');
          return;
        }

        if (error.response?.status === 404) {
          message.error('Corretora não encontrada na base de dados');
          return;
        }

        message.error('Ocorreu um erro desconhecido');
      })
      .finally(() => setLoading.setFalse());
  };

  const formatDate = (text: string): string => {
    return dayjs(text).format('DD/MM/YYYY') || 'Sem dados';
  };

  return (
    <>
      {contextHolder}
      <Modal
        title={`Dados da corretora ${modalData?.nome}`}
        open={isOpen}
        onCancel={onModalClose}
        width={'80em'}
        okButtonProps={{ style: { display: 'none' } }}
        cancelText={'Fechar'}
        styles={{ body: { overflowY: 'auto', maxHeight: 'calc(100vh - 25em)' } }}
      >
        <Skeleton loading={loading}>
          {data ? (
            <>
              <Divider orientation="left" style={{ marginTop: '2em' }}>
                Dados da corretora
              </Divider>
              <Descriptions
                bordered
                layout="vertical"
                items={[
                  {
                    key: 'codigo_cvm',
                    label: 'Código CVM',
                    children: data?.codigo_cvm,
                  },
                  {
                    key: 'cnpj',
                    label: 'CNPJ',
                    children: formatCnpjCpf(data?.cnpj),
                  },
                  {
                    key: 'nome_social',
                    label: 'Nome social',
                    children: data?.nome_social,
                  },
                  {
                    key: 'nome_comercial',
                    label: 'Nome comercial',
                    children: data?.nome_comercial,
                  },
                  {
                    key: 'status',
                    label: 'Situação',
                    children: data?.status,
                  },
                  {
                    key: 'type',
                    label: 'Tipo de corretora',
                    children: data?.type,
                  },
                  {
                    key: 'email',
                    label: 'E-mail',
                    children: data?.email,
                  },
                  {
                    key: 'telefone',
                    label: 'Telefone',
                    children: data?.telefone,
                  },
                  {
                    key: 'data_registro',
                    label: 'Data do registro',
                    children: formatDate(data?.data_registro),
                  },
                  {
                    key: 'data_inicio_situacao',
                    label: 'Data da situação',
                    children: formatDate(data?.data_inicio_situacao),
                  },
                  {
                    key: 'valor_patrimonio_liquido',
                    label: 'Valor do patrimonio líquido',
                    children: Number(data?.valor_patrimonio_liquido).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }),
                  },
                ]}
              ></Descriptions>
              <Divider orientation="left" style={{ marginTop: '2em' }}>
                Endereço
              </Divider>
              <Descriptions
                bordered
                layout="vertical"
                items={[
                  {
                    key: 'cep',
                    label: 'CEP',
                    children: data?.cep,
                  },
                  {
                    key: 'uf',
                    label: 'UF',
                    children: data?.uf,
                  },
                  {
                    key: 'municipio',
                    label: 'Município',
                    children: data?.municipio,
                  },
                  {
                    key: 'bairro',
                    label: 'Bairro',
                    children: data?.bairro,
                  },
                  {
                    key: 'logradouro',
                    label: 'Logradouro',
                    children: data?.logradouro,
                  },
                  {
                    key: 'complemento',
                    label: 'Complemento',
                    children: data?.complemento,
                  },
                ]}
              ></Descriptions>
            </>
          ) : (
            <Empty></Empty>
          )}
        </Skeleton>
      </Modal>
    </>
  );
};
