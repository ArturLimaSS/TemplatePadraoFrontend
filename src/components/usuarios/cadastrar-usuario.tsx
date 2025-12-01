import { Close, Save } from '@mui/icons-material';
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Checkbox,
  Chip,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  Grow,
  InputLabel,
  MenuItem,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { IconLock, IconPlus, IconUserCircle } from '@tabler/icons-react';
import { useCallback, useState } from 'react';
import { useUsuarioStore } from 'src/store/Usuario/usuario-store';
import type { UsuarioType } from 'src/types/usuario/usuario';
import { swalErro, swalSucesso } from 'src/utils/swal';
import CustomTextField from '../forms/theme-elements/CustomTextField';
import CustomSelect from '../forms/theme-elements/CustomSelect';
import { apenasNumerosInteiros, clareiaCorEmEx, cpfMask, formatPhone } from 'src/utils/mask';
import { useInquilino } from 'src/store/Inquilino/inquilino-store';
import { usePerfilAcessoStore } from 'src/store/PerfilAcesso/perfil-acesso-store';
import type { PrefixoModulo } from 'src/store/PerfilAcesso/perfil-acesso-types';
import CustomFormLabel from '../forms/theme-elements/CustomFormLabel';
import { DynamicTablerIcon, type TablerIconName } from '../ui/dynamic-tabler-icon';

const initialUsuarioState: UsuarioType = {
  id: null,
  name: '',
  email: '',
  password: '',
  documento: '',
  usuario_tipo_id: 'fbf94274-9a4b-4372-90a3-b5ff10612a90',
};

