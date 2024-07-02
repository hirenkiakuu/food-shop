import { ProductCardProps } from './ProductCard.props';
import styles from './ProductCard.module.css';
import { Link } from 'react-router-dom';

const ProductCard = (props: ProductCardProps) => {
  return (
    <>
      <Link to={`/product/${props.id}`} className={styles['link']}>
        <div className={styles['product-item']}>
          <div
            className={styles['head']}
            style={{ backgroundImage: `url(${props.image})` }}
          >
            <div className={styles['product-price']}>
              {props.price}&nbsp;<span>₽</span>
            </div>
            <button className={styles['buy-button']}>
              <img src="/cart-button-icon.svg" alt="Добавить в корзину" />
            </button>
            <div className={styles['product-rating']}>
              {props.rating}&nbsp;
              <img src="/star.svg" alt="" />
            </div>
          </div>

          <div className={styles['footer']}>
            <h1 className={styles['product-title']}>{props.title}</h1>
            <p className={styles['product-description']}>{props.description}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
