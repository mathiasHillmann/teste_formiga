import { useRequest } from 'ahooks';
import { PopulacaoFaixaProps } from './interfaces';
import { GraphSerie, IBGEData } from '../../interfaces';
import axios from 'axios';
import { Card, Empty } from 'antd';
import { Line } from '@ant-design/charts';
import { AntLineConfig } from '../../../../../types/types';

export const PopulacaoFaixa: React.FC<PopulacaoFaixaProps> = ({ route, title }: PopulacaoFaixaProps) => {
  const { data: data, loading: loading } = useRequest(() => {
    return axios.get<IBGEData[]>(`${import.meta.env.VITE_IBGE_URL}${route}`);
  });

  const getGraphConfig = (data: IBGEData[]): AntLineConfig => {
    let graphData: GraphSerie[] = [];

    data[0].resultados.forEach((resultado) => {
      const category: string = Object.values(resultado.classificacoes[0].categoria)[0];

      graphData.push(
        ...Object.entries(resultado.series[0].serie).map(([key, value]: [string, string]) => ({
          year: key,
          value: Number(value),
          category,
        })),
      );
    });

    return {
      data: graphData,
      xField: 'year',
      yField: 'value',
      colorField: 'category',
      style: {
        lineWidth: 2,
      },
      tooltip: {
        items: [
          {
            field: 'value',
            name: 'População',
            valueFormatter: '~s',
          },
        ],
      },
      axis: {
        y: {
          labelFormatter: '~s',
        },
      },
    };
  };

  return (
    <Card title={title} style={{ width: '100%' }} loading={loading}>
      {data ? <Line {...getGraphConfig(data?.data)} /> : <Empty></Empty>}
    </Card>
  );
};
