import React from 'react';
import styles from './categories.module.css';
import CreateCategory from '../../components/CreateCategory';

function Categories() {
  return (
    <div className={styles.container}>
        <CreateCategory />
    </div>
  )
}

export default Categories;
