import { useMemo, type FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from '@components/Feature';
import {
  Home,
  Page1,
  Page3,
  Page4,
  Page5,
  Page6,
  Page7,
  Page8,
  Page9,
  Page10,
  Product,
  ScrollDemo,
} from './pages';

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
        { path: 'page1', element: <Page1 /> },
        { path: 'page3', element: <Page3 /> },
        { path: 'page4', element: <Page4 /> },
        { path: 'page5', element: <Page5 /> },
        { path: 'page6', element: <Page6 /> },
        { path: 'page7', element: <Page7 /> },
        { path: 'page8', element: <Page8 /> },
        { path: 'page9', element: <Page9 /> },
        { path: 'page10', element: <Page10 /> },
        {
          path: 'product/:id',
          element: <Product />,
        },
        {
          path: 'scroll-demo',
          element: <ScrollDemo />,
        },
      ],
    },
  ]);

export const App: FC = () => {
  const router = useMemo(() => createAppRouter(), []);

  return <RouterProvider router={router} />;
};
