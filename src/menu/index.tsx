import { MenuDataItem } from '@ant-design/pro-components';
import { HomeOutlined, ApiOutlined, CarOutlined } from '@ant-design/icons';

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
    path: '/fipe',
    name: 'FIPE',
    icon: <CarOutlined></CarOutlined>,
  },
];
