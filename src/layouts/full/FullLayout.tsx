'use client';
import { FC, useContext } from 'react';
import { styled, Container, Box, useTheme } from '@mui/material';
import { Outlet } from 'react-router';
import Header from './vertical/header/Header';
import Sidebar from './vertical/sidebar/Sidebar';
import Customizer from './shared/customizer/Customizer';
import Navigation from '../full/horizontal/navbar/Navigation';
import HorizontalHeader from '../full/horizontal/header/Header';
import ScrollToTop from '../../components/shared/ScrollToTop';
import LoadingBar from '../../LoadingBar';
import { CustomizerContext } from 'src/context/CustomizerContext';
import config from 'src/context/config';

const MainWrapper = styled('div')(() => ({
  display: 'flex',
  minHeight: '100vh',
  width: '100%',
}));

const PageWrapper = styled('div')(() => ({
  display: 'flex',
  flexGrow: 1,
  paddingBottom: '60px',
  flexDirection: 'column',
  zIndex: 1,
  width: '100%',
  backgroundColor: 'transparent',
}));

const FullLayout: FC = () => {
  const { activeLayout, isLayout, activeMode, isCollapse } = useContext(CustomizerContext);
  const theme = useTheme();
  const MiniSidebarWidth = config.miniSidebarWidth;
  const SidebarWidth = config.sidebarWidth;

  return (
    <>
      <LoadingBar />
      <MainWrapper className={activeMode === 'dark' ? 'darkbg mainwrapper' : 'mainwrapper'}>
        {/* ------------------------------------------- */}
        {/* Sidebar */}
        {/* ------------------------------------------- */}
        {activeLayout === 'horizontal' ? '' : <Sidebar />}
        {/* ------------------------------------------- */}
        {/* Main Wrapper */}
        {/* ------------------------------------------- */}
        <PageWrapper className="page-wrapper" sx={{}}>
          {/* ------------------------------------------- */}
          {/* Header */}
          {/* ------------------------------------------- */}
          <HorizontalHeader />

          <Container
            sx={{
              pt: '30px',
              maxWidth: '100%!important',
              ...(isCollapse === 'mini-sidebar' && {
                [theme.breakpoints.up('lg')]: { pl: `${MiniSidebarWidth + 20}px` },
              }),
              ...(!(isCollapse === 'mini-sidebar') && {
                [theme.breakpoints.up('lg')]: { pl: `${SidebarWidth + 20}px` },
              }),
            }}
            // sidebarWidth
          >
            {/* ------------------------------------------- */}
            {/* PageContent */}
            {/* ------------------------------------------- */}

            <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>
              <ScrollToTop>
                <Outlet />
              </ScrollToTop>
            </Box>

            {/* ------------------------------------------- */}
            {/* End Page */}
            {/* ------------------------------------------- */}
          </Container>
          {/* <Customizer /> */}
        </PageWrapper>
      </MainWrapper>
    </>
  );
};

export default FullLayout;
