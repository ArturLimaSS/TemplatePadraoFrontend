// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { memo } from 'react';
import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

const CustomTextField = styled(
  memo((props: any) => <TextField onKeyDown={(e) => e.stopPropagation()} {...props} />),
)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius, // opcional
  },
  '& .MuiOutlinedInput-input::-webkit-input-placeholder': {
    color: theme.palette.text.secondary,
    opacity: '0.8',
  },
  '& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder': {
    color: theme.palette.text.secondary,
    borderColor: theme.palette.grey[300],
    opacity: '1',
  },
  '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.grey[300],
    color: theme.palette.text.primary,
    opacity: '1',
  },
}));

export default CustomTextField;
