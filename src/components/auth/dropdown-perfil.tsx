// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Box, Menu, Avatar, Typography, Divider, Button, IconButton, Stack } from '@mui/material';

import { IconSettings } from '@tabler/icons-react';

import { useAuthStore } from 'src/store/Auth/auth-store';
import { useAlert } from 'src/context/Alert/useAlert';

export const DropDownPefil = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };

  const { usuario_logado } = useAuthStore();

  const navigate = useNavigate();
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const { logout } = useAuthStore();

  const { dialogConfirmacao } = useAlert();
  const handleLogout = async () => {
    const confirmacao = await dialogConfirmacao({
      title: 'Sair do sistema',
      content: 'Deseja realmente sair do sistema?',
    });

    if (!confirmacao) {
      return;
    }

    await logout();
    navigate('/auth/login');
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === 'object' && {
            color: 'primary.main',
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={usuario_logado?.name}
          alt={usuario_logado?.name}
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        elevation={2}
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '360px',
            px: 2,
            py: 1,
          },
        }}
      >
        <Stack direction="row" py={3} spacing={2} alignItems="center">
          <Avatar
            src={usuario_logado?.name}
            alt={usuario_logado?.name}
            sx={{
              width: 35,
              height: 35,
            }}
          />
          <Box>
            <Typography variant="subtitle2" color="textPrimary" fontWeight={600}>
              {usuario_logado?.name}
            </Typography>

            <Typography
              variant="subtitle2"
              color="textSecondary"
              display="flex"
              alignItems="center"
              gap={1}
            >
              {usuario_logado?.email}
            </Typography>
          </Box>
        </Stack>
        <Divider />
        <Box>
          <Box sx={{ py: 2, px: 0 }} className="hover-text-primary">
            <Link to={'/meu-perfil'}>
              <Stack direction="row" spacing={2}>
                <Box
                  width="45px"
                  height="45px"
                  bgcolor="primary.light"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <IconSettings />
                </Box>
                <Box>
                  <Typography
                    variant="subtitle2"
                    fontWeight={600}
                    color="textPrimary"
                    className="text-hover"
                    noWrap
                    sx={{
                      width: '240px',
                    }}
                  >
                    Meu Perfil
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="subtitle2"
                    sx={{
                      width: '240px',
                    }}
                    noWrap
                  >
                    Configurações de acesso
                  </Typography>
                </Box>
              </Stack>
            </Link>
          </Box>
        </Box>
        <Box mt={2}>
          {/* <Box bgcolor="primary.light" p={3} mb={3} overflow="hidden" position="relative">
            <Box display="flex" justifyContent="space-between">
              <Box>
                <Typography variant="h5" mb={2}>
                  Unlimited <br />
                  Access
                </Typography>
                <Button variant="contained" color="primary">
                  Upgrade
                </Button>
              </Box>
              <img src={unlimitedImg} alt="unlimited" className="signup-bg"></img>
            </Box>
          </Box> */}
          <Button onClick={handleLogout} variant="outlined" color="primary" fullWidth>
            Sair
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};
