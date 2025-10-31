// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { Grid, Typography, Box, Breadcrumbs, Link, Stack } from '@mui/material';
import { NavLink } from 'react-router';

interface BreadCrumbType {
  items?: any[];
  title: string;
}

const Breadcrumb = ({ items, title }: BreadCrumbType) => (
  <Box
    component={Grid}
    container
    sx={{
      mt: -1,
      mb: '8px',
      borderRadius: 0,
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <Stack direction={'column'} mb={1}>
      <Breadcrumbs
        separator={<span>&gt;</span>}
        sx={{ alignItems: 'center' }}
        aria-label="breadcrumb"
      >
        {items
          ? items.map((item, index) => (
              <div key={item.title}>
                {item.to ? (
                  <Link underline="none" component={NavLink} to={item.to}>
                    <Typography
                      variant={'h6'}
                      sx={{
                        color: (theme) => theme.palette.text.disabled,
                        fontWeight: index == items.length - 1 ? '900' : '500',
                      }}
                    >
                      {item.title}
                    </Typography>
                  </Link>
                ) : (
                  <Typography
                    variant={'h6'}
                    sx={{
                      color: (theme) => theme.palette.text.disabled,
                      fontWeight: index == items.length - 1 ? '900' : '500',
                    }}
                  >
                    {item.title}
                  </Typography>
                )}
              </div>
            ))
          : ''}
      </Breadcrumbs>
      <Typography variant="h2" sx={{ fontWeight: '900' }}>
        {title}
      </Typography>
    </Stack>
  </Box>
);

export default Breadcrumb;
