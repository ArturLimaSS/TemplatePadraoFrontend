// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { Link } from 'react-router';
import { Grid, Box, Stack, Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import img1 from 'src/assets/images/backgrounds/login-bg.svg';
import Logo from 'src/layouts/full/shared/logo/Logo';
import AuthLogin from '../authForms/AuthLogin';
import LogoLogin from 'src/layouts/full/shared/logo/LogoLogin';

const Login = () => (
  <PageContainer title="Login" description="this is Login page">
    <Grid container spacing={0} sx={{ overflowX: 'hidden' }}>
      <Grid
        sx={{
          position: 'relative',
          '&:before': {
            content: '""',
            background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: '0.3',
          },
        }}
        size={{
          xs: 12,
          sm: 12,
          lg: 8,
        }}
      >
        <Box position="relative">
          <Box
            alignItems="center"
            justifyContent="center"
            height={'calc(100vh)'}
            sx={{
              display: {
                xs: 'none',
                lg: 'flex',
              },
            }}
          ></Box>
        </Box>
      </Grid>
      <Grid
        display="flex"
        justifyContent="center"
        alignItems="center"
        size={{
          xs: 12,
          sm: 12,
          lg: 4,
        }}
      >
        <Box p={4}>
          <LogoLogin />
          <AuthLogin title="Seja bem vindo" />
        </Box>
      </Grid>
    </Grid>
  </PageContainer>
);

export default Login;
