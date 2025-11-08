import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { useSnackbar } from 'notistack';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Portal,
  Typography,
} from '@mui/material';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';

const AlertContext = createContext({
  show: (message: string | null, status: string | null) => {},
  dialogConfirmacao: ({}: { title?: string; content?: string }) => Promise<void>,
  dialogConfirmacaoConteudo: () => {},
});

interface AlertProviderProps {
  children: ReactNode;
}

export const AlertProvider = ({ children }: AlertProviderProps) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [openDialogConfirmation, setOpenDialogConfirmation] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    content: '',
    title: '',
  });
  const [resolveCallback, setResolveCallback] = useState(false);
  const show = (message = '', type = 'info') => {
    enqueueSnackbar(
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 3,
          alignItems: 'center',
        }}
      >
        {type == 'loading' && <CircularProgress />}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
          }}
        >
          {type == 'loading' ? 'Processando...' : message}
        </Typography>
      </Box>,
      {
        variant: type === 'loading' ? '' : type, // 'info' como fallback para 'loading'
        autoHideDuration: 3000,
        onClose: () => closeSnackbar(),
      },
    );
  };

  const dialogConfirmacao = useCallback(({ title, content }) => {
    return new Promise((resolve) => {
      setDialogContent({ title, content });
      setOpenDialogConfirmation(true);
      setResolveCallback(() => resolve);
    });
  }, []);

  const handleClose = (response) => {
    setOpenDialogConfirmation(false);
    if (resolveCallback) resolveCallback(response);
  };

  const [openDialogConfirmacaoConteudo, setOpenDialogConfirmacaoConteudo] = useState(false);
  const dialogConfirmacaoConteudo = useCallback(({ title, content, label }) => {
    return new Promise((resolve) => {
      setDialogContent({
        title,
        content,
        label,
      });
      setOpenDialogConfirmacaoConteudo(true);
      setResolveCallback(() => resolve);
    });
  });

  const [content, setContent] = useState('');

  const onCloseDialogConfirmacaoConteudo = (response: boolean) => {
    setOpenDialogConfirmacaoConteudo(false);
    if (resolveCallback) {
      resolveCallback({
        confirm: response,
        content: content,
      });
    }
    setContent('');
  };

  return (
    <AlertContext.Provider value={{ show, dialogConfirmacao, dialogConfirmacaoConteudo }}>
      {children}
      <Portal>
        <Dialog
          sx={{ zIndex: '99999999999999999999999999999999' }}
          open={openDialogConfirmation}
          onClose={() => handleClose(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{dialogContent.title}</DialogTitle>
          <DialogContent dividers>
            <DialogContentText id="alert-dialog-description">
              {dialogContent.content}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="error" onClick={() => handleClose(false)}>
              Não confirmar
            </Button>
            <Button variant="contained" color="primary" onClick={() => handleClose(true)} autoFocus>
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          sx={{ zIndex: '99999999999999999999999999999999' }}
          open={openDialogConfirmacaoConteudo}
          onClose={() => onCloseDialogConfirmacaoConteudo(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{dialogContent.title}</DialogTitle>
          <DialogContent dividers>
            <DialogContentText id="alert-dialog-description">
              {dialogContent.content}
              <CustomFormLabel required id="label">
                {dialogContent.label}
              </CustomFormLabel>
              <CustomTextField
                value={content}
                onChange={(e) => setContent(e.target.value)}
                labelId="label"
                required
                fullWidth
                multiline
                rows={5}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="error"
              onClick={() => onCloseDialogConfirmacaoConteudo(false)}
            >
              Não confirmar
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => onCloseDialogConfirmacaoConteudo(true)}
              autoFocus
            >
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
      </Portal>
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};
