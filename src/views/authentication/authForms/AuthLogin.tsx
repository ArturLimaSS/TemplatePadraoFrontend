// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useState } from 'react';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  InputAdornment,
  IconButton,
  Alert,
  Collapse,
} from '@mui/material';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import { Link } from 'react-router';

import { loginType, type loginFormType } from 'src/types/auth/auth';
import CustomCheckbox from '../../../components/forms/theme-elements/CustomCheckbox';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';

import { useAuthStore } from 'src/store/Auth/auth-store';
import { swalErro, swalSucesso, toastSucesso } from 'src/utils/swal';
import { useLoading } from 'src/context/LoadingContext/LoadingContext';

const AuthLogin = () => {
  const { login, initializeAuth } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [capsLock, setCapsLock] = useState(false);

  const { setLoading } = useLoading();

  const [authData, setAuthData] = useState<loginFormType>({
    email: '',
    password: '',
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const isCapsLockOn = e.getModifierState('CapsLock');
    setCapsLock(isCapsLockOn);

    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const response = await login(authData);
    if (response?.status == 200) {
      toastSucesso('Login realizado com sucesso!');
    } else {
      swalErro('Credenciais inválidas');
    }
    setLoading(false);
  };
  return (
    <>
      {/* {subtext} */}

      <Stack>
        <Box>
          <CustomFormLabel htmlFor="username">E-mail</CustomFormLabel>
          <CustomTextField
            value={authData.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAuthData((prev) => ({ ...prev, email: e.target.value }))
            }
            onKeyDown={(e: React.KeyboardEvent) => {
              if (e.key === 'Enter') handleSubmit();
            }}
            id="email"
            variant="outlined"
            fullWidth
          />
        </Box>
        <Box>
          <CustomFormLabel htmlFor="password">Senha</CustomFormLabel>
          <CustomTextField
            value={authData.password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAuthData((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
            id="password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            onKeyUp={handleKeyDown}
            helperText={
              capsLock && (
                <Typography color="error" sx={{ mt: 0.5, display: 'block', fontWeight: 'bold' }}>
                  Caps Lock Ativado
                </Typography>
              )
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
          <FormGroup>
            <FormControlLabel
              control={<CustomCheckbox defaultChecked />}
              label="Lembrar este dispositivo por 30 dias"
            />
          </FormGroup>
          <Typography
            component={Link}
            to="/auth/forgot-password"
            fontWeight="500"
            sx={{
              textDecoration: 'none',
              color: 'primary.main',
            }}
          >
            Esqueci minha senha
          </Typography>
        </Stack>
      </Stack>
      <Box>
        <Button onClick={handleSubmit} color="primary" variant="contained" size="large" fullWidth>
          Entrar
        </Button>
      </Box>

      {/* {subtitle} */}
    </>
  );
};

export default AuthLogin;
