import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/thunks/admin';
import { addProductToCart } from '../../redux/thunks/global';
import { incrementCount } from '../../redux/global/action';
import ProductCard from '../../components/ProductCard';
import styles from './productByCategory.module.css';


function productByCategory() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.list);
  const { category } = useParams();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const upperCaseCategory = category.charAt(0).toLocaleUpperCase() + category.slice(1);
  console.log(upperCaseCategory)
  const productsByCategory = products?.filter((product) => {
    return product?.category.name === upperCaseCategory;
  })

  return (
    <div className={styles.container}>
      <h2>{upperCaseCategory}</h2>
      {productsByCategory?.map((product) => (
        <ProductCard
          key={product._id}
          id={product._id}
          name={product.name}
          price={product.price}
          category={product.category?.name}
          pictures={product.pictures[0].url}
          addToCar={() => {
            dispatch(incrementCount());
            dispatch(addProductToCart(product._id));
          }}
        />
      ))}
    </div>
  )
}

export default productByCategory;
