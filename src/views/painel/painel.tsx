import React from 'react';
import { Grid, Box, Card, CardContent, Typography, Button } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { useAuthStore } from 'src/store/Auth/auth-store';
import {
  IconUser,
  IconShoppingCart,
  IconBuildingWarehouse,
  IconTools,
  IconCurrencyDollar,
  IconBox,
} from '@tabler/icons-react';

const moduloIcons: Record<string, React.ReactNode> = {
  CRM: <IconUser size={32} />,
  Comercial: <IconShoppingCart size={32} />,
  Estoque: <IconBuildingWarehouse size={32} />,
  Produção: <IconTools size={32} />,
  Financeiro: <IconCurrencyDollar size={32} />,
};

const Painel = () => {
  const { inquilino, usuario_modulos } = useAuthStore();

  const openModulo = (moduloNome: string) => {
    console.log(`Abrindo módulo: ${moduloNome}`);
    // Aqui você pode usar useNavigate ou window.location.href
    // Ex: navigate(`/${moduloNome.toLowerCase()}`);
  };

  return (
    <PageContainer title="Painel" description="Seleção dos módulos disponíveis">
      <Box>
        <Typography variant="h5" sx={{ mb: 4 }}>
          Bem-vindo(a), {inquilino?.nome}
        </Typography>

        <Grid container spacing={3}>
          {usuario_modulos?.map((item, index) => {
            const moduloNome = item?.modulo?.nome;
            const Icon = moduloIcons[moduloNome] || <IconBox size={32} />;

            return (
              <Grid key={index}>
                <Card
                  sx={{
                    cursor: 'pointer',
                    transition: '0.1s',
                    '&:hover': { boxShadow: 6 },
                  }}
                  onClick={() => openModulo(moduloNome)}
                >
                  <Button variant="contained"></Button>
                  <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {Icon}
                    <Typography variant="h6">{moduloNome}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Painel;
