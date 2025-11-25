import { Grid } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { CadastrarPerfilDeAcesso } from 'src/components/perfis-de-acesso/cadastrar-perfil-de-acesso';
import { ListaPerfisDeAcesso } from 'src/components/perfis-de-acesso/lista-perfis-de-acesso';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const PerfisDeAcesso = () => {
  return (
    <PageContainer
      title="Gestão de perfis de acesso"
      description="Página para gestão de perfis de acesso!"
    >
      <Breadcrumb
        title="Gestão de perfis de acesso"
        items={[
          {
            title: 'Gestão de perfis de acesso',
          },
        ]}
      />

      <Grid container spacing={3}>
        <Grid size={12}>
          <CadastrarPerfilDeAcesso />
        </Grid>
        <Grid size={12}>
          <ListaPerfisDeAcesso />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default PerfisDeAcesso;
