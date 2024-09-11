import dayjs from 'dayjs';

export interface CurrencyConversionForm {
  fromValue: number;
  fromCurrency: string;
  toCurrency: string;
  conversionDate: dayjs.Dayjs;
}

export interface CurrencyConversionResponse {
  amount: number;
  base: string;
  date: string;
  rates: {
    [key: string]: number;
  };
}
