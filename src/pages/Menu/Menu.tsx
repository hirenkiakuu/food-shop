import Headling from '../../components/Headling/Headling';
import SearchBar from '../../components/SearchBar/SearchBar';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useState, useEffect } from 'react';
import { PREFIX } from '../../helpers/API';
import { Product } from '../../interfaces/product.interface';
import axios, { AxiosError } from 'axios';
import styles from './Menu.module.css';
import { MenuList } from './MenuList/MenuList';

export function Menu() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setErorr] = useState<string | undefined>();

  const getMenu = async () => {
    try {
      setIsLoading(true);
     
      const { data } = await axios.get<Product[]>(`${PREFIX}/products`);
      setProducts(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        setErorr(error.message);
      }
      setIsLoading(false);
      return;
    }
  };

  useEffect(() => {
    getMenu();
  }, []);

  return (
    <>
      <div className={styles['head']}>
        <Headling>Меню</Headling>
        <SearchBar placeholder="Введите блюдо или состав" />
      </div>
      <div>
        {error && <>{error}</>}
        {!isLoading && <MenuList products={products} />}
        {isLoading && <>Загружаем продукты....</>}
      </div>
    </>
  );
}

export default Menu;