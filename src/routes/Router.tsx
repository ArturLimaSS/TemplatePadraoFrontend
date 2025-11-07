// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { type ReactNode } from 'react';
import { Navigate } from 'react-router';
import FullLayout from 'src/layouts/full/FullLayout';
import Followers from 'src/views/apps/user-profile/Followers';
import UserProfile from 'src/views/apps/user-profile/UserProfile';
import Painel from 'src/views/painel/painel';
import Usuarios from 'src/views/usuarios/usuarios';

export interface RouteType {
  path: string;
  element: ReactNode;
  exact?: boolean;
  user_type_id?: number[] | [];
  children?: RouteType[];
}
const router: RouteType[] = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', user_type_id: [1, 2, 3], element: <Painel /> },
      { path: '/meu-perfil', user_type_id: [1, 2, 3], element: <UserProfile /> },
      { path: '/usuarios', user_type_id: [1, 2], element: <Usuarios /> },
      { path: '*', user_type_id: [1, 2, 3], element: <Navigate to="/" /> },
    ],
  },
];

export default router;
