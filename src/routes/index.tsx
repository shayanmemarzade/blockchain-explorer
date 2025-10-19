import { createBrowserRouter } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import BtcBlockDetail from '../pages/BtcBlockDetail';
import NotFound from '../pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'explorer/blocks/btc/:id', element: <BtcBlockDetail /> },
    ],
  },
  { path: '*', element: <NotFound /> },
]);
