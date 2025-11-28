// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as React from 'react';
import {
  IconButton,
  Box,
  AppBar,
  useMediaQuery,
  Toolbar,
  styled,
  Stack,
  Theme,
} from '@mui/material';

import { IconMenu2, IconMoon, IconSun } from '@tabler/icons-react';
import Notifications from 'src/layouts/full/vertical/header/Notification';
import Logo from 'src/layouts/full/shared/logo/Logo';
import config from 'src/context/config';
import { CustomizerContext } from 'src/context/CustomizerContext';
import { DropDownPefil } from 'src/components/auth/dropdown-perfil';

const Header = () => {
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

  // drawer
  const {
    isLayout,
    setIsMobileSidebar,
    isCollapse,
    setIsCollapse,
    isMobileSidebar,
    activeMode,
    setActiveMode,
  } = React.useContext(CustomizerContext);
  const TopbarHeight = config.topbarHeight;

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    borderLeft: 0,
    borderRight: 0,
    [theme.breakpoints.up('lg')]: {
      minHeight: TopbarHeight,
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    margin: '0 auto',
    width: '100%',
    color: `${theme.palette.text.secondary} !important`,
  }));

  return (
    <>
      <AppBarStyled position="sticky" color="default" variant="outlined">
        <ToolbarStyled
          sx={{
            maxWidth: isLayout === 'boxed' ? 'lg' : '100%!important',
          }}
        >
          <Box sx={{ width: '180px', overflow: 'hidden' }}>
            <Logo />
          </Box>
          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={() => {
              // Toggle sidebar on both mobile and desktop based on screen size
              if (lgUp) {
                // For large screens, toggle between full-sidebar and mini-sidebar
                isCollapse === 'full-sidebar'
                  ? setIsCollapse('mini-sidebar')
                  : setIsCollapse('full-sidebar');
              } else {
                // For smaller screens, toggle mobile sidebar
                setIsMobileSidebar(!isMobileSidebar);
              }
            }}
          >
            <IconMenu2 size="20" />
          </IconButton>
          {/* ------------------------------------------- */}
          {/* Toggle Button Sidebar */}
          {/* ------------------------------------------- */}

          {/* {lgUp ? (
            <>
              <Navigation />
            </>
          ) : null} */}
          <Box flexGrow={1} />
          <Stack spacing={1} direction="row" alignItems="center">
            <IconButton size="large" color="inherit">
              {activeMode === 'light' ? (
                <IconMoon size="21" stroke="1.5" onClick={() => setActiveMode('dark')} />
              ) : (
                <IconSun size="21" stroke="1.5" onClick={() => setActiveMode('light')} />
              )}
            </IconButton>
            <Notifications />
            <DropDownPefil />
          </Stack>
        </ToolbarStyled>
      </AppBarStyled>
    </>
  );
};

export default Header;
