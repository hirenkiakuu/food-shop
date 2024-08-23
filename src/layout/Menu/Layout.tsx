import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import styles from './Layout.module.css';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { getProfile, userActions } from '../../store/user.slice';
import { useEffect } from 'react';

export function Layout() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((s: RootState) => s.user.profile);
  const items = useSelector((s: RootState) => s.cart.items);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const logout = () => {
    dispatch(userActions.logout());
    navigate('/auth/login');
  };

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
            <h1>{profile?.name}</h1>
            <p>{profile?.email}</p>
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
                Корзина{' '}
                <span className={styles['cart-count']}>
                  {items.reduce((acc, item) => (acc += item.count), 0)}
                </span>
              </NavLink>
            </div>
          </div>
          <Button className={styles['with-icon']} onClick={logout}>
            <img className={styles['exit-icon']} src="/exit.png" alt="" />
            Выйти
          </Button>
        </div>
        <div className={styles['content']}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
