import { CssBaseline, ThemeProvider } from '@mui/material';
import { ThemeSettings } from './theme/Theme';
import RTL from './layouts/full/shared/customizer/RTL';
import { RouterProvider, createBrowserRouter } from 'react-router';
import router from './routes/Router';
import publicRoutes from './routes/PublicRoutes';
import { CustomizerContext } from 'src/context/CustomizerContext';
import { useContext, useEffect, useState } from 'react';
import { useAuthStore } from './store/Auth/auth-store';

const privateRouter = createBrowserRouter(router);
const publicRouter = createBrowserRouter(publicRoutes);

function App() {
  const theme = ThemeSettings();
  const { activeDir } = useContext(CustomizerContext);
  const { isAuthenticated, initializeAuth } = useAuthStore();

  const [currentRouter, setCurrentRouter] = useState(
    isAuthenticated ? privateRouter : publicRouter,
  );

  useEffect(() => {
    setCurrentRouter(isAuthenticated ? privateRouter : publicRouter);
  }, [isAuthenticated]);

  const handleInit = async () => {
    await initializeAuth();
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
      <RTL direction={activeDir}>
        <CssBaseline />
        <RouterProvider router={currentRouter} />
      </RTL>
    </ThemeProvider>
  );
}

export default App;
