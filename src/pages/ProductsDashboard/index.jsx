import React from 'react';
import { useState } from 'react';
import styles from './dashboard.module.css';
import Add from '../../assets/icons/add.png';
import List from '../../assets/icons/list.png';
import AddProduct from '../../components/AddProduct';
import ProductsList from '../../components/ProductList';


function ProductsDashboard() {
const [showAddProducts, setShowAddProducts] = useState(false);
const [showProductsList, setShowProductsList] = useState(false);

const showAdd = () => {
  setShowAddProducts(!showAddProducts);
  setShowProductsList(false);
}

const showList = () => {
  setShowProductsList(!showProductsList);
  setShowAddProducts(false);
}

const closeAdd = () => {
  setShowAddProducts(false);
}

  return (
    <div className={styles.container}>
      <div className={styles.option} onClick={showAdd}>
        <img src={Add} alt="Add icon" />
        <span>Agregar nuevos productos</span>
      </div>
      <div className={styles.option} onClick={showList}>
        <img src={List} alt="List icon" />
        <span>Lista de productos</span>
      </div>
      {showAddProducts && <AddProduct closeForm={closeAdd} /> }
      {showProductsList && <ProductsList />}
    </div>
  )
}

export default ProductsDashboard;
