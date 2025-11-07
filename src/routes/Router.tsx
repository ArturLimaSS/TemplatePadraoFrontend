// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { lazy, type ReactNode } from 'react';
import { Navigate } from 'react-router';
import FullLayout from 'src/layouts/full/FullLayout';
import UserProfile from 'src/views/apps/user-profile/UserProfile';
import Painel from 'src/views/painel/painel';

export interface RouteType {
  path: string;
  element: ReactNode;
  exact?: boolean;
  children?: RouteType[];
}
const router: RouteType[] = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Painel /> },
      { path: '/meu-perfil', element: <UserProfile /> },
      { path: '*', element: <Navigate to="/" /> },
    ],
  },
];

export default router;
