import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts	 } from '../../redux/thunks/admin';
import ProductCard from '../../components/ProductCard';
import styles from './product.module.css';



function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.list);

  useEffect(() =>{
    dispatch(getProducts());
  }, [])
  return (
    <div className={styles.container}>
      <h2>Productos</h2>
      { products.map( (product) => (
        <ProductCard
          key={product._id}
          id={product._id}
          name={product.name}
          price={product.price}
          category={product.category.name}
          pictures={product.pictures[0].url}
        />
      ))}
    </div>
  )
}

export default Products
