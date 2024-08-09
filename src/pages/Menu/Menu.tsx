import Headling from '../../components/Headling/Headling';
import SearchBar from '../../components/SearchBar/SearchBar';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useState, useEffect, ChangeEvent } from 'react';
import { PREFIX } from '../../helpers/API';
import { Product } from '../../interfaces/product.interface';
import axios, { AxiosError } from 'axios';
import styles from './Menu.module.css';
import { MenuList } from './MenuList/MenuList';

export type SearchBarQuery = {
  query: string;
};

export function Menu() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setErorr] = useState<string | undefined>();
  const [filter, setFilter] = useState<string>();

  useEffect(() => {
    getMenu(filter);
  }, [filter]);

  const getMenu = async (name?: string) => {
    try {
      setIsLoading(true);

      const { data } = await axios.get<Product[]>(`${PREFIX}/products/`, {
        params: {
          name,
        },
      });
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

  const onSearchBarChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  return (
    <>
      <div className={styles['head']}>
        <Headling>Меню</Headling>
        <SearchBar
          placeholder="Введите блюдо или состав"
          onChange={onSearchBarChange}
        />
      </div>
      <div>
        {error && <>{error}</>}
        {!isLoading && products.length > 0 && <MenuList products={products} />}
        {isLoading && <>Загружаем продукты....</>}
        {!isLoading && products.length === 0 && <>Не найдено блюд по запросу</>}
      </div>
    </>
  );
}

export default Menu;
