import React from 'react';
import { Link } from 'react-router-dom';
import styles from './productCard.module.css';
import Button from '../Button';

function ProductCard({  id, name, price, category, pictures}) {
  return (
    <div className={styles.card}>
        <div className={styles.card_img}>
            <Link to={`/administracion/productos/${id}`}>
                <img src={pictures} alt="" />
            </Link>
        </div>
            <h3 className={styles.card_title}>{name}</h3>
            <span className={styles.card_price}>${price}</span>
            <span className={styles.card_category}>{category}</span>
            <Button classes='card'>Lo quiero</Button>
    </div>
  )
}

export default ProductCard;
