import { SelectProps } from 'antd';
import { BaseOptionType, RefSelectProps } from 'antd/es/select';

export interface CustomSelectProps {
  route: string;
  antProps?: React.PropsWithChildren<SelectProps<any, BaseOptionType>> & React.RefAttributes<RefSelectProps>;
}

export interface BackendOption<T> {
  text: string;
  value: T;
  extra_text: string;
}
