import React, { useState } from 'react';
import { PaginatedTable } from './components/PaginatedTable';
import { Client, ClientFilters } from './interfaces';
import { Button, Form, Input, TableProps, Tag, Typography } from 'antd';
import { formatCnpjCpf } from '../../../helpers/string.helper';
import { useForm } from 'antd/es/form/Form';
import { useDebounceFn } from 'ahooks';
import './styles.scss';

export const TableTest: React.FC = () => {
  const [form] = useForm();
  const [filters, setFilters] = useState<Record<string, any>>({});

  const { run } = useDebounceFn(
    () => {
      setFilters(form.getFieldsValue());
    },
    {
      wait: 500,
    },
  );

  const columns: TableProps<Client>['columns'] = [
    {
      title: 'Identificador',
      dataIndex: 'id',
      key: 'id',
      sorter: true,
      hidden: true,
    },
    {
      title: 'Razão social',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
    },
    {
      title: 'Fantasia',
      dataIndex: 'fantasy',
      key: 'fantasy',
      sorter: true,
    },
    {
      title: 'CNPJ',
      dataIndex: 'cnpj',
      key: 'cnpj',
      sorter: true,
      render: (cnpj) => <Typography.Text>{formatCnpjCpf(cnpj)}</Typography.Text>,
    },
    {
      title: 'Situação',
      dataIndex: 'active',
      key: 'active',
      width: '8em',
      sorter: true,
      render: (active) => (active ? <Tag color="green">Ativo</Tag> : <Tag color="red">Inativo</Tag>),
    },
  ];

  return (
    <div>
      <div className="filter">
        <Form layout="inline" form={form} onValuesChange={run}>
          <Form.Item<ClientFilters> name="search">
            <Input placeholder="Procurar" allowClear={true} style={{ width: '20em' }} />
          </Form.Item>
        </Form>
        <div className="spacer"></div>
        <div className="actions">
          <Button type="primary" onClick={() => alert('Aqui abriria uma modal')}>
            Novo
          </Button>
        </div>
      </div>
      <PaginatedTable
        route="clients"
        requestParams={filters}
        antProps={{ bordered: true, scroll: { y: 'calc(65vh - 4em)' }, columns }}
      />
    </div>
  );
};
