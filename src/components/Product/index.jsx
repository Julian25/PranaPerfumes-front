import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleProduct } from '../../redux/thunks/admin';
import { addProductToCart } from '../../redux/thunks/global';
import { incrementCount } from '../../redux/global/action';
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
        <div className={styles.product_img}>
            <img src={product?.pictures[0].url} alt="" />
        </div>
        <div className={styles.product_body}>
            <h3>{product?.name}</h3>
            <div className={styles.product_description}>
                <p>
                    {product?.description}
                </p>
            </div>
            {product?.price !== null && <p className={styles.product_price}>${product?.price}</p>}
            <Button onClick={() => {
                    dispatch(incrementCount());
                    dispatch(addProductToCart(product._id));
                }}
            >
                Lo quiero
            </Button>
        </div>
    </div>
  )
}

export default Product;
