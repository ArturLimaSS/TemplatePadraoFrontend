// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { type ReactNode } from 'react';
import { Navigate } from 'react-router';
import BlankLayout from 'src/layouts/blank/BlankLayout';
import FullLayout from 'src/layouts/full/FullLayout';
import SelecionaInquilinoPage from 'src/views/inquilino/seleciona-inquilino-page';

export interface RouteType {
  path: string;
  element: ReactNode;
  exact?: boolean;
  user_type_id?: string[] | [];
  children?: RouteType[];
}

const intermediateRoutes: RouteType[] = [
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      {
        path: '/',
        element: <SelecionaInquilinoPage />,
      },

      {
        path: '*',
        element: <Navigate to="/" />,
      },
    ],
  },
];

export default intermediateRoutes;
