import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter, defer } from 'react-router-dom';
import './index.css';
import { Layout } from './layout/Menu/Layout';
// import { Menu } from './pages/Menu/Menu';
import { Cart } from './pages/Cart/Cart.tsx';
import { Error } from './pages/Error/Erorr.tsx';
import Product from './pages/Product/ProductPage.tsx';
import { PREFIX } from './helpers/API.ts';
import axios from 'axios';
import AuthLayout from './layout/Auth/AuthLayout.tsx';
import Login from './pages/Login/Login.tsx';
import Register from './pages/Register/Register.tsx';
import { RequireAuth } from './helpers/RequireAuth.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { Success } from './pages/Success/Success.tsx';

const Menu = lazy(() => import('./pages/Menu/Menu')); // сэкономит пару килобайт, обычно оборачиваются верхние компоненты

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<div>Загрузка...</div>}>
            <Menu />
          </Suspense>
        ),
      },
      {
        path: '/success',
        element: <Success />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/product/:id',
        element: <Product />,
        errorElement: <div>Ошибка</div>,
        loader: async ({ params }) => {
          return defer({
            data: new Promise((resolve, reject) => {
              setTimeout(() => {
                axios
                  .get(`${PREFIX}/products/${params.id}`)
                  .then((response) => resolve(response.data))
                  .catch((error) => reject(error));
              }, 2000);
            }),
          });
        },
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
  {
    path: '*',
    element: <Error />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
