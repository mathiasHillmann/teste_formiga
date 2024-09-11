import { useBoolean } from 'ahooks';
import { Dropdown, MenuProps, Space, Table, Tag, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import useMessage from 'antd/es/message/useMessage';
import { TableProps } from 'antd/lib';
import axios, { AxiosError, AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { Broker } from './interfaces';
import { formatCnpjCpf } from '../../../helpers/string.helper';
import dayjs from 'dayjs';
import useModal from '../../../hooks/useModal';
import { BrokerModal } from './components/modal';
import { BrokerModalData } from './components/modal/interfaces';

export const Brokers: React.FC = () => {
  const [message, contextHolder] = useMessage();
  const [loading, setLoading] = useBoolean(false);
  const [data, setData] = useState<Broker[] | undefined>();
  const { isOpen, data: modalData, handleClose, handleOpen } = useModal<BrokerModalData>();

  const fetchData = () => {
    setLoading.setTrue();

    axios
      .get(`${import.meta.env.VITE_BRASILAPI_URL}/cvm/corretoras/v1`)
      .then((response: AxiosResponse<Broker[]>) => {
        setData(response.data);
      })
      .catch((error: AxiosError) => {
        console.error(error);

        if (!error.isAxiosError) {
          message.error('Ocorreu um erro interno');
          return;
        }

        message.error('Ocorreu um erro desconhecido');
      })
      .finally(() => setLoading.setFalse());
  };

  useEffect(() => {
    fetchData();
  }, []);

  const statusColor = (status: string): string => {
    switch (status) {
      case 'CANCELADA':
        return 'red';
      case 'EM FUNCIONAMENTO NORMAL':
        return 'green';
      case 'LIQUIDAÇÃO EXTRAJUDICIAL':
        return 'gold';
      case 'INCORPORAÇÃO':
        return 'blue';
    }

    return '';
  };

  const getActions = (row: Broker): MenuProps['items'] => {
    return [
      {
        key: 'visualizar',
        label: 'Visualizar',
        onClick: () => handleOpen({ cnpj: row.cnpj, nome: row.nome_comercial || row.nome_social }),
      },
    ];
  };

  const columns: TableProps<Broker>['columns'] = [
    {
      title: 'Código',
      dataIndex: 'codigo_cvm',
      key: 'codigo_cvm',
      width: '7em',
      sorter: (a: Broker, b: Broker): number => Number(a.codigo_cvm) - Number(b.codigo_cvm),
    },
    {
      title: 'CNPJ',
      dataIndex: 'cnpj',
      key: 'cnpj',
      width: '12em',
      sorter: (a: Broker, b: Broker): number => a.cnpj.localeCompare(b.cnpj),
      render: (text) => <Typography.Text>{formatCnpjCpf(text)}</Typography.Text>,
    },
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
      defaultSortOrder: 'ascend',
      sorter: (a: Broker, b: Broker): number => a.nome_comercial.localeCompare(b.nome_comercial),
      render: (_, row) => <Typography.Text>{row.nome_comercial || row.nome_social}</Typography.Text>,
    },
    {
      title: 'Situação',
      dataIndex: 'status',
      key: 'status',
      width: '18em',
      sorter: (a: Broker, b: Broker): number => a.status.localeCompare(b.status),
      render: (text) => <Tag color={statusColor(text)}>{text}</Tag>,
    },
    {
      title: 'Data de registro',
      dataIndex: 'data_registro',
      key: 'data_registro',
      width: '9em',
      sorter: (a: Broker, b: Broker): number => a.data_registro.localeCompare(b.data_registro),
      render: (text) => <Typography.Text>{dayjs(text).format('DD/MM/YYYY') || 'Sem dados'}</Typography.Text>,
    },
    {
      title: 'Data da situação',
      dataIndex: 'data_inicio_situacao',
      key: 'data_inicio_situacao',
      width: '9em',
      sorter: (a: Broker, b: Broker): number => a.data_inicio_situacao.localeCompare(b.data_inicio_situacao),
      render: (text) => <Typography.Text>{dayjs(text).format('DD/MM/YYYY') || 'Sem dados'}</Typography.Text>,
    },
    {
      title: 'Ações',
      key: 'actions',
      width: '7em',
      render: (_, record) => (
        <Dropdown menu={{ items: getActions(record) }}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              Ações
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      ),
    },
  ];

  return (
    <>
      <BrokerModal isOpen={isOpen} onModalClose={handleClose} data={modalData}></BrokerModal>
      {contextHolder}
      <Table
        bordered
        rowKey={(record) => record.codigo_cvm}
        scroll={{ y: 'calc(65vh - 4em)' }}
        loading={loading}
        columns={columns}
        dataSource={data}
      />
    </>
  );
};
