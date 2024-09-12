import { Button, Card, Col, Descriptions, Form, InputNumber, Row } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useState } from 'react';
import { HourlySalaryForm, SalaryResults } from './interfaces';
import { Rule } from 'antd/es/form';

export const HourlySalary = () => {
  const [form] = useForm();
  const [data, setData] = useState<SalaryResults>();

  const validationSchema: Record<keyof HourlySalaryForm, Rule[]> = {
    salary: [{ required: true, message: 'Obrigatório' }],
    hoursPerWeek: [{ required: true, message: 'Obrigatório' }],
    workingDays: [
      { required: true, message: 'Obrigatório' },
      { type: 'number', max: 7, message: 'Máximo 7 dias' },
      { type: 'number', min: 1, message: 'Mínimo 1 dia' },
    ],
  };

  const valueToCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const onFinish = (formValues: HourlySalaryForm) => {
    const hoursWorkedPerMonth: number = formValues.hoursPerWeek * 4.33;
    const hourlyRate = formValues.salary / hoursWorkedPerMonth;
    const dailyRate = hourlyRate * (formValues.hoursPerWeek / formValues.workingDays);
    const weeklyRate = dailyRate * formValues.workingDays;
    const monthlyRate = hourlyRate * hoursWorkedPerMonth;
    const yearlyRate = monthlyRate * 12;

    setData({
      hourlySalary: valueToCurrency(hourlyRate),
      dailySalary: valueToCurrency(dailyRate),
      weeklySalary: valueToCurrency(weeklyRate),
      monthlySalary: valueToCurrency(monthlyRate),
      yearlySalary: valueToCurrency(yearlyRate),
    });
  };

  return (
    <Row gutter={[16, 24]}>
      <Col span={12}>
        <Card>
          <Row gutter={[16, 24]}>
            <Col span={12}>
              <Form layout="vertical" form={form} onFinish={onFinish}>
                <Form.Item<HourlySalaryForm>
                  name="salary"
                  label="Salário líquido mensal"
                  rules={validationSchema.salary}
                >
                  <InputNumber style={{ width: '100%' }} decimalSeparator="," precision={2} />
                </Form.Item>
                <Form.Item<HourlySalaryForm>
                  name="hoursPerWeek"
                  label="Horas por semana"
                  rules={validationSchema.hoursPerWeek}
                >
                  <InputNumber style={{ width: '25%' }} decimalSeparator="," precision={0} />
                </Form.Item>
                <Form.Item<HourlySalaryForm>
                  name="workingDays"
                  label="Dias trabalhados"
                  rules={validationSchema.workingDays}
                >
                  <InputNumber style={{ width: '25%' }} decimalSeparator="," precision={0} />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Calcular
                  </Button>
                </Form.Item>
              </Form>
            </Col>
            <Col span={12}>
              <Descriptions
                bordered
                layout="horizontal"
                column={1}
                labelStyle={{ width: '12em' }}
                items={[
                  {
                    key: 'yearly',
                    label: 'Salário anual',
                    children: data?.yearlySalary || valueToCurrency(0),
                  },
                  {
                    key: 'monthly',
                    label: 'Salário mensal',
                    children: data?.monthlySalary || valueToCurrency(0),
                  },
                  {
                    key: 'weekly',
                    label: 'Salário semanal',
                    children: data?.weeklySalary || valueToCurrency(0),
                  },
                  {
                    key: 'daily',
                    label: 'Salário diário',
                    children: data?.dailySalary || valueToCurrency(0),
                  },
                  {
                    key: 'hourly',
                    label: 'Salário por hora',
                    children: data?.hourlySalary || valueToCurrency(0),
                  },
                ]}
              ></Descriptions>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};
