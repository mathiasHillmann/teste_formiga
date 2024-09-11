import { useBoolean } from 'ahooks';
import useMessage from 'antd/es/message/useMessage';
import { BaseOptionType } from 'antd/es/select';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useState } from 'react';

export const useCurrencyOptions = () => {
  const [optionsLoading, setOptionsLoading] = useBoolean(false);
  const [currencyOptions, setCurrencyOptions] = useState<BaseOptionType[] | undefined>();
  const [message, contextHolder] = useMessage();

  const fetchOptions = () => {
    setOptionsLoading.setTrue();

    axios
      .get(`${import.meta.env.VITE_FRANKFURTER_URL}/currencies`)
      .then((response: AxiosResponse<Record<string, string>>) => {
        setCurrencyOptions(
          Object.entries(response.data).map(([key, value]: [string, string]) => ({ value: key, label: value })),
        );
      })
      .catch((error: AxiosError) => {
        console.error(error);

        if (!error.isAxiosError) {
          message.error('Ocorreu um erro interno ao buscar as moedas disponíveis');
          return;
        }

        message.error('Ocorreu um erro desconhecido ao buscar as moedas disponíveis');
      })
      .finally(() => setOptionsLoading.setFalse());
  };

  return { fetchOptions, optionsLoading, currencyOptions, contextHolder, message };
};
