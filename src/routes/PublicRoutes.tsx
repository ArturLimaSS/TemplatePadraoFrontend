import { createBrowserRouter, Navigate } from 'react-router';
import BlankLayout from 'src/layouts/blank/BlankLayout';
import ForgotPassword from 'src/views/authentication/auth1/ForgotPassword';
import Login from 'src/views/authentication/auth1/Login';
import Register from 'src/views/authentication/auth1/Register';
import TwoSteps from 'src/views/authentication/auth1/TwoSteps';
import Login2 from 'src/views/authentication/auth2/Login2';
import TwoSteps2 from 'src/views/authentication/auth2/TwoSteps2';
import Error from 'src/views/authentication/Error';
import Maintenance from 'src/views/authentication/Maintenance';
import About from 'src/views/pages/frontend-pages/About';
import BlogPage from 'src/views/pages/frontend-pages/Blog';
import Contact from 'src/views/pages/frontend-pages/Contact';
import HomePage from 'src/views/pages/frontend-pages/Homepage';
import Landingpage from 'src/views/pages/landingpage/Landingpage';
import type { RouteType } from './Router';

const routes: RouteType[] = [
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '/', element: <Navigate to={'/auth/login'} /> },
      { path: '*', element: <Navigate to={'/auth/login'} /> },
      { path: '/auth/404', element: <Error /> },
      { path: '/auth/login', element: <Login /> },
      { path: '/auth/login2', element: <Login2 /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/forgot-password', element: <ForgotPassword /> },
      { path: '/auth/two-steps', element: <TwoSteps /> },
      { path: '/auth/two-steps2', element: <TwoSteps2 /> },
      { path: '/auth/maintenance', element: <Maintenance /> },
      { path: '/landingpage', element: <Landingpage /> },
      { path: '/frontend-pages/homepage', element: <HomePage /> },
      { path: '/frontend-pages/about', element: <About /> },
      { path: '/frontend-pages/contact', element: <Contact /> },
      { path: '/frontend-pages/blog', element: <BlogPage /> },
    ],
  },
];

const publicRoutes = routes;
export default publicRoutes;
