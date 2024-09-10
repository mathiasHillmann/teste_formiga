import { Col, Row } from 'antd';
import { PopulacaoFaixa } from './components/PopulacaoFaixa';
import { PopulacaoTotal } from './components/PopulacaoTotal';
import { PopulacaoPercentual } from './components/PopulacaoPercentual';

export const PopulacaoBrasil: React.FC = () => {
  return (
    <Row gutter={[16, 24]}>
      <Col span={8}>
        <PopulacaoPercentual></PopulacaoPercentual>
      </Col>
      <Col span={8}>
        <PopulacaoTotal></PopulacaoTotal>
      </Col>
      <Col span={8}>
        <PopulacaoFaixa
          title="Grupos de idade - 0 a 19 anos"
          route="/agregados/1209/periodos/-6/variaveis/606?localidades=N1[all]&classificacao=58[1140,1141,1142,1143]"
        ></PopulacaoFaixa>
      </Col>
      <Col span={8}>
        <PopulacaoFaixa
          title="Grupos de idade - 20 a 39 anos"
          route="/agregados/1209/periodos/-6/variaveis/606?localidades=N1[all]&classificacao=58[1144,1145,3299]"
        ></PopulacaoFaixa>
      </Col>
      <Col span={8}>
        <PopulacaoFaixa
          title="Grupos de idade - 40 a 69 anos"
          route="/agregados/1209/periodos/-6/variaveis/606?localidades=N1[all]&classificacao=58[3300,3301,3520]"
        ></PopulacaoFaixa>
      </Col>
      <Col span={8}>
        <PopulacaoFaixa
          title="Grupos de idade - 70+ anos"
          route="/agregados/1209/periodos/-6/variaveis/606?localidades=N1[all]&classificacao=58[3244]"
        ></PopulacaoFaixa>
      </Col>
    </Row>
  );
};
