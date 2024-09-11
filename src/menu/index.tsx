import { MenuDataItem } from '@ant-design/pro-components';
import Icon, { HomeOutlined, ApiOutlined, CarOutlined, DollarOutlined } from '@ant-design/icons';
import { BrazilSVG, CatSVG } from '../assets/icons';

export const menu: MenuDataItem[] = [
  {
    path: '/',
    name: 'Início',
    icon: <HomeOutlined />,
  },
  {
    path: '/brasilapi',
    name: 'BrasilAPI',
    icon: <ApiOutlined />,
    children: [
      {
        path: 'cep',
        name: 'CEP',
      },
      {
        path: 'cnpj',
        name: 'CNPJ',
      },
      {
        path: 'feriados',
        name: 'Feriados',
      },
      {
        path: 'corretoras',
        name: 'Corretoras',
      },
    ],
  },
  {
    path: '/ibge',
    name: 'IBGE',
    icon: <Icon component={BrazilSVG} style={{ height: '1em', width: '1em' }} />,
    children: [
      {
        path: 'populacao-brasil',
        name: 'População no Brasil',
      },
      {
        path: 'pib',
        name: 'PIB',
      },
    ],
  },
  {
    path: '/frankfurter',
    name: 'Frankfurter',
    icon: <DollarOutlined />,
    children: [
      {
        path: 'conversao-dinheiro',
        name: 'Conversão de dinheiro',
      },
      {
        path: 'historico-taxa-cambio',
        name: 'Histórico de taxa de câmbio',
      },
    ],
  },
  {
    path: '/fipe',
    name: 'FIPE',
    icon: <CarOutlined />,
  },
  {
    path: '/cataas',
    name: 'Cat as a service',
    icon: <Icon component={CatSVG} style={{ height: '1em', width: '1em' }} />,
  },
];
