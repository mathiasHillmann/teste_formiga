import { Chart, Line, LineConfig } from '@ant-design/charts';
import { useRequest } from 'ahooks';
import { Card, Col, Empty, Row, Skeleton } from 'antd';
import axios from 'axios';
import { PropsWithoutRef, RefAttributes } from 'react';

type AntLineConfig = PropsWithoutRef<LineConfig> & RefAttributes<Chart>;

export const PopulacaoBrasil: React.FC = () => {
  const { data: totalData, loading: totalLoading } = useRequest(() => {
    return axios.get(
      `${
        import.meta.env.VITE_IBGE_URL
      }/agregados/1209/periodos/-6/variaveis/606?localidades=N1[all]&classificacao=58[0]`,
    );
  });

  const getTotalConfig = (data: any): AntLineConfig => {
    const graphData = Object.entries(data?.data[0].resultados[0].series[0].serie).map(([key, value]) => ({
      year: key,
      value: Number(value),
    }));

    return {
      data: graphData,
      xField: 'year',
      yField: 'value',
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
    <Row gutter={[16, 24]}>
      <Col span={8}>
        <Card title="Todos os grupos de idade" style={{ width: '100%' }}>
          <Skeleton active loading={totalLoading}>
            {totalData ? <Line {...getTotalConfig(totalData)} /> : <Empty></Empty>}
          </Skeleton>
        </Card>
      </Col>
    </Row>
  );
};
