import { ProductCardProps } from './ProductCard.props';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart.slice';
import { MouseEvent } from 'react';
import { AppDispatch } from '../../store/store';
import styles from './ProductCard.module.css';

const ProductCard = (props: ProductCardProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const add = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(cartActions.add(props.id));
  };

  return (
    <>
      <Link to={`/product/${props.id}`} className={styles['link']}>
        <div className={styles['product-item']}>
          <div
            className={styles['head']}
            style={{
              backgroundImage: `url(${props.image})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
          >
            <div className={styles['product-price']}>
              {props.price}&nbsp;<span>₽</span>
            </div>
            <button className={styles['buy-button']} onClick={add}>
              <img src="/cart-button-icon.svg" alt="Добавить в корзину" />
            </button>
            <div className={styles['product-rating']}>
              {props.rating}&nbsp;
              <img src="/star.svg" alt="" />
            </div>
          </div>

          <div className={styles['footer']}>
            <h1 className={styles['product-title']}>{props.name}</h1>
            <p className={styles['product-description']}>{props.description}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
