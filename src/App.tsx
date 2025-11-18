import { CssBaseline, ThemeProvider } from '@mui/material';
import { ThemeSettings } from './theme/Theme';
import RTL from './layouts/full/shared/customizer/RTL';
import { RouterProvider, createBrowserRouter } from 'react-router';
import router from './routes/Router';
import publicRoutes from './routes/PublicRoutes';
import { CustomizerContext } from 'src/context/CustomizerContext';
import { useContext, useEffect, useState } from 'react';
import { useAuthStore } from './store/Auth/auth-store';
import { AlertProvider } from './context/Alert/useAlert';
import intermediateRoutes from './routes/IntermediateRouter';

const privateRouter = createBrowserRouter(router);
const publicRouter = createBrowserRouter(publicRoutes);
const intermediateRouter = createBrowserRouter(intermediateRoutes);

function App() {
  const theme = ThemeSettings();
  const { activeDir } = useContext(CustomizerContext);
  const { isAuthenticated, initializeAuth } = useAuthStore();
  const tenant_user_session_id = localStorage.getItem('tenant_user_session_id');

  const [currentRouter, setCurrentRouter] = useState(
    isAuthenticated ? (tenant_user_session_id ? privateRouter : intermediateRouter) : publicRouter,
  );

  useEffect(() => {
    setCurrentRouter(
      isAuthenticated
        ? tenant_user_session_id
          ? privateRouter
          : intermediateRouter
        : publicRouter,
    );
  }, [isAuthenticated, tenant_user_session_id]);

  const handleInit = async () => {
    if (tenant_user_session_id != null || tenant_user_session_id != undefined) {
      await initializeAuth();
    }
    // if (isAuthenticated) {
    //   setCurrentRouter(privateRouter);
    // } else {
    //   setCurrentRouter(publicRouter);
    // }
  };
  useEffect(() => {
    handleInit();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AlertProvider>
        <RTL direction={activeDir}>
          <CssBaseline />
          <RouterProvider router={currentRouter} />
        </RTL>
      </AlertProvider>
    </ThemeProvider>
  );
}

export default App;
