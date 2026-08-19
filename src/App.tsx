import type { FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { About } from './pages/About';
import { Book } from './pages/Book';
import { Rating } from './pages/Rating';
import { NotFound } from './pages/NotFound';
import { Error } from './pages/Error';
import { Layout } from './components/Feature';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Book />,
      },
      {
        path: 'rating',
        element: <Rating />,
      },
      {
        path: 'book',
        element: <Book />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export const App: FC = () => {
  return <RouterProvider router={router} />;
};
