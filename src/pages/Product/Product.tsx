import { useParams } from 'react-router-dom';
import styles from './Product.module.css';

const Product = () => {
  const { id } = useParams();

  return <>Product - {id}</>;
};

export default Product;
