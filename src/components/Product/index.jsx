import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleProduct } from '../../redux/thunks/admin';
import Button from '../Button';
import styles from './product.module.css';

function Product() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const product = useSelector( (state) => state.products.product);

    useEffect(() => {
        dispatch(getSingleProduct(id));
    }, []);
    return (
    <div className={styles.container}>
        <h2>{product?.name}</h2>
        <div className={styles.product_img}>
            <img src={product?.pictures[0].url} alt="" />
        </div>
        <div className={styles.product_description}>
            <p>
                {product?.description}
            </p>
        </div>
        <p className={styles.product_price}> <span>Precio:</span> ${product?.price}</p>
        <Button>Lo quiero</Button>
    </div>
  )
}

export default Product;
