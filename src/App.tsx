import { useMemo, type FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from '@components/Feature';
import { Home } from './pages';

const createAppRouter = () =>
  createBrowserRouter([
    {
      id: 'root',
      path: '/',
      element: <Layout />,
      errorElement: <div>Error</div>,
      HydrateFallback: () => null,
      shouldRevalidate: () => false,
      children: [
        {
          index: true,
          element: <Home />,
        },
      ],
    },
  ]);

export const App: FC = () => {
  const router = useMemo(() => createAppRouter(), []);

  return <RouterProvider router={router} />;
};
