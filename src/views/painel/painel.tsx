import { Grid, Box, Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { useAuthStore } from 'src/store/Auth/auth-store';

import { ModuloCard } from 'src/components/painel/modulo-card';

const Painel = () => {
  const { usuario_modulos, usuario_logado } = useAuthStore();

  return (
    <PageContainer title="Painel" description="Seleção dos módulos disponíveis">
      <Box>
        <Typography variant="h5" sx={{ mb: 4 }}>
          Bem-vindo(a), {usuario_logado?.name}
        </Typography>

        <Grid container spacing={3}>
          {usuario_modulos?.map((item, index) => {
            return (
              <Grid key={index}>
                <ModuloCard modulo={item.modulo} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Painel;
