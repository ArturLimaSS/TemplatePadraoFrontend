import { Card, CardContent, Typography, Switch, Stack, Box, Grid } from '@mui/material';
import { useEffect } from 'react';
import { useInquilino } from 'src/store/Inquilino/inquilino-store';
import { useUsuarioStore } from 'src/store/Usuario/usuario-store';
import type { UsuarioType } from 'src/types/usuario/usuario';

interface ModulosTabState {
  usuario: UsuarioType;
}

export const ModulosTab = ({ usuario }: ModulosTabState) => {
  const { listarModulos, lista_modulos } = useInquilino();
  const { lista_modulos_usuario, listarModulosUsuario, atualizarModulosUsuario } =
    useUsuarioStore();

  useEffect(() => {
    listarModulos();
    listarModulosUsuario(usuario);
  }, []);

  const handleToggle = async (modulo_id: string, value: boolean) => {
    await atualizarModulosUsuario({
      usuario_id: usuario.id,
      modulo_id,
      value,
    });
    await listarModulosUsuario(usuario);
  };

  const usuarioTemModulo = (modulo_id: string) => {
    return lista_modulos_usuario
      ?.filter((m) => m.ativo == '1')
      .some((m) => m.modulo_id === modulo_id);
  };

  return (
    <Stack spacing={2} sx={{ p: 2 }}>
      <Typography variant="h5" fontWeight={700}>
        Permissões de Módulos
      </Typography>

      <Grid container spacing={2}>
        {lista_modulos?.map((item) => {
          const checked = usuarioTemModulo(item.modulo_id);

          return (
            <Grid
              size={{
                xs: 12,
                sm: 6,
                md: 4,
                lg: 3,
              }}
              key={item.id}
            >
              <Card
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  px: 2,
                  py: 1.5,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <CardContent sx={{ p: 0 }}>
                  <Typography fontWeight={600} mb={1}>
                    {item.nome}
                  </Typography>

                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="body2" sx={{ opacity: 0.7 }}>
                      Acesso ao módulo
                    </Typography>

                    <Switch
                      checked={checked}
                      onChange={(e) => handleToggle(item.modulo_id, e.target.checked)}
                      size="medium"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
};
