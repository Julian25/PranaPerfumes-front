import React from 'react';
import styles from './administration.module.css';
import { Link } from 'react-router-dom';
import Admin from '../../assets/icons/admin.png';

function Administration() {
  return (
    <div className={styles.container}>
        <h2>Bienvenido, Usuario</h2>
        <div className={styles.admin_container}>
          <Link className={styles.link} to='/administracion/categorias'>
            <img src={Admin} alt="Imagen de administracion" />
            <span>Administrar categorías</span>
          </Link>
        </div>
        <div className={styles.admin_container}>
          <Link className={styles.link}>
            <img src={Admin} alt="Imagen de administracion" />
            <span>Administrar productos</span>
          </Link>
        </div>
    </div>
  )
}

export default Administration;
