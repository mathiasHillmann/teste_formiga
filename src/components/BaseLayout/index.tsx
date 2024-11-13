import { PageContainer, ProLayout } from '@ant-design/pro-components';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { menu } from '../../menu';
import { Space } from 'antd';
import { GithubOutlined } from '@ant-design/icons';

export const BaseLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <ProLayout
      style={{
        height: 'calc(100vh - 5em)',
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
      actionsRender={() => (
        <Space onClick={() => window.open('https://github.com/mathiasHillmann/teste_formiga', '_blank')}>
          <GithubOutlined /> Repositório
        </Space>
      )}
    >
      <PageContainer>
        <Outlet></Outlet>
      </PageContainer>
    </ProLayout>
  );
};
