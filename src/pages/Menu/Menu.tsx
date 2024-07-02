import Headling from '../../components/Headling/Headling';
import SearchBar from '../../components/SearchBar/SearchBar';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './Menu.module.css';

export function Menu() {
  return (
    <>
      <div className={styles['head']}>
        <Headling>Меню</Headling>
        <SearchBar placeholder="Введите блюдо или состав" />
      </div>
      <div>
        <ProductCard
          id={1}
          title={'Наслаждение'}
          description={'Салями, руккола, помидоры, оливки'}
          price={300}
          rating={4.5}
          image={'/pizza-placeholder.png'}
        />
      </div>
    </>
  );
}
