import { createContext, useContext, useState, type ReactNode } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

interface LoadingProviderProps {
  children: ReactNode;
}

interface LoadingContextType {
  // A tipagem correta para booleanos primitivos é 'boolean' (minúsculo)
  setLoading: (loadingState: boolean) => void;
}

const initialLoadingContext: LoadingContextType = {
  // Inicialização com o tipo primitivo 'boolean'
  setLoading: (loadingState: boolean) => {},
};
const LoadingContext = createContext<LoadingContextType>(initialLoadingContext);

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [openLoading, setOpenLoading] = useState(false);

  // O parâmetro da função deve ser o tipo primitivo 'boolean'
  const setLoading = (loadingState: boolean) => {
    setOpenLoading(loadingState);
  };

  return (
    <LoadingContext.Provider value={{ setLoading }}>
      <Backdrop
        open={openLoading}
        sx={{
          color: '#fff',
          // O zIndex garante que o loading fique acima de modais
          zIndex: (theme) => theme.zIndex.modal + 1,
        }}
      >
        <CircularProgress color={'inherit'} />
      </Backdrop>

      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    // Verificação de erro padrão para garantir que o Hook está dentro do Provider
    throw new Error('useLoading precisa estar dentro de um LoadingProvider');
  }
  return context;
};
