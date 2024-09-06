import { PageContainer, ProLayout } from '@ant-design/pro-components';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { menu } from '../../menu';

export const BaseLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <ProLayout
      style={{
        height: '100vh',
      }}
      fixSiderbar
      location={{ pathname: location.pathname }}
      menu={{ request: async () => menu }}
      menuProps={{ onClick: (menu) => navigate(menu.key) }}
      menuHeaderRender={() => (
        <a onClick={() => navigate('/inicio')}>
          <h1>Teste Formigão</h1>
        </a>
      )}
    >
      <PageContainer>
        <Outlet></Outlet>
      </PageContainer>
    </ProLayout>
  );
};
