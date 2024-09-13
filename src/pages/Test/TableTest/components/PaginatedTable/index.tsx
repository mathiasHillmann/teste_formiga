import { useBoolean } from 'ahooks';
import { Table, TablePaginationConfig, TableProps } from 'antd';
import { BaseOptionType } from 'antd/es/select';
import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthenticatedRequest } from '../../../../../hooks/useAuthenticatedRequest';
import { BackendResponse, PaginatedData } from '../../../../../interfaces/http.interface';
import { PaginatedTableProps } from './interfaces';

interface TableParams {
  pagination?: TablePaginationConfig;
  sortby?: string;
  orderby?: string;
}

export const PaginatedTable: React.FC<PaginatedTableProps> = ({
  route,
  requestParams,
  antProps,
}: PaginatedTableProps) => {
  const [data, setData] = useState<BaseOptionType[]>([]);
  const [loading, setLoading] = useBoolean(false);
  const { httpClient } = useAuthenticatedRequest();
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 25,
    },
  });

  const keepOnlyFieldsWithValues = (values: Record<string, any>): Record<string, any> => {
    return Object.fromEntries(Object.entries(values).filter(([_, value]) => value != null && value != ''));
  };

  useEffect(() => {
    setLoading.setTrue();

    httpClient()
      .get(route, {
        params: keepOnlyFieldsWithValues({
          ...requestParams,
          page: tableParams.pagination?.current,
          page_size: tableParams.pagination?.pageSize,
          sortby: tableParams.sortby,
          orderby: tableParams.orderby,
        }),
      })
      .then((response: AxiosResponse<BackendResponse<PaginatedData<any>>>) => {
        setData(response.data.data.data);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: response.data.data.total,
          },
        });
      })
      .finally(() => setLoading.setFalse());
  }, [
    tableParams.pagination?.current,
    tableParams.pagination?.pageSize,
    tableParams?.orderby,
    tableParams?.sortby,
    JSON.stringify(requestParams),
  ]);

  const handleTableChange: TableProps['onChange'] = (pagination: TablePaginationConfig, _, sorter) => {
    setTableParams({
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
      orderby: Array.isArray(sorter) ? undefined : sorter.field?.toString(),
      sortby: Array.isArray(sorter) ? undefined : sorter.order === 'ascend' ? 'asc' : 'desc',
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  return (
    <Table
      loading={loading}
      pagination={tableParams.pagination}
      dataSource={data}
      onChange={handleTableChange}
      {...antProps}
    />
  );
};
