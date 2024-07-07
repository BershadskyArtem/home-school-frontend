import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import '@mantine/notifications/styles.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import DashboardPage from './pages/DashboardPage.tsx';
import AuthentificationProvider from './components/ui/Authentification/AuthentificationProvider.tsx';
import { OpenAPI } from './api/client/index.ts';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Notifications } from '@mantine/notifications';
import SignInPage from './pages/SignInPage.tsx';
import AuthentificatedPage from './components/ui/Authentification/AuthentificatedPage.tsx';
import MagicPage from './pages/MagicPage.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/app",
    element: 
    <AuthentificatedPage>
        <DashboardPage/>
    </AuthentificatedPage>
  },
  {
    path: "/signin",
    element: <SignInPage/>
  },
  {
    path: "app/magic",
    element: <MagicPage/>
  }
]);

OpenAPI.WITH_CREDENTIALS = true;
OpenAPI.BASE = import.meta.env.VITE_API_BASE_URL;

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider>
      <Notifications/>
      <AuthentificationProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />  
        </QueryClientProvider>
      </AuthentificationProvider>
    </MantineProvider>
  </React.StrictMode>
)
