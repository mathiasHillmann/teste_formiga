import { useDebounceFn } from 'ahooks';
import { Card, Col, Form, InputNumber, Row, Space } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { RuleOfThreeForm } from './interfaces';
import { css } from '@emotion/css';

export const RuleOfThree = () => {
  const [form] = useForm();

  const { run } = useDebounceFn(
    () => {
      const formValues: RuleOfThreeForm = form.getFieldsValue();

      if (!formValues.a || !formValues.b || !formValues.c) {
        return;
      }

      form.setFieldValue('d', (formValues.b * formValues.c) / formValues.a);
    },
    {
      wait: 500,
    },
  );

  return (
    <Row gutter={[16, 24]}>
      <Col span={12}>
        <Card>
          <Form form={form} onValuesChange={run}>
            <Row>
              <Col span={4}>
                <Form.Item<RuleOfThreeForm> name="a">
                  <InputNumber decimalSeparator="," />
                </Form.Item>
              </Col>
              <Col span={4}>Está para</Col>
              <Col span={4}>
                <Form.Item<RuleOfThreeForm> name="b">
                  <InputNumber decimalSeparator="," />
                </Form.Item>
              </Col>
              <Col span={12}></Col>
            </Row>
            <Row>
              <Col span={4}></Col>
              <Col span={4}>
                <Space
                  className={css`
                    margin-bottom: 24px;
                  `}
                >
                  Assim como
                </Space>
              </Col>
              <Col span={4}></Col>
            </Row>
            <Row>
              <Col span={4}>
                <Form.Item<RuleOfThreeForm> name="c">
                  <InputNumber decimalSeparator="," />
                </Form.Item>
              </Col>
              <Col span={4}>Está para</Col>
              <Col span={4}>
                <Form.Item<RuleOfThreeForm> name="d">
                  <InputNumber decimalSeparator="," disabled={true} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};
