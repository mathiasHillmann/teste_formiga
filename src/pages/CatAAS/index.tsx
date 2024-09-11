import { useDebounceFn } from 'ahooks';
import { Button, Card, Col, Form, Image, Input, InputNumber, Row, Select, Skeleton, Switch } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useEffect, useState } from 'react';
import { CatAASParams } from './interfaces';
import { randomInteger } from '../../helpers/number.helper';
import axios from 'axios';
import { BaseOptionType } from 'antd/es/select';

export const CatAAS: React.FC = () => {
  const defaultUrl: string = `${import.meta.env.VITE_CATAAS_URL}/cat`;
  const [form] = useForm();
  const [url, setUrl] = useState<string>(defaultUrl);
  const [rand, setRand] = useState<number>(0);
  const [tagsDisabled, setTagsDisabled] = useState<boolean>(false);
  const [fontFieldsDisabled, setFontFieldsDisabled] = useState<boolean>(true);
  const [blob, setBlob] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    axios
      .get(url, {
        responseType: 'blob',
        headers: {
          Accept: '*/*',
        },
      })
      .then((response) => {
        setBlob(URL.createObjectURL(response.data));
      })
      .catch((ex) => {
        console.error(ex);
      })
      .finally(() => setLoading(false));
  }, [url]);

  const { run } = useDebounceFn(
    () => {
      const formValue: CatAASParams = form.getFieldsValue();
      let url: string = defaultUrl;
      setRand(randomInteger(0, 100));

      // Usar gif não deixa utilizar o sistema de tags da api
      if (formValue.gif) {
        url += '/gif';
      } else {
        if (formValue.color) {
          url += `/${formValue.color}`;
        }
      }

      if (formValue.text) {
        url += `/says/${formValue.text}`;
      }

      const params: Record<string, string> = Object.fromEntries(
        Object.entries({
          fontColor: formValue.fontColor,
          fontSize: formValue.fontSize as unknown as string,
          type: formValue.type,
          rand: rand as unknown as string,
        }).filter(([_, value]) => value != null && value !== ''),
      );

      url += '?' + new URLSearchParams(params).toString();

      setUrl(url);
    },
    {
      wait: 500,
    },
  );

  const imageSizeOptions: BaseOptionType[] = [
    { label: 'Muito pequeno', value: 'xsmall' },
    { label: 'Pequeno', value: 'small' },
    { label: 'Médio', value: 'medium' },
    { label: 'Quadrado', value: 'square' },
  ];

  const catColorOptions: BaseOptionType[] = [
    { label: 'Branco', value: 'white' },
    { label: 'Cinza', value: 'grey' },
    { label: 'Preto', value: 'black' },
    { label: 'Preto e branco', value: 'black and white' },
    { label: 'Laranja', value: 'orange' },
  ];

  const fontColorOptions: BaseOptionType[] = [
    { label: 'Branco', value: 'white' },
    { label: 'Cinza', value: 'grey' },
    { label: 'Preto', value: 'black' },
    { label: 'Laranja', value: 'orange' },
    { label: 'Vermelho', value: 'red' },
    { label: 'Amarelo', value: 'yellow' },
    { label: 'Azul', value: 'blue' },
  ];

  const onValuesChange = (_: any, formValues: CatAASParams) => {
    if (formValues.gif) {
      setTagsDisabled(true);
      form.setFieldValue('color', null);
    } else {
      setTagsDisabled(false);
    }

    if (formValues.text) {
      setFontFieldsDisabled(false);
    } else {
      setFontFieldsDisabled(true);
      form.setFieldValue('text', null);
      form.setFieldValue('fontSize', null);
      form.setFieldValue('fontColor', null);
    }
  };

  return (
    <Row gutter={[16, 24]}>
      <Col span={16} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {loading ? (
          <Skeleton.Image active />
        ) : (
          <Image
            src={blob}
            fallback="data:image/png;base64,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"
          />
        )}
      </Col>
      <Col span={8}>
        <Card title="Parâmetros">
          <Form
            layout="vertical"
            form={form}
            onFinish={() => run()}
            onValuesChange={onValuesChange}
            initialValues={{ gif: false }}
          >
            <Form.Item<CatAASParams> name="gif" valuePropName="checked" label="Mostrar GIF">
              <Switch />
            </Form.Item>
            <Form.Item<CatAASParams> name="type" label="Tamanho da imagem">
              <Select allowClear={true} placeholder="Aleatório" options={imageSizeOptions} />
            </Form.Item>
            <Form.Item<CatAASParams> name="color" label="Cor do gato">
              <Select allowClear={true} placeholder="Aleatório" options={catColorOptions} disabled={tagsDisabled} />
            </Form.Item>
            <Form.Item<CatAASParams> name="text" label="Texto para aparecer na imagem">
              <Input allowClear={true} />
            </Form.Item>
            <Form.Item<CatAASParams> name="fontSize" label="Tamanho do texto">
              <InputNumber disabled={fontFieldsDisabled} />
            </Form.Item>
            <Form.Item<CatAASParams> name="fontColor" label="Cor do texto">
              <Select allowClear={true} placeholder="Preto" options={fontColorOptions} disabled={fontFieldsDisabled} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Procurar
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};
