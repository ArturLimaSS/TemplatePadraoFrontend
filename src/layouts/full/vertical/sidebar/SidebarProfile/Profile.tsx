import { Box, Avatar, Typography, IconButton, Tooltip, useMediaQuery } from '@mui/material';

import img1 from 'src/assets/images/profile/user-1.jpg';
import { IconPower } from '@tabler/icons-react';

import { Link } from 'react-router';
import { CustomizerContext } from 'src/context/CustomizerContext';
import { useContext } from 'react';
import { useAuthStore } from 'src/store/Auth/auth-store';

export const Profile = () => {
  const { isSidebarHover, isCollapse } = useContext(CustomizerContext);

  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));
  const hideMenu = lgUp ? isCollapse == 'mini-sidebar' && !isSidebarHover : '';

  const { usuario_logado } = useAuthStore();

  return (
    <Box
      display={'flex'}
      alignItems="center"
      gap={2}
      sx={{ m: 1, p: 2, bgcolor: `${'secondary.light'}` }}
    >
      {!hideMenu ? (
        <>
          <Avatar alt={usuario_logado?.name} src={usuario_logado?.name} />

          <Box>
            <Typography variant="h6">{usuario_logado?.name}</Typography>
            {/* <Typography variant="caption"></Typography> */}
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <Tooltip title="Logout" placement="top">
              <IconButton
                color="primary"
                component={Link}
                to="auth/login"
                aria-label="logout"
                size="small"
              >
                <IconPower size="20" />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      ) : (
        ''
      )}
    </Box>
  );
};
