import { Line } from '@ant-design/charts';
import { useRequest } from 'ahooks';
import axios from 'axios';
import { AntLineConfig } from '../../../../../types/types';
import { GraphSerie, IBGEData } from '../../../interfaces';
import { Card, Empty } from 'antd';

export const PIBCorrente: React.FC = () => {
  const { data: data, loading: loading } = useRequest(() => {
    return axios.get<IBGEData[]>(
      `${
        import.meta.env.VITE_IBGE_URL
      }/agregados/6784/periodos/1996|1997|1998|1999|2000|2001|2002|2003|2004|2005|2006|2007|2008|2009|2010|2011|2012|2013|2014|2015|2016|2017|2018|2019|2020|2021/variaveis/9808?localidades=N1[all]`,
    );
  });

  const getGraphConfig = (data: IBGEData[]): AntLineConfig => {
    let graphData: GraphSerie[] = [];

    data[0].resultados.forEach((resultado) => {
      graphData.push(
        ...Object.entries(resultado.series[0].serie).map(([key, value]: [string, string]) => ({
          year: key,
          value: Number(value),
          category: 'Valor corrente',
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
            valueFormatter: '.2s',
          },
        ],
      },
      axis: {
        y: {
          labelFormatter: '.2s',
        },
      },
    };
  };

  return (
    <Card title="PIB - Valores correntes" style={{ width: '100%' }} loading={loading}>
      {data ? <Line {...getGraphConfig(data?.data)} /> : <Empty></Empty>}
    </Card>
  );
};
