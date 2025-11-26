import { Add, Edit } from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Switch,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useInquilino } from 'src/store/Inquilino/inquilino-store';
import { usePerfilAcessoStore } from 'src/store/PerfilAcesso/perfil-acesso-store';
import type { PerfilAcessoType, PrefixoModulo } from 'src/store/PerfilAcesso/perfil-acesso-types';
import CustomTextField from '../forms/theme-elements/CustomTextField';
import { swalErro, swalSucesso } from 'src/utils/swal';

interface AtualizarPerfilAcessoComponentProps {
  perfil_acesso: PerfilAcessoType
}

export const AtualizarPerfilDeAcesso = ({
  perfil_acesso
}: AtualizarPerfilAcessoComponentProps) => {
  const { lista_modulos, listarModulos } = useInquilino();
  const { atualizarPerfilAcesso, listarPerfilAcesso } = usePerfilAcessoStore();
  const [open, setOpen] = useState(false);

  const [perfilAcessoData, setPerfilAcessoData] =
    useState<PerfilAcessoType>(perfil_acesso);

  const onOpen = async () => {
    listarModulos();
    setOpen(true);
    setPerfilAcessoData(perfil_acesso)
  };

  // useEffect(() => {
  //   lista_modulos?.map((modulo) => {
  //     const prefixo = modulo.prefixo as keyof PerfilAcessoType;

  //     setPerfilAcessoData((prev) => ({
  //       ...prev,
  //       [prefixo]: [],
  //     }));
  //   });
  // }, [lista_modulos]);

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
    if (Object(perfilAcessoData).hasOwnProperty(prefixo)) {
      setPerfilAcessoData((prev) => {
        const novo = { ...prev };
        delete novo[prefixo]; // remove a chave do objeto
        return novo;
      });
    } else {
      const modulo = lista_modulos?.find((item) => item.prefixo == prefixo);
      setPerfilAcessoData((prev) => ({
        ...prev,
        [prefixo]: modulo?.permissao?.map((permissao) => ({
          permissao_id: permissao.id,
          nome: permissao.nome,
          habilitado: false,
        })),
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

    if (!modulo) return; // módulo não habilitado

    const checado = modulo.includes(permissao_id);

    const novoArray = checado
      ? modulo.filter((id) => id !== permissao_id) // remove
      : [...modulo, permissao_id]; // adiciona

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

      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Cadastrar novo perfil de acesso</DialogTitle>
        <DialogContent>
          <CustomTextField
            label="Nome do perfil"
            value={perfilAcessoData.nome}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPerfilAcessoData((prev) => ({
                ...prev,
                nome: e.target.value,
              }))
            }
          />
          {lista_modulos?.map((modulo) => {
            const prefixo = modulo.prefixo as PrefixoModulo;
            const permissoes = perfilAcessoData[prefixo];

            return (
              <Box key={prefixo} sx={{ mt: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={Object.entries(perfilAcessoData).some(([key]) => key === prefixo)}
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
          <Button onClick={handleCadastrarPerfilDeAcesso}>Salvar</Button>
          <Button onClick={onClose}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
