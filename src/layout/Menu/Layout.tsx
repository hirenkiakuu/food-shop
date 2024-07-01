import { NavLink, Outlet } from 'react-router-dom';
import Button from '../../components/Button/Button';
import styles from './Layout.module.css';
import cn from 'classnames';

export function Layout() {
  return (
    <>
      <div className={styles['layout']}>
        <div className={styles['sidebar']}>
          <div className={styles['profile-info']}>
            <img
              className={styles['user-avatar']}
              src="/avatar.png"
              alt="аватарка"
            />
            <h1>Иван Иванов</h1>
            <p>alaricode@ya.ru</p>
          </div>
          <div className={styles['sidebar__navigation']}>
            <div className={styles['navigation-links']}>
              <NavLink
                className={({ isActive }) =>
                  cn(styles['nav-link'], {
                    [styles.active]: isActive,
                  })
                }
                to="/"
              >
                <img src="/document.png" alt="иконка меню" />
                Меню
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  cn(styles['nav-link'], {
                    [styles.active]: isActive,
                  })
                }
                to="/cart"
              >
                <img src="/cart.png" alt="иконка корзины" />
                Корзина
              </NavLink>
            </div>
          </div>
          <Button className={styles['with-icon']}>
            <img className={styles['exit-icon']} src="/exit.png" alt="" />
            Выйти
          </Button>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
}
