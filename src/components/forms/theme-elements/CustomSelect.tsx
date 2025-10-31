// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { memo } from 'react';
import { styled } from '@mui/material/styles';
import { Select } from '@mui/material';

const CustomSelect = styled(
  memo((props: any) => (
    <Select
      size="small"
      MenuProps={{
        disablePortal: true, // Renderiza dentro do Dialog
      }}
      {...props}
    />
  )),
)(({}) => ({}));

export default CustomSelect;
