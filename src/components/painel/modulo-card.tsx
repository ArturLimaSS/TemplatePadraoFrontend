import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';
import {
  IconBox,
  IconBuildingWarehouse,
  IconCurrencyDollar,
  IconShoppingCart,
  IconTools,
  IconUser,
} from '@tabler/icons-react';
import { useEffect } from 'react';
import { useLoading } from 'src/context/LoadingContext/LoadingContext';
import { useAuthStore } from 'src/store/Auth/auth-store';
import type { ModulosType } from 'src/types/inquilino/inquilino-types';
import { swalErro } from 'src/utils/swal';

const moduloIcons: Record<string, React.ReactNode> = {
  CRM: <IconUser size={32} />,
  Comercial: <IconShoppingCart size={32} />,
  Estoque: <IconBuildingWarehouse size={32} />,
  Produção: <IconTools size={32} />,
  Financeiro: <IconCurrencyDollar size={32} />,
};

interface ModuloCardType {
  modulo: ModulosType;
}

export const ModuloCard = ({ modulo }: ModuloCardType) => {
  const { acessarModulo, isAuthLoading } = useAuthStore();
  const moduloNome = modulo?.nome;
  const Icon = moduloIcons[String(moduloNome)] || <IconBox size={32} />;
  const { setLoading } = useLoading();

  useEffect(() => {
    setLoading(isAuthLoading);
  }, [isAuthLoading]);
  const handleAcessarModulo = async () => {
    const response = await acessarModulo(String(modulo.id));
    if (response.status == 200) {
      const url = response.data.data.url;
      window.location.href = url;
    } else {
      swalErro(
        'Ocorreu um erro ao tentar acessar o módulo, tente novamente mais tarde ou entre em contato com o suporte!',
      );
    }
  };
  return (
    <Card>
      <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {Icon}
        <Typography variant="h6">{moduloNome}</Typography>
        <Button variant="contained" onClick={() => handleAcessarModulo()}>
          Acessar
        </Button>
      </CardContent>
    </Card>
  );
};
