import React, { useEffect } from 'react';
import styles from './administration.module.css';
import { Link , useNavigate } from 'react-router-dom';
import firebase from '../../helper/firebase';
import Admin from '../../assets/icons/admin.png';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthAdmin } from '../../redux/thunks/admin';
import Button from '../../components/Button'

function Administration() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.auth.user);
  const navigate = useNavigate();
  const uid = sessionStorage.getItem('uid');

   useEffect(() => {
     dispatch(getAuthAdmin(uid))
   },[]);

  const logOut = () => {
    firebase.auth().signOut();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    navigate('/');
  };

  return (
    <div className={styles.container}>
        <h2>Bienvenida/o, {user?.firstName}</h2>
        <div className={styles.admin_container}>
          <Link className={styles.link} to='/administracion/categorias'>
            <img src={Admin} alt="Imagen de administracion" />
            <span>Administrar categorías</span>
          </Link>
        </div>
        <div className={styles.admin_container}>
          <Link to='/administracion/productos' className={styles.link}>
            <img src={Admin} alt="Imagen de administracion" />
            <span>Administrar productos</span>
          </Link>
        </div>
        <Button classes={'red'} onClick={logOut}>Log Out</Button>
    </div>
  )
}

export default Administration;
