import { Col, Row } from 'antd';
import { PIBCorrente } from './components/PIBCorrente';
import { PIBPerCapita } from './components/PIBPerCapita';

export const PIB: React.FC = () => {
  return (
    <Row gutter={[16, 24]}>
      <Col span={24}>
        <PIBCorrente></PIBCorrente>
      </Col>
      <Col span={24}>
        <PIBPerCapita></PIBPerCapita>
      </Col>
    </Row>
  );
};
