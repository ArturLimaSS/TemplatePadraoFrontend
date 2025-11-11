import { Close, Save } from '@mui/icons-material';
import {
  Button,
  Container,
  DialogActions,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
} from '@mui/material';
import { Box } from '@mui/system';
import { useCallback, useEffect, useState } from 'react';
import { useUsuarioStore } from 'src/store/Usuario/usuario-store';
import type { UsuarioType } from 'src/types/usuario/usuario';
import { toastErro, toastSucesso } from 'src/utils/swal';
import CustomTextField from '../forms/theme-elements/CustomTextField';
import CustomSelect from '../forms/theme-elements/CustomSelect';
import { useNavigate } from 'react-router';

export const EditarUsuario = ({ usuario }) => {
  const { atualizarUsuario, listarUsuarioTipo, lista_usuario_tipo } = useUsuarioStore();

  const navigate = useNavigate();
  useEffect(() => {
    listarUsuarioTipo();
  }, []);

  const [usuarioData, setUsuarioData] = useState<UsuarioType>(usuario);

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

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUsuarioData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);
  return (
    <Container>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent dividers>
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
          <Button onClick={() => navigate('/usuarios')} startIcon={<Close />}>
            Cancelar
          </Button>

          {/* Botão Salvar/Cadastrar (é um type="submit") */}
          <Button type="submit" variant="contained" startIcon={<Save />}>
            Salvar
          </Button>
        </DialogActions>
      </Box>
    </Container>
  );
};
