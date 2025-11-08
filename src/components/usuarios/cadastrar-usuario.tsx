import { Close, PersonAdd } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { IconPlus } from '@tabler/icons-react';
import { useCallback, useState } from 'react';
import { useUsuarioStore } from 'src/store/Usuario/usuario-store';
import type { UsuarioType } from 'src/types/usuario/usuario';
import { swalErro, swalSucesso } from 'src/utils/swal';
import CustomTextField from '../forms/theme-elements/CustomTextField';
import CustomSelect from '../forms/theme-elements/CustomSelect';

const initialUsuarioState = {
  id: null,
  name: '',
  email: '',
  password: '',
  usuario_tipo_id: "fbf94274-9a4b-4372-90a3-b5ff10612a90",
};

export const CadastrarUsuario = () => {
  const [open, setOpen] = useState(false);
  const { cadastrarUsuario, listarUsuario, listarUsuarioTipo, lista_usuario_tipo } =
    useUsuarioStore();
  const onOpen = async () => {
    await listarUsuarioTipo();
    setOpen(true);
  };

  const [usuarioData, setUsuarioData] = useState<UsuarioType>(initialUsuarioState);

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

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUsuarioData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);
  return (
    <>
      <Button variant={'contained'} onClick={onOpen} startIcon={<IconPlus />}>
        Cadastrar
      </Button>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">Cadastro de Novo Usuário</DialogTitle>

        {/* Usamos Box com component="form" e onSubmit para lidar com a submissão */}
        <Box component="form" onSubmit={handleSubmit}>
          <DialogContent dividers>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Preencha os campos obrigatórios abaixo:
            </Typography>

            {/* Campo Nome */}
            <CustomTextField
              autoFocus
              margin="dense"
              id="name"
              name="name" // Importante para o handleInputChange
              label="Nome de Usuário"
              type="text"
              fullWidth
              variant="outlined"
              required
              value={usuarioData.name}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            <CustomTextField
              autoFocus
              margin="dense"
              id="email"
              name="email" // Importante para o handleInputChange
              label="E-mail de acesso"
              type="text"
              fullWidth
              variant="outlined"
              required
              value={usuarioData.email}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />

            {/* Campo Senha */}
            <CustomTextField
              margin="dense"
              id="password"
              name="password" // Importante para o handleInputChange
              label="Senha"
              type="password"
              fullWidth
              variant="outlined"
              required
              value={usuarioData.password}
              onChange={handleInputChange}
            />
            <FormControl margin="dense" fullWidth>
              <InputLabel>Tipo de acesso</InputLabel>
              <CustomSelect
                id="usuario_tipo_id"
                name="usuario_tipo_id" // Importante para o handleInputChange
                label="Tipo de acesso"
                fullWidth
                variant="outlined"
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
          </DialogContent>

          <DialogActions sx={{ p: 3, justifyContent: 'space-between' }}>
            {/* Botão Cancelar */}
            <Button onClick={onClose} startIcon={<Close />}>
              Cancelar
            </Button>

            {/* Botão Salvar/Cadastrar (é um type="submit") */}
            <Button
              type="submit"
              variant="contained"
              // Ícone corrigido: PersonAdd
              startIcon={<PersonAdd />}
              // Desabilita o botão se o nome ou a senha estiverem vazios
              disabled={!usuarioData.name || !usuarioData.password}
            >
              Salvar Cadastro
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};
