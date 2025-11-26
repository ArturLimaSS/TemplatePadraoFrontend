import { Grid, Box, Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { useAuthStore } from 'src/store/Auth/auth-store';

import { ModuloCard } from 'src/components/painel/modulo-card';
import { useEffect, useState } from 'react';
import type { PrefixoModulo } from 'src/store/PerfilAcesso/perfil-acesso-types';
import { useInquilino, type ModuloType } from 'src/store/Inquilino/inquilino-store';
import type { ModulosType } from 'src/types/inquilino/inquilino-types';

const Painel = () => {
  const { usuario_logado, perfil_acesso, initializeAuth } = useAuthStore();
  const { lista_modulos, listarModulos } = useInquilino()
  const [listaModulos, setListaModulos] = useState<ModulosType[]>();

  useEffect(() => {
    initializeAuth()
    listarModulos();
  }, []);

  useEffect(() => {
    const lista_prefixo = Object.entries(perfil_acesso ?? {})
      .filter(([_, val]) => Array.isArray(val) && val.length > 0)
      .map(([key]) => key);

    const lista_modulos_filtrados = lista_modulos?.filter((item) =>
      lista_prefixo.includes(item.prefixo)
    );

    setListaModulos(lista_modulos_filtrados);
  }, [perfil_acesso, lista_modulos]);

  return (
    <PageContainer title="Painel" description="Seleção dos módulos disponíveis">
      <Box>
        <Typography variant="h5" sx={{ mb: 4 }}>
          Bem-vindo(a), {usuario_logado?.name}
        </Typography>

        <Grid container spacing={3}>
          {listaModulos?.map((modulo, index) => {
            return (
              <Grid key={index}>
                <ModuloCard modulo={modulo} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Painel;
