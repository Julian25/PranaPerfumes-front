import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styles from './menu.module.css';

function CategoriesMenu({categories}) {

  const [showDropDown, setShowDropDown] = useState(false);

  const openDrop = () =>  setShowDropDown(!showDropDown);

  let classesDrop;
  let classesServ;

  if (showDropDown) {
    classesDrop = `${styles.dropDown} ${styles.dropDown__open}`;
    classesServ = `${styles.fragancias_img} ${styles.fragancias_rotate}`;
  } else {
    classesDrop = styles.dropDown;
    classesServ = styles.fragancias_img;
  }


  return (
    <>
      <span className={styles.categorias} onClick={openDrop} >
        Ver categorías
      </span>
      <ul className={classesDrop}>
        <span className={styles.categories_close} onClick={openDrop}>X</span>
        {categories?.map((category) => (
          <NavLink to={`/productos/${category.name.toLowerCase()}`} key={category.name} className={styles.link} onClick={openDrop}>
            <li>{category.name}</li>
          </NavLink>
        ))}
      </ul>
    </>
  )
}

export default CategoriesMenu;
