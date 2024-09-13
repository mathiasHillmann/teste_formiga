import React, { useEffect, useState } from 'react';
import { BackendOption, CustomSelectProps } from './interfaces';
import { Select, Typography } from 'antd';
import { BaseOptionType } from 'antd/es/select';
import { useAuthenticatedRequest } from '../../../../../hooks/useAuthenticatedRequest';
import { AxiosResponse } from 'axios';
import { BackendResponse } from '../../../../../interfaces/http.interface';
import { useBoolean } from 'ahooks';

export const CustomSelect: React.FC<CustomSelectProps> = ({ route, antProps }: CustomSelectProps) => {
  const [options, setOptions] = useState<BaseOptionType[]>([]);
  const [loading, setLoading] = useBoolean(false);
  const { httpClient } = useAuthenticatedRequest();

  useEffect(() => {
    setLoading.setTrue();

    httpClient()
      .get(route)
      .then((response: AxiosResponse<BackendResponse<BackendOption<number>[]>>) => {
        setOptions(
          response.data.data.map((o) => ({
            value: o.value,
            label: (
              <>
                <Typography.Text>{o.text}</Typography.Text>{' '}
                <Typography.Text disabled style={{ fontSize: '0.75em' }}>
                  {o.extra_text}
                </Typography.Text>
              </>
            ),
          })),
        );
      })
      .finally(() => setLoading.setFalse());
  }, []);

  return <Select loading={loading} options={options} {...antProps} />;
};
