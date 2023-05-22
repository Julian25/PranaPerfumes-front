import React from 'react';
import { Link } from 'react-router-dom';
import styles from './productCard.module.css';
import Button from '../Button';
import Plus from '../../assets/icons/plus.png';

function ProductCard({  id, name, price, category, pictures, addToCar}) {
  return (
    <div className={styles.card}>
        <div className={styles.card_img}>
            <Link>
                <img src={pictures} alt="" />
            </Link>
        </div>
            <h3 className={styles.card_title}>{name}</h3>
            <span className={styles.card_price}>${price}</span>
            <Link to={`/producto/${id}`} className={styles.card_link}>
                <span>Ver mas</span>
                <img src={Plus} alt="Plus icon" />
            </Link>
            <Button classes='card' onClick={addToCar}>Lo quiero</Button>
    </div>
  )
}

export default ProductCard;