export const CadastrarUsuario = () => {
  const { lista_modulos, listarModulos } = useInquilino();
  const [open, setOpen] = useState(false);
  const { listarPerfilAcesso, lista_perfil_acesso } = usePerfilAcessoStore();
  const { cadastrarUsuario, listarUsuario, listarUsuarioTipo, lista_usuario_tipo } =
    useUsuarioStore();
  const [usuarioData, setUsuarioData] = useState<UsuarioType>(initialUsuarioState);
  const onOpen = () => {
    setOpen(true);
    listarPerfilAcesso();
    listarModulos();
    setUsuarioData((prev) => ({
      ...prev,
      inquilino_usuario: {
        ...prev.inquilino_usuario,
        perfil_acesso: lista_perfil_acesso?.[0] ?? {},
      },
    }));
  };

  const onClose = () => {
    setOpen(false);
    setUsuarioData(initialUsuarioState);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await cadastrarUsuario(usuarioData);
    if (response.status == 200) {
      onClose();
      swalSucesso('Usuário cadastrado com sucesso!');
      listarUsuario();
    } else {
      swalErro('Ocorreu um erro ao tentar cadastrar o usuário');
    }
  };

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setUsuarioData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    },
    [],
  );

  const [campoSenha, setCampoSenha] = useState('password');

  const handleSetPerfilAcesso = (id: string) => {
    if (id == 'nenhum') {
      setUsuarioData((prev) => ({
        ...prev,
        inquilino_usuario: {
          ...prev.inquilino_usuario,
          perfil_acesso: {},
        },
      }));
    }
    const item = lista_perfil_acesso?.find((item) => item.id == id);
    setUsuarioData((prev) => ({
      ...prev,
      inquilino_usuario: {
        ...prev.inquilino_usuario,
        perfil_acesso: item,
      },
    }));
  };

  const handleToggleModulo = (prefixo: PrefixoModulo) => {
    const temModuloHabilitado = Object.entries(usuarioData?.inquilino_usuario?.perfil_acesso ?? {})
      .filter(([_, val]) => val !== undefined && val != null)
      .some(([key]) => key === prefixo);
    if (temModuloHabilitado) {
      setUsuarioData((prev) => {
        const perfilAcesso = usuarioData?.inquilino_usuario?.perfil_acesso;

        delete perfilAcesso?.[prefixo];
        return {
          ...prev,
          inquilino_usuario: {
            ...prev.inquilino_usuario,
            perfil_acesso: perfilAcesso,
          },
        };
      });
    } else {
      setUsuarioData((prev) => ({
        ...prev,
        inquilino_usuario: {
          ...prev.inquilino_usuario,
          perfil_acesso: {
            ...prev.inquilino_usuario?.perfil_acesso,
            [prefixo]: [],
          },
        },
      }));
    }
  };

  const handleTogglePermissao = ({
    prefixo,
    permissao_id,
  }: {
    prefixo: PrefixoModulo;
    permissao_id: string;
  }) => {
    const modulo = usuarioData?.inquilino_usuario?.perfil_acesso?.[prefixo];

    if (!modulo) return; // módulo não habilitado

    const checado = modulo.includes(permissao_id);

    const novoArray = checado
      ? modulo.filter((id) => id !== permissao_id) // remove
      : [...modulo, permissao_id]; // adiciona

    setUsuarioData((prev) => ({
      ...prev,
      inquilino_usuario: {
        ...prev.inquilino_usuario,
        perfil_acesso: {
          ...prev.inquilino_usuario?.perfil_acesso,
          [prefixo]: novoArray,
        },
      },
    }));
  };
  return (
    <>
      <Button variant={'contained'} onClick={onOpen} startIcon={<IconPlus />}>
        Cadastrar
      </Button>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Cadastro de Novo Usuário</DialogTitle>
        <Box component="form" onSubmit={handleSubmit}>
          <DialogContent
            dividers
            sx={{
              backgroundColor: 'background.default',
            }}
          >
            <Card>
              <CardContent>
                <Box
                  sx={{
                    color: 'text.disabled',
                    display: 'flex',
                    gap: 1,
                    alignItems: 'center',
                    mb: 1,
                  }}
                >
                  <IconUserCircle size={20} />
                  <Typography variant="body2" fontWeight={900}>
                    DADOS CADASTRAIS
                  </Typography>
                </Box>
                <Grid container spacing={2}>
                  <Grid
                    size={{
                      xs: 12,
                      lg: 4,
                    }}
                  >
                    <FormControl fullWidth>
                      <CustomFormLabel>Perfil de Acesso</CustomFormLabel>
                      <CustomSelect
                        id="perfil_acesso"
                        name="perfil_acesso"
                        fullWidth
                        required
                        value={usuarioData?.inquilino_usuario?.perfil_acesso?.id}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                          handleSetPerfilAcesso(e.target.value)
                        }
                      >
                        {lista_perfil_acesso?.map((perfil, index) => (
                          <MenuItem key={index} value={perfil.id}>
                            {perfil.nome}
                          </MenuItem>
                        ))}
                      </CustomSelect>
                    </FormControl>
                  </Grid>
                  <Grid
                    size={{
                      xs: 12,
                      lg: 8,
                    }}
                  >
                    <CustomFormLabel>Nome Completo</CustomFormLabel>
                    <CustomTextField
                      id="name"
                      name="name"
                      type="text"
                      fullWidth
                      required
                      value={usuarioData.name}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid
                    size={{
                      xs: 12,
                      lg: 6,
                    }}
                  >
                    <CustomFormLabel>Email Corporativo</CustomFormLabel>
                    <CustomTextField
                      id="email"
                      name="email"
                      type="text"
                      fullWidth
                      required
                      value={usuarioData.email}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid
                    size={{
                      xs: 12,
                      lg: 6,
                    }}
                  >
                    <CustomFormLabel>Telefone / Celular</CustomFormLabel>
                    <CustomTextField
                      id="inquilino_usuario.telefone"
                      name="inquilino_usuario.telefone"
                      type="text"
                      fullWidth
                      required
                      value={formatPhone(String(usuarioData.inquilino_usuario?.telefone))}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setUsuarioData((prev) => ({
                          ...prev,
                          inquilino_usuario: {
                            ...prev.inquilino_usuario,
                            telefone: apenasNumerosInteiros(e.target.value),
                          },
                        }))
                      }
                    />
                  </Grid>

                  <Grid
                    size={{
                      xs: 12,
                      lg: 6,
                    }}
                  >
                    <CustomFormLabel>CPF</CustomFormLabel>
                    <CustomTextField
                      id="documento"
                      name="documento"
                      type="text"
                      fullWidth
                      required
                      value={cpfMask(String(usuarioData.documento))}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setUsuarioData((prev) => ({
                          ...prev,
                          documento: apenasNumerosInteiros(e.target.value),
                        }))
                      }
                    />
                  </Grid>
                  <Grid
                    size={{
                      xs: 12,
                      lg: 6,
                    }}
                  >
                    <CustomFormLabel>Nº Matrícula</CustomFormLabel>
                    <CustomTextField
                      id="inquilino_usuario.matricula"
                      name="inquilino_usuario.matricula"
                      type="text"
                      fullWidth
                      required
                      value={usuarioData.inquilino_usuario?.matricula}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setUsuarioData((prev) => ({
                          ...prev,
                          inquilino_usuario: {
                            ...prev.inquilino_usuario,
                            matricula: e.target.value,
                          },
                        }))
                      }
                    />
                  </Grid>

                  {/* Campo Senha */}
                  <Grid
                    size={{
                      xs: 12,
                      lg: 6,
                    }}
                  >
                    <CustomFormLabel>Senha</CustomFormLabel>
                    <CustomTextField
                      id="password"
                      name="password"
                      type="password"
                      fullWidth
                      value={usuarioData.password}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid
                    size={{
                      xs: 12,
                      lg: 6,
                    }}
                  >
                    <CustomFormLabel>Tipo de Usuário</CustomFormLabel>
                    <FormControl fullWidth>
                      <CustomSelect
                        id="usuario_tipo_id"
                        name="usuario_tipo_id"
                        fullWidth
                        required
                        value={usuarioData.usuario_tipo_id}
                        onChange={handleInputChange}
                      >
                        {lista_usuario_tipo?.map((tipo, index) => (
                          <MenuItem key={index} value={tipo.id}>
                            {tipo.nome}
                          </MenuItem>
                        ))}
                      </CustomSelect>
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Box
              sx={{
                color: 'text.disabled',
                display: 'flex',
                gap: 1,
                alignItems: 'center',
                my: 2,
                justifyContent: 'space-between',
              }}
            >
              <Box
                sx={{
                  color: 'text.disabled',
                  display: 'flex',
                  gap: 1,
                  alignItems: 'center',
                }}
              >
                <IconLock size={20} />
                <Typography variant="body2" fontWeight={900}>
                  {String('Acesso aos Módulos').toUpperCase()}
                </Typography>
              </Box>

              <Chip
                label={
                  Object.entries(usuarioData?.inquilino_usuario?.perfil_acesso ?? {})
                    ?.filter(([key, _]) => lista_modulos?.map((m) => m.prefixo).includes(key))
                    .flatMap(([_, value]) => (value ? value : [])).length + ' permissões'
                }
                size="small"
              />
            </Box>
            {Object.entries(usuarioData?.inquilino_usuario?.perfil_acesso ?? {}).length > 0 &&
              lista_modulos?.map((modulo) => {
                const prefixo = modulo.prefixo as PrefixoModulo;
                const permissoes = usuarioData?.inquilino_usuario?.perfil_acesso?.[prefixo];
                const temModuloHabilitado = Object.entries(
                  usuarioData?.inquilino_usuario?.perfil_acesso ?? {},
                )
                  .filter(([_, val]) => val !== undefined && val != null)
                  .some(([key]) => key === prefixo);

                return (
                  <Card
                    elevation={1}
                    key={prefixo}
                    sx={{
                      mt: 2,
                      border: temModuloHabilitado ? '2px solid' : '1px solid',
                      borderColor: temModuloHabilitado ? '#93c5fd' : 'divider',
                      transition: 'all 0.3s ease-in-out',
                    }}
                  >
                    <CardHeader
                      title={
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Box
                            sx={{
                              borderRadius: 0.5,
                              width: '35px',
                              height: '35px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: temModuloHabilitado ? modulo.cor : '#9ca3af',
                              backgroundColor: clareiaCorEmEx(
                                temModuloHabilitado ? modulo.cor : '#9ca3af',
                                30,
                              ),
                            }}
                          >
                            <DynamicTablerIcon icon={modulo.icone as TablerIconName} />
                          </Box>
                          <Box>
                            <Typography sx={{ fontWeight: 900 }}>{modulo.nome}</Typography>
                            <Typography
                              variant="body2"
                              color="text.disabled"
                              sx={{ fontWeight: 900 }}
                            >
                              {temModuloHabilitado ? 'Módulo habilitado' : 'Acesso bloqueado'}
                            </Typography>
                          </Box>
                        </Box>
                      }
                      action={
                        <Switch
                          checked={temModuloHabilitado}
                          onChange={() => handleToggleModulo(prefixo)}
                        />
                      }
                    />
                    <Collapse
                      {...(!temModuloHabilitado ? { timeout: 600 } : {})}
                      in={temModuloHabilitado}
                    >
                      <Box
                        sx={{
                          borderTop: '1px solid',
                          borderColor: 'divider',
                          borderRadius: 0,
                          p: 1,
                          backgroundColor: 'background.default',
                        }}
                      >
                        <Grow
                          appear={true}
                          in={temModuloHabilitado}
                          {...(temModuloHabilitado ? { timeout: 600 } : {})}
                        >
                          <Box sx={{ mt: 1 }}>
                            <Typography
                              sx={(theme) => ({
                                mb: 2,
                                color: theme.palette.text.disabled,
                                fontWeight: '900',
                              })}
                            >
                              PERMISSÕES ESPECIFICAS
                            </Typography>
                            <Grid container spacing={2}>
                              {modulo?.permissao?.map((p) => {
                                const checked = permissoes?.some((item) => item === p.id);
                                return (
                                  <Grid size={{ xs: 6 }}>
                                    <Card
                                      sx={{
                                        borderRadius: 0.5,
                                        borderColor: checked ? 'info.main' : 'divider',
                                        backgroundColor: checked
                                          ? 'info.light'
                                          : 'background.paper',
                                      }}
                                      variant="outlined"
                                    >
                                      <CardActionArea
                                        onClick={() =>
                                          handleTogglePermissao({
                                            prefixo,
                                            permissao_id: String(p.id),
                                          })
                                        }
                                      >
                                        <CardContent sx={{ p: 0.5, display: 'flex', gap: 2 }}>
                                          <Checkbox checked={checked} />
                                          <Stack>
                                            <Typography
                                              sx={{
                                                mt: 1,
                                                fontWeight: '900',
                                                color: checked ? 'info.dark' : 'text.primary',
                                              }}
                                            >
                                              {p.nome}
                                            </Typography>
                                            {p.permissao_critica == '1' && (
                                              <Typography
                                                sx={{
                                                  fontWeight: '900',
                                                  fontSize: '.5rem',

                                                  color: 'error.main',
                                                }}
                                              >
                                                {String('crítico').toUpperCase()}
                                              </Typography>
                                            )}
                                          </Stack>
                                        </CardContent>
                                      </CardActionArea>
                                    </Card>
                                  </Grid>
                                );
                              })}
                            </Grid>
                          </Box>
                        </Grow>
                      </Box>
                    </Collapse>
                  </Card>
                );
              })}
          </DialogContent>

          <DialogActions>
            {/* Botão Cancelar */}
            <Button onClick={() => onClose()} startIcon={<Close />}>
              Cancelar
            </Button>

            {/* Botão Salvar/Cadastrar (é um type="submit") */}
            <Button type="submit" variant="contained" startIcon={<Save />}>
              Salvar
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};
