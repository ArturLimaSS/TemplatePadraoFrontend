import { CardContent, Box, Stack, Avatar, Grid, Button, Typography } from '@mui/material';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useContext, useEffect } from 'react';
import BlankCard from 'src/components/shared/BlankCard';
import { useUsuarioStore } from 'src/store/Usuario/usuario-store';
import { useNavigate } from 'react-router';
import { useAlert } from 'src/context/Alert/useAlert';

const ListaUsuarios = () => {
  const { lista_usuario, listarUsuario, excluirUsuario } = useUsuarioStore();

  const navigate = useNavigate();

  useEffect(() => {
    listarUsuario();
  }, []);

  const { dialogConfirmacao, show } = useAlert();
  const handleExcluirUsuario = async (usuario) => {
    const confirmacao = await dialogConfirmacao({
      title: 'Deseja realmente excluir este usuário?',
      content: 'Esta ação não poderá ser revertida',
    });

    if (!confirmacao) {
      return;
    }

    const response = await excluirUsuario(usuario);
    if (response.status == 200) {
      show('Usuário excluído com sucesso!', 'success');
      listarUsuario();
    } else {
      show('Ocorreu um erro ao tentar excluir o usuário', 'error');
    }
  };
  return (
    <>
      <Grid container spacing={3} mt={2}>
        {lista_usuario.map((usuario: any) => {
          return (
            <Grid
              key={usuario.id}
              size={{
                xs: 12,
                lg: 4,
              }}
            >
              <BlankCard>
                <CardContent>
                  <Stack direction={'row'} gap={2} alignItems="center">
                    <Avatar alt="Remy Sharp" src={usuario.avatar} />
                    <Box>
                      <Typography variant="h6" textOverflow={'ellipsis'} noWrap>
                        {usuario.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                      >
                        Administrador
                      </Typography>
                    </Box>
                    <Box ml="auto">
                      <Button
                        variant="text"
                        onClick={() =>
                          navigate('/usuarios/editar', { state: { usuario: usuario } })
                        }
                        color="primary"
                      >
                        Editar
                      </Button>
                      <Button
                        variant="text"
                        onClick={() => handleExcluirUsuario(usuario)}
                        color="primary"
                      >
                        Excluir
                      </Button>
                    </Box>
                  </Stack>
                </CardContent>
              </BlankCard>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default ListaUsuarios;
