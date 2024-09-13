import { TableProps } from 'antd/lib';
import type { Reference } from 'rc-table';

export interface PaginatedTableProps {
  route: string;
  requestParams: Record<string, any>;
  antProps?: React.PropsWithChildren<TableProps<any>> & React.RefAttributes<Reference>;
}
