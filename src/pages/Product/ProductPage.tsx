import { Await, useLoaderData, useParams } from 'react-router-dom';
import { Product } from '../../interfaces/product.interface';
import styles from './Product.module.css';
import { Suspense } from 'react';

const ProductPage = () => {
  const data = useLoaderData() as { data: Product };

  return (
    <>
      <Suspense fallback={'Загружаю'}>
        <Await resolve={data.data}>
          {({ data }: { data: Product }) => <>Product - {data.name}</>}
        </Await>
      </Suspense>
    </>
  );
};

export default ProductPage;
