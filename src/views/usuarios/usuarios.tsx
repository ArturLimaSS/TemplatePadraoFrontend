// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { Grid } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';

import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import ListaUsuarios from 'src/components/usuarios/lista-usuarios';
import { CadastrarUsuario } from 'src/components/usuarios/cadastrar-usuario';

const Usuarios = () => {
  const BCrumb = [
    {
      to: '/',
      title: 'Painel',
    },
    {
      title: 'Usuários',
    },
  ];
  return (
    <>
      <PageContainer title="Usuários" description="Página para gestão de acessos">
        <Breadcrumb title="Usuários" items={BCrumb} action={<CadastrarUsuario />} />

        <Grid container spacing={3}>
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
