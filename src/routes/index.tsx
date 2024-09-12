import { createBrowserRouter } from 'react-router-dom';
import { BaseLayout } from '../components/BaseLayout';
import { Home } from '../pages/Home';
import { Redirect } from './components/redirect';
import { Cep } from '../pages/BrasilAPI/CEP';
import { Fipe } from '../pages/FIPE';
import { Holydays } from '../pages/BrasilAPI/Holydays';
import { Cnpj } from '../pages/BrasilAPI/CNPJ';
import { PopulacaoBrasil } from '../pages/IBGE/PopulacaoBrasil';
import { PIB } from '../pages/IBGE/PIB';
import { CatAAS } from '../pages/CatAAS';
import { Brokers } from '../pages/BrasilAPI/Brokers';
import { CurrencyConversion } from '../pages/Frankfurter/CurrencyConversion';
import { CurrencyValueHistory } from '../pages/Frankfurter/CurrencyValueHistory';
import { MyIp } from '../pages/MyIp';
import { RuleOfThree } from '../pages/Calculators/RuleOfThree';
import { HourlySalary } from '../pages/Calculators/HourlySalary';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    errorElement: <Redirect />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'calculadoras',
        children: [
          {
            path: 'regra-de-tres',
            element: <RuleOfThree />,
          },
          {
            path: 'remuneracao-por-hora',
            element: <HourlySalary />,
          },
        ],
      },
      {
        path: 'brasilapi',
        children: [
          {
            path: 'cep',
            element: <Cep />,
          },
          {
            path: 'cnpj',
            element: <Cnpj />,
          },
          {
            path: 'feriados',
            element: <Holydays />,
          },
          {
            path: 'corretoras',
            element: <Brokers />,
          },
        ],
      },
      {
        path: 'frankfurter',
        children: [
          {
            path: 'conversao-dinheiro',
            element: <CurrencyConversion />,
          },
          {
            path: 'historico-taxa-cambio',
            element: <CurrencyValueHistory />,
          },
        ],
      },
      {
        path: 'ibge',
        children: [
          {
            path: 'populacao-brasil',
            element: <PopulacaoBrasil />,
          },
          {
            path: 'pib',
            element: <PIB />,
          },
        ],
      },
      {
        path: '/fipe',
        element: <Fipe />,
      },
      {
        path: '/cataas',
        element: <CatAAS />,
      },
      {
        path: '/meu-ip',
        element: <MyIp />,
      },
    ],
  },
]);
