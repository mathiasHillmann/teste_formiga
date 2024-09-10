import { Line } from '@ant-design/charts';
import { useRequest } from 'ahooks';
import { Card, Empty } from 'antd';
import axios from 'axios';
import { AntLineConfig } from '../../../../../types/types';
import { GraphSerie, IBGEData } from '../../interfaces';

export const PopulacaoTotal: React.FC = () => {
  const { data: data, loading: loading } = useRequest(() => {
    return axios.get<IBGEData[]>(
      `${
        import.meta.env.VITE_IBGE_URL
      }/agregados/1209/periodos/-6/variaveis/606?localidades=N1[all]&classificacao=58[0]`,
    );
  });

  const getGraphConfig = (data: IBGEData[]): AntLineConfig => {
    const graphData: GraphSerie[] = Object.entries(data[0].resultados[0].series[0].serie).map(([key, value]) => ({
      year: key,
      value: Number(value),
      category: 'Todos',
    }));

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
    <Card title="Grupos de idade - Todos" style={{ width: '100%' }} loading={loading}>
      {data ? <Line {...getGraphConfig(data?.data)} /> : <Empty></Empty>}
    </Card>
  );
};
