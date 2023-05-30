import React from 'react';
import {  useState } from 'react';
import AddCategory from '../AddCategory';
import CategoriesList from '../CategoriesList';
import styles from './categoriesDashboard.module.css';
import Add from '../../assets/icons/add.png';
import List from '../../assets/icons/list.png';

function CategoriesDashboard() {
    const [showAddCategories, setShowAddCategories] = useState(false);
    const [showCategoriesList, setShowCategoriesList] = useState(false);




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
    </div>
  )
}

export default CategoriesDashboard;
