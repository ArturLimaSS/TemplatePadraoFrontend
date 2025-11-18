import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const Configuracoes = () => {
  return (
    <PageContainer title="Configurações" description="Página de configurações do CRM">
      <Breadcrumb
        items={[
          {
            title: 'Configurações',
          },
        ]}
      />
    </PageContainer>
  );
};

export default Configuracoes;
