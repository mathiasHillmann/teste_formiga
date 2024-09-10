import { Line } from '@ant-design/charts';
import { useRequest } from 'ahooks';
import { Card, Empty } from 'antd';
import axios from 'axios';
import { AntLineConfig } from '../../../../../types/types';
import { GraphSerie, IBGEData } from '../../interfaces';

export const PopulacaoPercentual: React.FC = () => {
  const { data: data, loading: loading } = useRequest(() => {
    return axios.get<IBGEData[]>(
      `${
        import.meta.env.VITE_IBGE_URL
      }/agregados/1209/periodos/-6/variaveis/1000606?localidades=N1[all]&classificacao=58[1140,1141,1142,1143,2792,92982,1144,1145,3299,3300,3301,3520,3244]`,
    );
  });

  const getGraphConfig = (data: IBGEData[]): AntLineConfig => {
    let graphData: GraphSerie[] = [];

    data[0].resultados.forEach((resultado) => {
      const category: string = Object.values(resultado.classificacoes[0].categoria)[0];

      Object.entries(resultado.series[0].serie).forEach(([key, value]: [string, string]) => {
        if (isNaN(Number(value))) {
          return;
        }

        graphData.push({
          year: key,
          value: Number(value),
          category,
        });
      });
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
            name: 'População (%)',
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
    <Card title="Grupos de idade - Todos (%)" style={{ width: '100%' }} loading={loading}>
      {data ? <Line {...getGraphConfig(data?.data)} /> : <Empty></Empty>}
    </Card>
  );
};
