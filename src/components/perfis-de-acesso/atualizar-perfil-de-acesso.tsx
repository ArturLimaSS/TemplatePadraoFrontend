import { Add, CheckBox, CheckBoxOutlineBlank, Edit } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  Grow,
  IconButton,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useInquilino } from 'src/store/Inquilino/inquilino-store';
import { usePerfilAcessoStore } from 'src/store/PerfilAcesso/perfil-acesso-store';
import type { PerfilAcessoType, PrefixoModulo } from 'src/store/PerfilAcesso/perfil-acesso-types';
import CustomTextField from '../forms/theme-elements/CustomTextField';
import { swalErro, swalSucesso } from 'src/utils/swal';
import CustomFormLabel from '../forms/theme-elements/CustomFormLabel';
import { DynamicTablerIcon, type TablerIconName } from '../ui/dynamic-tabler-icon';
import { clareiaCorEmEx } from 'src/utils/mask';

interface AtualizarPerfilAcessoComponentProps {
  perfil_acesso: PerfilAcessoType;
}

export const AtualizarPerfilDeAcesso = ({ perfil_acesso }: AtualizarPerfilAcessoComponentProps) => {
  const { lista_modulos, listarModulos } = useInquilino();
  const { atualizarPerfilAcesso, listarPerfilAcesso } = usePerfilAcessoStore();
  const [open, setOpen] = useState(false);

  const [perfilAcessoData, setPerfilAcessoData] = useState<PerfilAcessoType>(perfil_acesso);

  const onOpen = async () => {
    listarModulos();
    setOpen(true);
    setPerfilAcessoData(perfil_acesso);
  };

  const onClose = () => {
    setOpen(false);
    setPerfilAcessoData(perfil_acesso);
  };

  const handleCadastrarPerfilDeAcesso = async () => {
    const response = await atualizarPerfilAcesso(perfilAcessoData);

    if (response.status == 200) {
      listarPerfilAcesso();
      onClose();
      swalSucesso('Perfil atualizado com sucesso!');
    } else {
      swalErro('Ocorreu um erro ao tentar atualizar o perfil de acesso!');
    }
  };

  const handleToggleModulo = (prefixo: PrefixoModulo) => {
    const temModuloHabilitado = Object.entries(perfilAcessoData ?? {})
      .filter(([_, val]) => val !== undefined && val != null)
      .some(([key]) => key === prefixo);
    if (temModuloHabilitado) {
      setPerfilAcessoData((prev) => {
        const novo = { ...prev };
        delete novo[prefixo];
        return novo;
      });
    } else {
      setPerfilAcessoData((prev) => ({
        ...prev,
        [prefixo]: [],
      }));
    }

    setPerfilAcessoData((prev) => ({
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
    const modulo = perfilAcessoData[prefixo] as string[] | undefined;

    if (!modulo) return;

    const checado = modulo.includes(permissao_id);

    const novoArray = checado
      ? modulo.filter((id) => id !== permissao_id)
      : [...modulo, permissao_id];

    setPerfilAcessoData((prev) => ({
      ...prev,
      [prefixo]: novoArray,
    }));
  };

  return (
    <>
      <IconButton onClick={onOpen}>
        <Edit />
      </IconButton>

      <Dialog maxWidth="md" fullWidth open={open} onClose={onClose}>
        <DialogTitle>Cadastrar novo perfil de acesso</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <CustomFormLabel>Nome do perfil</CustomFormLabel>
            <CustomTextField
              fullWidth
              placeholder="Ex: Administrador"
              value={perfilAcessoData.nome}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPerfilAcessoData((prev) => ({
                  ...prev,
                  nome: e.target.value,
                }))
              }
            />
          </FormControl>
          {Object.entries(perfilAcessoData ?? {}).length > 0 &&
            lista_modulos?.map((modulo) => {
              const prefixo = modulo.prefixo as PrefixoModulo;
              const permissoes = perfilAcessoData?.[prefixo];
              const temModuloHabilitado = Object.entries(perfilAcessoData ?? {})
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
                                      backgroundColor: checked ? 'info.light' : 'background.paper',
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
                                        <Box sx={{ p: 0.5 }}>
                                          {checked ? (
                                            <CheckBox sx={{ color: 'info.dark' }} />
                                          ) : (
                                            <CheckBoxOutlineBlank sx={{ color: 'text.disabled' }} />
                                          )}
                                        </Box>
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
          <Button onClick={handleCadastrarPerfilDeAcesso}>Salvar</Button>
          <Button onClick={onClose}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
