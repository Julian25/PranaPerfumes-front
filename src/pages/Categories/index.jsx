import React from 'react';
import styles from './categories.module.css';
import CategoriesList from '../../components/CategoriesList';

function Categories() {
  return (
    <div className={styles.container}>
        <h2>Crear nueva categoria</h2>
        <CategoriesList />
    </div>
  )
}

export default Categories;
