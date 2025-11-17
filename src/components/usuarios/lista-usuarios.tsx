import {
  CardContent,
  Box,
  Stack,
  Avatar,
  Grid,
  Button,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Alert,
  Card,
} from '@mui/material';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useContext, useEffect, useState } from 'react';
import BlankCard from 'src/components/shared/BlankCard';
import { useUsuarioStore } from 'src/store/Usuario/usuario-store';
import { useNavigate } from 'react-router';
import { useAlert } from 'src/context/Alert/useAlert';
import { MoreVert } from '@mui/icons-material';
import type { UsuarioType } from 'src/types/usuario/usuario';
import { useLoading } from 'src/context/LoadingContext/LoadingContext';
import { swalErro, swalSucesso } from 'src/utils/swal';

const ListaUsuarios = () => {
  const { lista_usuario, listarUsuario, excluirUsuario, isUsuarioLoading } = useUsuarioStore();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<UsuarioType | {}>({});
  const menuOpen = Boolean(anchorEl);
  const onOpenMenu = (event: React.MouseEvent<HTMLElement>, usuario: UsuarioType) => {
    setAnchorEl(event.currentTarget);
    setUsuarioSelecionado(usuario);
  };
  const onCloseMenu = () => {
    setAnchorEl(null);
    setUsuarioSelecionado({});
  };
  const navigate = useNavigate();

  const { setLoading } = useLoading();

  useEffect(() => {
    setLoading(isUsuarioLoading);
  }, [isUsuarioLoading]);

  useEffect(() => {
    listarUsuario();
  }, []);

  const { dialogConfirmacao } = useAlert();
  const handleExcluirUsuario = async (usuario: UsuarioType) => {
    const confirmacao = await dialogConfirmacao({
      title: 'Deseja realmente excluir este usuário?',
      content: 'Esta ação não poderá ser revertida',
    });

    if (!confirmacao) {
      return;
    }

    const response = await excluirUsuario(usuario);

    console.log(response);
    if (response.status == 200) {
      swalSucesso('Usuário excluído com sucesso!');
      listarUsuario();
      onCloseMenu();
    } else {
      swalErro('Ocorreu um erro ao tentar excluir o usuário');
    }
  };

  return (
    <>
      <Grid container spacing={3} mt={2}>
        {lista_usuario?.length == 0 && (
          <Grid
            size={{
              xs: 12,
            }}
          >
            <Alert variant="standard" severity="info">
              <Typography>Nenhum acesso cadastrado!</Typography>
            </Alert>
          </Grid>
        )}
        {lista_usuario.map((usuario: any) => {
          return (
            <Grid
              key={usuario.id}
              size={{
                xs: 12,
                lg: 4,
              }}
            >
              <Card elevation={0}>
                <CardContent>
                  <Box>
                    <Stack direction={'row'} gap={2} alignItems="center" justifyContent={'center'}>
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
                        <IconButton onClick={(e) => onOpenMenu(e, usuario)}>
                          <MoreVert />
                        </IconButton>
                      </Box>
                    </Stack>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Menu open={menuOpen} onClose={onCloseMenu} anchorEl={anchorEl}>
        <MenuItem
          onClick={() => navigate('/usuarios/editar', { state: { usuario: usuarioSelecionado } })}
          color="primary"
        >
          Editar
        </MenuItem>
        <MenuItem onClick={() => handleExcluirUsuario(usuarioSelecionado)} color="primary">
          Excluir
        </MenuItem>
      </Menu>
    </>
  );
};

export default ListaUsuarios;
