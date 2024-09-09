import { MenuDataItem } from '@ant-design/pro-components';
import Icon, { HomeOutlined, ApiOutlined, CarOutlined } from '@ant-design/icons';
import { BrazilSVG } from '../assets/icons';

export const menu: MenuDataItem[] = [
  {
    path: '/',
    name: 'Início',
    icon: <HomeOutlined></HomeOutlined>,
  },
  {
    path: '/brasilapi',
    name: 'BrasilAPI',
    icon: <ApiOutlined></ApiOutlined>,
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
    ],
  },
  {
    path: '/fipe',
    name: 'FIPE',
    icon: <CarOutlined></CarOutlined>,
  },
];
