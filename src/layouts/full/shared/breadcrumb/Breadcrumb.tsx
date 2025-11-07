// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { type ReactNode } from 'react';
import { Grid, Typography, Box, Breadcrumbs, Link, Stack, Button } from '@mui/material';
import { NavLink } from 'react-router';

interface BreadCrumbType {
  items?: any[];
  title: string;
  action?: ReactNode;
}

const Breadcrumb = ({ items, title, action }: BreadCrumbType) => (
  <Box
    component={Grid}
    container
    sx={{
      borderRadius: 0,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'space-between',
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
                      color: (theme) =>
                        index == items.length - 1
                          ? theme.palette.text.secondary
                          : theme.palette.text.disabled,
                      fontWeight: '900',
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
    {action && <Box sx={{ display: 'flex', alignItems: 'end' }}>{action}</Box>}
  </Box>
);

export default Breadcrumb;
