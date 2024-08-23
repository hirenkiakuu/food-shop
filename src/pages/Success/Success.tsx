import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import styles from '../Success/Success.module.css';

export const Success = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles['success']}>
        <img src="/pizza.png" alt="pizza-pic" />
        <div className={styles['text']}>Ваш заказан успешно оформлен!</div>
        <Button appearance="big" onClick={() => navigate('/')}>
          Сделать новый
        </Button>
      </div>
    </>
  );
};
