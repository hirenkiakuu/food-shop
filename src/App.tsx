import {
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from 'react-router-dom';
import Button from './components/Button/Button';
import Input from './components/Input/Input';
import { useState } from 'react';
import { MouseEvent } from 'react';
import { Menu } from './pages/Menu/Menu';
import { Cart } from './pages/Cart/Cart';
import { Error } from './pages/Error/Erorr';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Menu />,
  },
  {
    path: '/cart',
    element: <Cart />,
  },
  {
    path: '*',
    element: <Error />,
  },
]);

function App() {
  const [counter, setCounter] = useState<number>(0);

  const addCounter = (e: MouseEvent) => {
    console.log(e);
  };

  return (
    <>
      <Button onClick={addCounter}>Применить</Button>
      <Button appearance="big" onClick={addCounter}>
        Кнопка
      </Button>
      <Input placeholder="Email" type="text" />

      <div>
        <a href="/">Меню</a>
        <a href="/cart">Корзина</a>
      </div>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
