import { createBrowserRouter } from 'react-router-dom';
import { BaseLayout } from '../components/BaseLayout';
import { Home } from '../pages/Home';
import { Redirect } from './components/redirect';
import { Cep } from '../pages/BrasilAPI/CEP';
import { Fipe } from '../pages/FIPE';
import { Feriados } from '../pages/BrasilAPI/Feriados';
import { Cnpj } from '../pages/BrasilAPI/CNPJ';
import { Corretoras } from '../pages/BrasilAPI/Corretoras';

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
        path: '/brasilapi/cep',
        element: <Cep></Cep>,
      },
      {
        path: '/brasilapi/cnpj',
        element: <Cnpj></Cnpj>,
      },
      {
        path: '/brasilapi/feriados',
        element: <Feriados></Feriados>,
      },
      {
        path: '/brasilapi/corretoras',
        element: <Corretoras></Corretoras>,
      },
      {
        path: '/fipe',
        element: <Fipe></Fipe>,
      },
    ],
  },
]);
