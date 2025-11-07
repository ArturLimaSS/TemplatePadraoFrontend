import { Button, Dialog, DialogContent } from '@mui/material';
import { IconPlus } from '@tabler/icons-react';
import { useState } from 'react';

export const CadastrarUsuario = () => {
  const [open, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button variant={'contained'} onClick={onOpen} startIcon={<IconPlus />}>
        Cadastrar
      </Button>
      <Dialog open={open} onClose={onClose}>
        <DialogContent>Form de cadastro</DialogContent>
      </Dialog>
    </>
  );
};
