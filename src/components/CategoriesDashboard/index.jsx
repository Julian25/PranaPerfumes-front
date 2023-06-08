import React from 'react';
import {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddCategory from '../AddCategory';
import CategoriesList from '../CategoriesList';
import firebase from '../../helper/firebase';
import styles from './categoriesDashboard.module.css';
import Add from '../../assets/icons/add.png';
import List from '../../assets/icons/list.png';
import Button from '../Button';

function CategoriesDashboard() {
    const [showAddCategories, setShowAddCategories] = useState(false);
    const [showCategoriesList, setShowCategoriesList] = useState(false);
    const navigate = useNavigate();




    const showAdd = () => {
      setShowAddCategories(!showAddCategories);
      setShowCategoriesList(false);
    }
    
    const showList = () => {
      setShowCategoriesList(!showCategoriesList);
      setShowAddCategories(false);
    }
    
    const closeAdd = () => {
      setShowAddCategories(false);
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
        <span>Agregar nuevas categorías</span>
      </div>
      <div className={styles.option} onClick={showList}>
        <img src={List} alt="List icon" />
        <span>Lista de categorías</span>
      </div>
      { showAddCategories && <AddCategory closeForm={closeAdd}/> }
      { showCategoriesList  && <CategoriesList/> }
      <div className={styles.buttons}>
        <Button classes={'accept'} onClick={gotBack}>Volver</Button>
        <Button classes={'red'} onClick={logOut}>Log Out</Button>
      </div>
    </div>
  )
}

export default CategoriesDashboard;
