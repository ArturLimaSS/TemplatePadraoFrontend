// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { Grid } from '@mui/material';
import { DadosAcesso } from 'src/components/auth/dados-acesso';

const PerfilUsuario = () => {
  const BCrumb = [
    {
      to: '/',
      title: 'Painel',
    },
    {
      title: 'Meu perfil',
    },
  ];
  return (
    <>
      <PageContainer title="Meu Perfil | OrCloud" description="Pagina do perfil do usuario">
        <Breadcrumb title="Meu Perfil" items={BCrumb} />
      </PageContainer>
      <Grid container>
        <Grid
          size={{
            xs: 12,
          }}
        >
          <DadosAcesso />
        </Grid>
      </Grid>
    </>
  );
};

export default PerfilUsuario;
