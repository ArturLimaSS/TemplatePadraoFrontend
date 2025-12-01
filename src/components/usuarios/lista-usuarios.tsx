import {
  CardContent,
  Box,
  Stack,
  Avatar,
  Grid,
  Typography,
  Menu,
  MenuItem,
  Alert,
  Card,
  IconButton,
  Paper,
  Chip,
  InputAdornment,
  Button,
  CardActions,
  Divider,
} from '@mui/material';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useContext, useEffect, useState } from 'react';
import { useUsuarioStore } from 'src/store/Usuario/usuario-store';
import { useNavigate } from 'react-router';
import { useAlert } from 'src/context/Alert/useAlert';
import type { UsuarioType } from 'src/types/usuario/usuario';
import { useLoading } from 'src/context/LoadingContext/LoadingContext';
import { swalErro, swalSucesso } from 'src/utils/swal';
import { EditarUsuario } from './editar-usuario';
import { Delete, Search } from '@mui/icons-material';
import { clareiaCorEmEx, cpfMask, primeirasLetrasNome } from 'src/utils/mask';
import { usePerfilAcessoStore } from 'src/store/PerfilAcesso/perfil-acesso-store';
import CustomTextField from '../forms/theme-elements/CustomTextField';
import { useInquilino } from 'src/store/Inquilino/inquilino-store';
import { IconPackage, IconShieldCheck } from '@tabler/icons-react';

