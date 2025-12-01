import {
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  IconButton,
  Chip,
  Stack,
  Divider,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useEffect } from 'react';
import { useInquilino } from 'src/store/Inquilino/inquilino-store';
import { usePerfilAcessoStore } from 'src/store/PerfilAcesso/perfil-acesso-store';
import { AtualizarPerfilDeAcesso } from './atualizar-perfil-de-acesso';
import { swalErro, swalSucesso } from 'src/utils/swal';
import type { PerfilAcessoType } from 'src/store/PerfilAcesso/perfil-acesso-types';
import { useAlert } from 'src/context/Alert/useAlert';

export const ListaPerfisDeAcesso = () => {
  const { listarPerfilAcesso, lista_perfil_acesso, excluirPerfilAcesso } = usePerfilAcessoStore();
  const { lista_modulos, listarModulos } = useInquilino();

  useEffect(() => {
    listarPerfilAcesso();
    listarModulos();
  }, []);

  const getModulo = (prefixo: string) => {
    return lista_modulos?.find((item) => item.prefixo === prefixo);
  };

  const modulosHabilitados = (perfil: any) => {
    return Object.keys(perfil).filter(
      (key) =>
        perfil[key] !== undefined &&
        perfil[key] != null &&
        lista_modulos?.some((m) => m.prefixo === key),
    );
  };

  const { dialogConfirmacao } = useAlert();

  const handleExcluirPerfilDeAcesso = async (perfil: PerfilAcessoType) => {
    const confirmacao = await dialogConfirmacao({
      title: 'Deseja realmente excluir este perfil?',
      content: 'Esta ação não poderá ser revertida!',
    });

    if (!confirmacao) return;
    const response = await excluirPerfilAcesso(perfil);
    if (response.status == 200) {
      swalSucesso('Perfil excluido com sucesso!');
      listarPerfilAcesso();
    } else {
      swalErro('ocorreu um erro ao tentar excluir o perfil de acesso!');
    }
  };

  return (
    <Grid container spacing={3}>
      {lista_perfil_acesso?.map((perfil) => {
        const modulos = modulosHabilitados(perfil);

        return (
          <Grid
            key={perfil.id}
            size={{
              xs: 12,
              md: 6,
              lg: 3,
            }}
          >
            <Card>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 1,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {perfil.nome}
                  </Typography>

                  <Box>
                    <AtualizarPerfilDeAcesso perfil_acesso={perfil} />
                    <IconButton onClick={() => handleExcluirPerfilDeAcesso(perfil)} color="error">
                      <Delete />
                    </IconButton>
                  </Box>
                </Box>

                <Divider sx={{ my: 1 }} />

                <Typography variant="subtitle2" color="text.secondary">
                  Módulos habilitados:
                </Typography>

                {modulos.length > 0 ? (
                  <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 1 }}>
                    {modulos.map((prefixo) => (
                      <Chip
                        key={prefixo}
                        label={getModulo(prefixo)?.nome ?? prefixo}
                        color="primary"
                        variant="outlined"
                        sx={{ mb: 1 }}
                      />
                    ))}
                  </Stack>
                ) : (
                  <Typography variant="body2" sx={{ mt: 1 }} color="text.secondary">
                    Nenhum módulo habilitado.
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};
