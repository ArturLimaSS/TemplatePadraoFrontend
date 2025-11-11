import { Card, CardContent, Button, Stack } from '@mui/material';
import { useState } from 'react';
import { useAuthStore } from 'src/store/Auth/auth-store';
import type { UsuarioType } from 'src/types/usuario/usuario';
import { swalErro, swalSucesso } from 'src/utils/swal';
import CustomTextField from '../forms/theme-elements/CustomTextField';

export const DadosAcesso = () => {
  const { usuario_logado, atualizarAcesso } = useAuthStore();

  const [userData, setUserData] = useState<UsuarioType>({
    id: usuario_logado?.id ?? null,
    name: usuario_logado?.name ?? '',
    email: usuario_logado?.email ?? '',
    usuario_tipo_id: usuario_logado?.usuario_tipo_id ?? null,
    password: '',
  });

  const handleChange = (field: keyof UsuarioType, value: any) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    const response = await atualizarAcesso(userData);
    if (response.status == 200) {
      swalSucesso(response.data.message);
      setTimeout(() => {
        const a = document.createElement('a');
        a.href = '/';
        a.click();
        a.remove();
      }, 1000);
    } else {
      swalErro(response.data.message);
    }
  };

  return (
    <Card
      variant="outlined"
      className="p-4"
      sx={{
        width: '100%',
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          <CustomTextField
            label="Nome"
            value={userData.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange('name', e.target.value)
            }
            fullWidth
          />

          <CustomTextField
            label="E-mail"
            type="email"
            value={userData.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange('email', e.target.value)
            }
            fullWidth
          />

          <CustomTextField
            label="Senha"
            type="password"
            value={userData.password ?? ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange('password', e.target.value)
            }
            fullWidth
          />

          <Button variant="contained" onClick={handleSubmit}>
            Salvar Alterações
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};
