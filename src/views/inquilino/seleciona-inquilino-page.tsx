import { Container, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import { useEffect } from 'react';
import PageContainer from 'src/components/container/PageContainer';
import { useAuthStore } from 'src/store/Auth/auth-store';
import type { InquilinoType } from 'src/types/inquilino/inquilino-types';
import { swalErro } from 'src/utils/swal';

const SelecionaInquilinoPage = () => {
  const { lista_inquilinos_usuario, listarInquilinosUsuario, selecionarInquilino, initializeAuth } =
    useAuthStore();

  useEffect(() => {
    listarInquilinosUsuario();
  }, []);

  const onselecionarInquilino = async (inquilino: InquilinoType) => {
    const inquilino_id = inquilino.id ? inquilino.id : null;
    if (!inquilino_id) {
      swalErro('Voce precisa selecionar uma conta primeiro');
    }
    const response = await selecionarInquilino(inquilino_id);
    if (response.status == 200) {
      setTimeout(() => initializeAuth(), 2000);
    }
  };
  return (
    <>
      <PageContainer title="OrCloud" description="Pagina para selecao de conta">
        <Container
          maxWidth="sm"
          sx={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff', // tela totalmente branca
          }}
        >
          <Typography variant="h6" gutterBottom>
            Selecione a conta
          </Typography>

          <List
            sx={{
              width: '100%',
              bgcolor: 'transparent', // sem background
              boxShadow: 'none', // sem sombra
            }}
          >
            {lista_inquilinos_usuario.map((item) => (
              <ListItemButton
                key={item.id}
                sx={{
                  border: '1px solid #ccc',
                  borderRadius: 1,
                  mb: 1,
                  px: 2,
                  py: 1,
                }}
                onClick={() => onselecionarInquilino(item.inquilino)}
              >
                <ListItemText primary={item.inquilino.nome} />
              </ListItemButton>
            ))}
          </List>
        </Container>
      </PageContainer>
    </>
  );
};

export default SelecionaInquilinoPage;
