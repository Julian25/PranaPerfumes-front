import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './dashboard.module.css';
import Add from '../../assets/icons/add.png';
import firebase from '../../helper/firebase';
import List from '../../assets/icons/list.png';
import AddProduct from '../../components/AddProduct';
import ProductsList from '../../components/ProductList';
import Button from '../../components/Button';


function ProductsDashboard() {
const [showAddProducts, setShowAddProducts] = useState(false);
const [showProductsList, setShowProductsList] = useState(false);
const navigate = useNavigate();

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

const logOut = () => {
  firebase.auth().signOut();
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('role');
  navigate('/');
};

const gotBack = () => {
  navigate('/administracion')
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
      <div className={styles.buttons}>
        <Button classes={'accept'} onClick={gotBack}>Volver</Button>
        <Button classes={'red'} onClick={logOut}>Log Out</Button>
      </div>
    </div>
  )
}

export default ProductsDashboard;
