import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import Dashboard from './pages/Dashboard.tsx';
import AuthentificationProvider from './lib/authentification/AuthentificationProvider.tsx';
import { OpenAPI } from './api/client/index.ts';
import { QueryClient, QueryClientProvider } from 'react-query';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/app",
    element: <Dashboard/>
  }
]);

const base = 'http://localhost:3001';

OpenAPI.WITH_CREDENTIALS = true;
OpenAPI.BASE = base;

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider>
      <AuthentificationProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />  
        </QueryClientProvider>
      </AuthentificationProvider>
    </MantineProvider>
  </React.StrictMode>,
)
