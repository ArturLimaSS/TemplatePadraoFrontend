// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { type ReactNode } from 'react';
import { Navigate } from 'react-router';
import FullLayout from 'src/layouts/full/FullLayout';
import UserProfile from 'src/views/apps/user-profile/UserProfile';
import Painel from 'src/views/painel/painel';
import PerfilUsuario from 'src/views/perfil/perfil-usuario';
import EditarUsuarioPage from 'src/views/usuarios/editar-usuario-page';
import Usuarios from 'src/views/usuarios/usuarios';

export interface RouteType {
  path: string;
  element: ReactNode;
  exact?: boolean;
  user_type_id?: string[] | [];
  children?: RouteType[];
}

const tenant_user_session_id = localStorage.getItem('tenant_user_session_id');

const router: RouteType[] = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      {
        path: '/',
        user_type_id: [
          'a61b6f23-cdc0-4b79-b372-3b02f6ac0c93',
          'be506f43-742c-4b04-b288-6bd2e6ffd07e',
          'fbf94274-9a4b-4372-90a3-b5ff10612a90',
        ],
        element: <Painel />,
      },
      {
        path: '/meu-perfil',
        user_type_id: [
          'a61b6f23-cdc0-4b79-b372-3b02f6ac0c93',
          'be506f43-742c-4b04-b288-6bd2e6ffd07e',
          'fbf94274-9a4b-4372-90a3-b5ff10612a90',
        ],
        element: <PerfilUsuario />,
      },
      {
        path: '/usuarios',
        user_type_id: [
          'fbf94274-9a4b-4372-90a3-b5ff10612a90',
          'be506f43-742c-4b04-b288-6bd2e6ffd07e',
        ],
        element: <Usuarios />,
      },
      {
        path: '/usuarios/editar',
        user_type_id: [
          'a61b6f23-cdc0-4b79-b372-3b02f6ac0c93',
          'be506f43-742c-4b04-b288-6bd2e6ffd07e',
        ],
        element: <EditarUsuarioPage />,
      },
      {
        path: '*',
        user_type_id: [
          'a61b6f23-cdc0-4b79-b372-3b02f6ac0c93',
          'be506f43-742c-4b04-b288-6bd2e6ffd07e',
          'fbf94274-9a4b-4372-90a3-b5ff10612a90',
        ],
        element: <Navigate to="/" />,
      },
    ],
  },
];

export default router;
