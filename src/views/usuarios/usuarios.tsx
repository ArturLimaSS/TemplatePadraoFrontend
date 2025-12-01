// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';

import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import ListaUsuarios from 'src/components/usuarios/lista-usuarios';
import { CadastrarUsuario } from 'src/components/usuarios/cadastrar-usuario';

const Usuarios = () => {
  const BCrumb = [
    {
      title: 'Gestão de Usuários',
    },
  ];
  return (
    <>
      <PageContainer title="Gestão de Usuários" description="Página para gestão de acessos">
        <Grid container spacing={3}>
          <Grid size={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box>
                <Typography sx={{ fontSize: '1.5rem', fontWeight: 900 }}>
                  Gestão de Usuários
                </Typography>
                <Typography>Controle de acesso granular e perfis</Typography>
              </Box>
              <CadastrarUsuario />
            </Box>
          </Grid>
          <Grid
            size={{
              sm: 12,
            }}
          >
            <ListaUsuarios />
          </Grid>
        </Grid>
      </PageContainer>
    </>
  );
};

export default Usuarios;
