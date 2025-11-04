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
  Divider,
} from '@mui/material';
import { Link } from 'react-router';

import { loginType, type loginFormType } from 'src/types/auth/auth';
import CustomCheckbox from '../../../components/forms/theme-elements/CustomCheckbox';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';

import AuthSocialButtons from './AuthSocialButtons';
import { Password } from '@mui/icons-material';
import { useAuthStore } from 'src/store/Auth/auth-store';
import { swalErro, swalSucesso } from 'src/utils/swal';

const AuthLogin = ({ title, subtitle }: loginType) => {
  const { login } = useAuthStore();
  const [authData, setAuthData] = useState<loginFormType>({
    email: '',
    password: '',
  });

  const handleSubmit = async () => {
    const response = await login(authData);
    if (response.status == 200) {
      swalSucesso('Login realizado com sucesso!');
    } else {
      swalErro('Credenciais inválidas');
    }
  };
  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      {/* {subtext} */}

      <AuthSocialButtons title="Sign in with" />
      <Box mt={3}>
        <Divider>
          <Typography
            component="span"
            color="textSecondary"
            variant="h6"
            fontWeight="400"
            position="relative"
            px={2}
          >
            or sign in with
          </Typography>
        </Divider>
      </Box>

      <Stack>
        <Box>
          <CustomFormLabel htmlFor="username">E-mail</CustomFormLabel>
          <CustomTextField
            value={authData.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAuthData((prev) => ({ ...prev, email: e.target.value }))
            }
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
            type="password"
            variant="outlined"
            fullWidth
          />
        </Box>
        <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
          <FormGroup>
            <FormControlLabel
              control={<CustomCheckbox defaultChecked />}
              label="Remeber this Device"
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
      {subtitle}
    </>
  );
};

export default AuthLogin;
