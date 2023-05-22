import React from 'react';
import styles from './home.module.css';
import Button from '../../components/Button';
import Essenza from '../../assets/images/essenza2.png';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.text_container}>
        <h2>Experimenta las fragancias de la vida</h2>
        <Link to='/productos'>
          <Button>Ver productos</Button>
        </Link>
      </div>
      <div className={styles.img_container}>
        <img src={Essenza} alt="Imagen de un perfume" />
      </div>
    </div>
  )
}

export default Home;
