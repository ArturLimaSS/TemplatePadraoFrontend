import {
  CardContent,
  Box,
  Stack,
  Avatar,
  Grid,
  Button,
  Typography,
  Chip,
  TextField,
  InputAdornment,
} from '@mui/material';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useContext, useEffect } from 'react';
import BlankCard from 'src/components/shared/BlankCard';
import { UserDataContext } from 'src/context/UserDataContext';
import { IconMapPin, IconSearch } from '@tabler/icons-react';
import { useUsuarioStore } from 'src/store/Usuario/usuario-store';

const ListaUsuarios = () => {
  const { followers, toggleFollow }: any = useContext(UserDataContext);
  const { lista_usuario, listarUsuario } = useUsuarioStore();

  useEffect(() => {
    listarUsuario();
  }, []);
  return (
    <>
      <Grid container spacing={3} mt={2}>
        {lista_usuario.map((profile: any) => {
          return (
            <Grid
              key={profile.id}
              size={{
                xs: 12,
                lg: 4,
              }}
            >
              <BlankCard>
                <CardContent>
                  <Stack direction={'row'} gap={2} alignItems="center">
                    <Avatar alt="Remy Sharp" src={profile.avatar} />
                    <Box>
                      <Typography variant="h6" textOverflow={'ellipsis'} noWrap>
                        {profile.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                      >
                        Administrador
                      </Typography>
                    </Box>
                    <Box ml="auto">
                      <Button variant="text" color="primary" size="small">
                        Editar
                      </Button>
                    </Box>
                  </Stack>
                </CardContent>
              </BlankCard>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default ListaUsuarios;