const ListaUsuarios = () => {
  const { lista_usuario, listarUsuario, excluirUsuario, isUsuarioLoading } = useUsuarioStore();
  const { listarPerfilAcesso, lista_perfil_acesso } = usePerfilAcessoStore();
  const { lista_modulos, listarModulos } = useInquilino();
  const [busca, setBusca] = useState('');
  const [perfilFiltro, setPerfilFiltro] = useState('todos');

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

  const usuariosFiltrados = lista_usuario?.filter((usuario: UsuarioType) => {
    // --- FILTRO DE BUSCA ---
    const termo = busca.toLowerCase();
    const nome = usuario.name?.toLowerCase() ?? '';
    const email = usuario.email?.toLowerCase() ?? '';
    const cpf = String(usuario?.documento ?? '').toLowerCase();

    const matchBusca = nome.includes(termo) || email.includes(termo) || cpf.includes(termo);

    // --- FILTRO PERFIL ---
    const perfilAcesso = JSON.parse(String(usuario?.inquilino_usuario?.perfil_acesso ?? '{}'));
    const idPerfil = String(perfilAcesso?.id ?? '');

    const matchPerfil = perfilFiltro === 'todos' || perfilFiltro === idPerfil;

    return matchBusca && matchPerfil;
  });

  const { setLoading } = useLoading();

  useEffect(() => {
    setLoading(isUsuarioLoading);
  }, [isUsuarioLoading]);

  useEffect(() => {
    listarUsuario();
    listarPerfilAcesso();
    listarModulos();
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
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            {/* INPUT DE BUSCA */}
            <Grid size={12}>
              <CustomTextField
                variant="standard"
                placeholder="Buscar por nome, email ou CPF..."
                value={busca}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {' '}
                      <Search />{' '}
                    </InputAdornment>
                  ),
                  disableUnderline: true,
                }}
                slotProps={{
                  textField: {},
                }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBusca(e.target.value)}
              />
            </Grid>

            {/* BOTÕES DE PERFIL */}
            <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', px: 1 }}>
              <Button
                disableElevation
                onClick={() => setPerfilFiltro('todos')}
                variant={perfilFiltro === 'todos' ? 'text' : 'outlined'}
                sx={(theme) => {
                  const base = '#000';
                  const hover = clareiaCorEmEx(base, 20); // usa sua função!

                  return {
                    borderRadius: 0.5,
                    backgroundColor: perfilFiltro === 'todos' ? base : 'transparent',
                    color: perfilFiltro === 'todos' ? '#fff' : base,
                    border: '1px solid',
                    borderColor: base,

                    '&:hover': {
                      backgroundColor: '#000',
                      borderColor: '#000',
                    },
                  };
                }}
              >
                Todos
              </Button>

              {lista_perfil_acesso?.map((perfil) => (
                <Button
                  sx={{
                    borderRadius: 0.5,
                    border: '1px solid',
                    borderColor: (theme) => clareiaCorEmEx(theme.palette.primary.main, 20),
                  }}
                  disableElevation
                  variant={perfilFiltro === String(perfil.id) ? 'text' : 'outlined'}
                  onClick={() => setPerfilFiltro(String(perfil.id))}
                >
                  {perfil.nome}
                </Button>
              ))}
            </Box>
          </Grid>
        </CardContent>
      </Card>

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
        {usuariosFiltrados.map((usuario: UsuarioType) => {
          const inquilino_usuario = usuario?.inquilino_usuario;
          const perfilAcesso = JSON.parse(String(inquilino_usuario?.perfil_acesso ?? '{}'));
          const perfil = lista_perfil_acesso.find((perfil: any) => perfil.id == perfilAcesso.id);

          return (
            <Grid
              key={usuario.id}
              size={{
                xs: 12,
                lg: 4,
              }}
            >
              <Card variant="outlined">
                <CardContent>
                  <Box>
                    <Stack direction={'row'} gap={2} alignItems="center" justifyContent={'center'}>
                      <Stack gap={2} sx={{ width: '100%', alignItems: 'start' }}>
                        <Box
                          sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              gap: 2,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Box
                              sx={{
                                backgroundColor: 'background.default',
                                fontWeight: 'bold',
                                p: 1.8,
                              }}
                            >
                              <Typography fontSize={'1rem'} fontWeight={'900'}>
                                {primeirasLetrasNome(usuario.name)}
                              </Typography>
                            </Box>
                            <Box>
                              <Box>
                                <Typography variant="h6" textOverflow={'ellipsis'} noWrap>
                                  {usuario.name}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                                >
                                  {usuario.email}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                          <Box>
                            <EditarUsuario usuario={usuario} />
                          </Box>
                        </Box>
                        <Box>
                          <Chip label={perfil?.nome} size="small" />
                        </Box>
                        <Grid container spacing={2} sx={{ width: '100%' }}>
                          <Grid size="grow">
                            <Typography sx={{ fontWeight: '900' }}>Matricula</Typography>
                            <Typography>{inquilino_usuario?.matricula}</Typography>
                          </Grid>
                          <Grid size="grow">
                            <Typography sx={{ fontWeight: '900' }}>CPF</Typography>
                            <Typography>{cpfMask(String(usuario?.documento))}</Typography>
                          </Grid>
                        </Grid>
                      </Stack>
                    </Stack>
                  </Box>
                </CardContent>
                <Divider />
                <CardActions sx={{display: 'flex', justifyContent: 'space-between'}}>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 0.5,
                        color: (theme) => clareiaCorEmEx(theme.palette.text.primary, 99),
                        alignItems: 'center',
                      }}
                    >
                      <IconPackage size={20} opacity={2} />
                      <Typography sx={{ fontWeight: 900 }}>
                        {
                          Object.entries(perfilAcesso ?? {})
                            ?.filter(([key, _]) =>
                              lista_modulos?.map((m) => m.prefixo).includes(key),
                            )
                            .filter(([_, value]) => value).length
                        }
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                        gap: 0.5,
                        color: (theme) => clareiaCorEmEx(theme.palette.text.primary, 99),
                        alignItems: 'center',
                      }}
                    >
                      <IconShieldCheck size={20} opacity={2} />
                      <Typography sx={{ fontWeight: 900 }}>
                        {
                          Object.entries(perfilAcesso ?? {})
                            ?.filter(([key, _]) =>
                              lista_modulos?.map((m) => m.prefixo).includes(key),
                            )
                            .flatMap(([_, value]) => (value ? value : [])).length
                        }
                      </Typography>
                    </Box>
                  </Box>
                  <IconButton color="error" onClick={() => handleExcluirUsuario(usuario)}>
                    <Delete />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default ListaUsuarios;
