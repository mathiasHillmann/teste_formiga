import { Badge, Calendar } from 'antd';
import useMessage from 'antd/es/message/useMessage';
import { CalendarProps } from 'antd/lib';
import axios, { AxiosError, AxiosResponse } from 'axios';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Holyday, HolydayErrorResponse } from './interfaces';
import './styles.scss';

export const Holydays = () => {
  const [message, contextHolder] = useMessage();
  const [data, setData] = useState<Holyday[] | null>(null);
  const [year, setYear] = useState<number>(dayjs().year());

  const fetchHolydaysData = () => {
    setData(null);

    axios
      .get(`${import.meta.env.VITE_BRASILAPI_URL}/feriados/v1/${year}`)
      .then((response: AxiosResponse<Holyday[]>) => {
        setData([
          ...response.data,
          {
            date: `${year}-01-06`,
            name: 'Aniversário de Criciúma',
            type: 'municipal',
          },
          {
            date: `${year}-12-04`,
            name: 'Santa Bárbara',
            type: 'municipal',
          },
        ]);
      })
      .catch((error: AxiosError<HolydayErrorResponse>) => {
        console.error(error);

        if (!error.isAxiosError) {
          message.error('Ocorreu um erro interno');
          return;
        }

        switch (error.status) {
          case 404:
            message.error('Ano não localizado na base de dados de feriados');
            break;
          default:
            message.error('Ocorreu um erro desconhecido');
            break;
        }
      });
  };

  useEffect(() => fetchHolydaysData(), [year]);

  const monthCellRender = (month: Dayjs) => {
    const holyDaysInMonth = data?.filter((holyday) => dayjs(holyday.date).month() === month.month());

    return holyDaysInMonth ? (
      <div className="notes-month">
        <section>{holyDaysInMonth.length}</section>
        <span>Feriado{holyDaysInMonth.length != 1 ? 's' : ''}</span>
      </div>
    ) : null;
  };

  const dateCellRender = (date: Dayjs) => {
    const holyDaysInDate = data?.filter((holyday) => holyday.date === date.format('YYYY-MM-DD'));

    return (
      <ul className="events">
        {holyDaysInDate?.map((holyday) => (
          <li key={holyday.name}>
            <Badge status={holyday.type === 'national' ? 'success' : 'processing'} text={holyday.name} />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };

  const onChange = (value: Dayjs) => {
    if (value.year() != year) {
      setYear(value.year());
    }
  };

  return (
    <>
      {contextHolder}
      <Calendar onChange={onChange} cellRender={cellRender} style={{ padding: '1em' }} />
    </>
  );
};
