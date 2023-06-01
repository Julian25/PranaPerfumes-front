import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/thunks/admin';
import { addProductToCart } from '../../redux/thunks/global';
import { incrementCount } from '../../redux/global/action';
import { getCategories } from '../../redux/thunks/admin';
import { NavLink } from 'react-router-dom';
import Loading from '../../components/Loading';
import ProductCard from '../../components/ProductCard';
import styles from './products.module.css';
import CategoriesMenu from '../../components/categoriesMenu';



function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.list);
  const isLoading = useSelector((state) => state.products.isLoading);
  const categories = useSelector((state) => state.categories.list);
  const [showDropDown, setShowDropDown] = useState(false);

  useEffect(() =>{
    dispatch(getProducts());
    dispatch(getCategories());
  }, [])



  return (
    <div className={styles.container}>
      <CategoriesMenu categories={categories} />
      <h2>Productos</h2>
      <div className={styles.products_container}>
        { isLoading ? (<Loading/>) : (products?.map( (product) => (
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
        )))}
      </div>
    </div>
  )
}

export default Products
