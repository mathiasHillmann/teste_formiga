import { createBrowserRouter } from 'react-router-dom';
import { BaseLayout } from '../components/BaseLayout';
import { Home } from '../pages/Home';
import { Redirect } from './components/redirect';
import { Cep } from '../pages/BrasilAPI/CEP';
import { Fipe } from '../pages/FIPE';
import { Feriados } from '../pages/BrasilAPI/Feriados';
import { Cnpj } from '../pages/BrasilAPI/CNPJ';
import { Corretoras } from '../pages/BrasilAPI/Corretoras';
import { PopulacaoBrasil } from '../pages/IBGE/PopulacaoBrasil';
import { PIB } from '../pages/IBGE/PIB';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout></BaseLayout>,
    errorElement: <Redirect></Redirect>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: 'brasilapi',
        children: [
          {
            path: 'cep',
            element: <Cep></Cep>,
          },
          {
            path: 'cnpj',
            element: <Cnpj></Cnpj>,
          },
          {
            path: 'feriados',
            element: <Feriados></Feriados>,
          },
          {
            path: 'corretoras',
            element: <Corretoras></Corretoras>,
          },
        ],
      },
      {
        path: 'ibge',
        children: [
          {
            path: 'populacao-brasil',
            element: <PopulacaoBrasil></PopulacaoBrasil>,
          },
          {
            path: 'pib',
            element: <PIB></PIB>,
          },
        ],
      },
      {
        path: '/fipe',
        element: <Fipe></Fipe>,
      },
    ],
  },
]);
