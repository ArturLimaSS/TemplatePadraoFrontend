import { Close, Edit, Save } from '@mui/icons-material';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Switch,
} from '@mui/material';
import { Box } from '@mui/system';
import { useCallback, useEffect, useState } from 'react';
import { useUsuarioStore } from 'src/store/Usuario/usuario-store';
import type { UsuarioType } from 'src/types/usuario/usuario';
import { toastErro, toastSucesso } from 'src/utils/swal';
import CustomTextField from '../forms/theme-elements/CustomTextField';
import CustomSelect from '../forms/theme-elements/CustomSelect';
import { useNavigate } from 'react-router';
import { usePerfilAcessoStore } from 'src/store/PerfilAcesso/perfil-acesso-store';
import { useInquilino } from 'src/store/Inquilino/inquilino-store';
import type { PrefixoModulo } from 'src/store/PerfilAcesso/perfil-acesso-types';
import { apenasNumerosInteiros, formatPhone } from 'src/utils/mask';

const initialUsuarioState = {
  id: null,
  name: '',
  email: '',
  password: '',
  usuario_tipo_id: 'fbf94274-9a4b-4372-90a3-b5ff10612a90',
};

interface EditarUsuarioProps {
  usuario: UsuarioType;
}
export const EditarUsuario = ({ usuario }: EditarUsuarioProps) => {
  const { atualizarUsuario, listarUsuarioTipo, lista_usuario_tipo } = useUsuarioStore();
  const { listarPerfilAcesso, lista_perfil_acesso } = usePerfilAcessoStore();

  const { lista_modulos, listarModulos } = useInquilino();
  const navigate = useNavigate();
  useEffect(() => {
    listarUsuarioTipo();
  }, []);

  const [usuarioData, setUsuarioData] = useState<UsuarioType>({
    ...initialUsuarioState,
    ...usuario,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await atualizarUsuario(usuarioData);
    if (response.status == 200) {
      toastSucesso('Usuário atualizado com sucesso!');
      navigate('/usuarios');
    } else {
      toastErro('Ocorreu um erro ao tentar atualizar o usuário');
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

  const [open, setOpen] = useState(false);
  const onOpen = () => {
    setOpen(true);
    listarPerfilAcesso();
    listarModulos();
  };

  const onClose = () => {
    setOpen(false);
    setUsuarioData(usuario);
  };

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
    if (Object(usuarioData?.inquilino_usuario?.perfil_acesso).hasOwnProperty(prefixo)) {
      setUsuarioData((prev) => {
        const perfilAcesso = usuarioData?.inquilino_usuario?.perfil_acesso;

        delete perfilAcesso?.[prefixo]; // remove a chave do objeto
        return {
          ...prev,
          inquilino_usuario: {
            ...prev.inquilino_usuario,
            perfil_acesso: perfilAcesso,
          },
        };
      });
    } else {
      const modulo = lista_modulos?.find((item) => item.prefixo == prefixo);
      setUsuarioData((prev) => ({
        ...prev,
        inquilino_usuario: {
          ...prev.inquilino_usuario,
          perfil_acesso: {
            ...prev.inquilino_usuario?.perfil_acesso,
            [prefixo]: modulo?.permissao?.map((permissao) => ({
              permissao_id: permissao.id,
              nome: permissao.nome,
              habilitado: false,
            })),
          },
        },
      }));
    }

    setUsuarioData((prev) => ({
      ...prev,
    }));
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
      <IconButton onClick={onOpen}>
        <Edit />
      </IconButton>
      <Dialog scroll='body' open={open} onClose={onClose}>
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>Editar Usuário</DialogTitle>
          <DialogContent dividers>
            <Card>
              {/* Campo Nome */}
              <CardHeader title="Dados Cadastrais" />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid
                    size={{
                      xs: 12,
                      lg: 4,
                    }}
                  > 
                    <CustomTextField
                      id="name"
                      name="name"
                      label="Nome Completo"
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
                      lg: 8,
                    }}
                  >
                    <CustomTextField
                      id="email"
                      name="email"
                      label="Email Corporativo"
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
                    <CustomTextField
                      id="inquilino_usuario.telefone"
                      name="inquilino_usuario.telefone"
                      label="Telefone / Celular "
                      type="text"
                      fullWidth
                      required
                      value={formatPhone(String(usuarioData.inquilino_usuario?.telefone))}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsuarioData(prev=> ({
                        ...prev,
                        inquilino_usuario: {
                          ...prev.inquilino_usuario,
                          telefone: apenasNumerosInteiros(e.target.value)
                        }
                      }))}
                    />
                  </Grid>
              

                  <Grid
                    size={{
                      xs: 12,
                      lg: 6,
                    }}
                  >
                    <CustomTextField
                      id="email"
                      name="email"
                      label="CPF"
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
                    <CustomTextField
                      id="inquilino_usuario.matricula"
                      name="inquilino_usuario.matricula"
                      label="Nº Matrícula"
                      type="text"
                      fullWidth
                      required
                      value={usuarioData.inquilino_usuario?.matricula}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsuarioData(prev=> ({
                        ...prev,
                        inquilino_usuario: {
                          ...prev.inquilino_usuario,
                          matricula: e.target.value
                        }
                      }))}
                    />
                  </Grid>

                  {/* Campo Senha */}
                  <Grid
                    size={{
                      xs: 12,
                      lg: 6,
                    }}
                  >
                    <CustomTextField
                      id="password"
                      name="password"
                      label="Senha"
                      type="password"
                      fullWidth
                      value={usuarioData.password}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid
                    size={{
                      xs: 12,
                      lg: 12,
                    }}
                  >
                    <FormControl fullWidth>
                      <InputLabel>Tipo de acesso</InputLabel>
                      <CustomSelect
                        id="usuario_tipo_id"
                        name="usuario_tipo_id"
                        label="Tipo de acesso"
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
                  <Grid
                    size={{
                      xs: 12,
                      lg: 12,
                    }}
                  >
                    <FormControl fullWidth>
                      <InputLabel>Perfil</InputLabel>
                      <CustomSelect
                        id="perfil_acesso"
                        name="perfil_acesso"
                        label="Perfil"
                        fullWidth
                        required
                        value={usuarioData?.inquilino_usuario?.perfil_acesso?.id}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                          handleSetPerfilAcesso(e.target.value)
                        }
                      >
                        <MenuItem value={'nenhum'}>-- Selecione --</MenuItem>
                        {lista_perfil_acesso?.map((perfil, index) => (
                          <MenuItem key={index} value={perfil.id}>
                            {perfil.nome}
                          </MenuItem>
                        ))}
                      </CustomSelect>
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            {Object.entries(usuarioData?.inquilino_usuario?.perfil_acesso ?? {}).length > 0 &&
              lista_modulos?.map((modulo) => {
                const prefixo = modulo.prefixo as PrefixoModulo;
                const permissoes = usuarioData?.inquilino_usuario?.perfil_acesso?.[prefixo];

                return (
                  <Box key={prefixo} sx={{ mt: 2 }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={Object.entries(
                            usuarioData?.inquilino_usuario?.perfil_acesso ?? {},
                          ).some(([key]) => key === prefixo)}
                          onChange={() => handleToggleModulo(prefixo)}
                        />
                      }
                      label={modulo.nome}
                    />

                    <Box sx={{ ml: 4 }}>
                      {modulo?.permissao?.map((p) => (
                        <FormControlLabel
                          key={p.id}
                          control={
                            <Checkbox
                              checked={permissoes?.some((item) => item === p.id)}
                              onChange={() =>
                                handleTogglePermissao({ prefixo, permissao_id: String(p.id) })
                              }
                            />
                          }
                          label={p.nome}
                        />
                      ))}
                    </Box>
                  </Box>
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
