import { CartItemProps } from './CartItem.props';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart.slice';
import { MouseEvent } from 'react';
import { AppDispatch } from '../../store/store';
import styles from './CartItem.module.css';

const CartItem = (props: CartItemProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const increase = (e: MouseEvent) => {
    dispatch(cartActions.add(props.id));
  };

  const decrease = (e: MouseEvent) => {
    dispatch(cartActions.remove(props.id))
  };

  const remove = (e: MouseEvent) => {
    dispatch(cartActions.delete(props.id))
  };

  return (
    <>
      <div className={styles['item']}>
        <div
          className={styles['image']}
          style={{
            backgroundImage: `url(${props.image})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        ></div>
        <div className={styles['description']}>
          <div className={styles['name']}>{props.name}</div>
          <div>
            <span className={styles['price']}>{props.price}&nbsp;₽</span>
          </div>
        </div>

        <div className={styles['actions']}>
          <button className={styles['minus']} onClick={decrease}>
            <img src="/minus.svg" alt="Удалить из корзины" />
          </button>
          <div className={styles['number']}>{props.count}</div>
          <button className={styles['plus']} onClick={increase}>
            <img src="/plus.svg" alt="Добавить в корзину" />
          </button>
          <button className={styles['remove']} onClick={remove}>
            <img src="/cross.svg" alt="Удалить все" />
          </button>
        </div>
      </div>
    </>
  );
};

export default CartItem;
