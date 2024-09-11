import dayjs from 'dayjs';

export interface CurrencyHistoryResponse {
  amount: number;
  base: string;
  start_date: string;
  end_date: string;
  rates: {
    [key: string]: {
      [key: string]: number;
    };
  };
}

export interface CurrencyHistoryFilters {
  range: [dayjs.Dayjs, dayjs.Dayjs];
  fromCurrency: string;
  toCurrency: string[];
}

export interface GraphSerie {
  date: string;
  value: number;
  category: string;
}
