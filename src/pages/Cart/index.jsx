import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart } from '../../redux/thunks/global';
import { removeFromCart, incrementCount, decrementCount } from '../../redux/global/action';
import { Link } from 'react-router-dom';
import Plus from '../../assets/icons/plus.png';
import Remove from '../../assets/icons/remove.png';
import Button from '../../components/Button';
import styles from './cart.module.css';

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.global.cart);

  const totalPrice = cart.reduce((total, cartItem) => total + (cartItem.price * cartItem.cartCount), 0);

  const order = `Hola, te paso mi pedido: 
  ${cart.reduce( (message,cartItem) => message.concat( `\n• ${cartItem.name} - ${cartItem.cartCount} $${cartItem.price * cartItem.cartCount}`), 
  ``).concat( `\n\nTotal: $${cart.reduce(
    (total, cartItem) => total + (cartItem.price * cartItem.cartCount),
    0)}`
  )}`;

  return (
    <div className={styles.container} >
      <h2>Carrito de compras</h2>
      {cart.length === 0 ? (
        <h3 className={styles.cart_empty}>Tu carrito de compras esta vacio</h3>
      ) : (
        cart.map((cartItem) => (
          <div key={cartItem._id} className={styles.cart_item}>
            <div className={styles.cart_item_header}>
              <div className={styles.cart_item_img}>
                <img src={cartItem.pictures[0].url} alt="" />
              </div>
              <h3>{cartItem.name}</h3>
            </div>
            <div className={styles.cart_item_body}>
              <p> Cantidad: {cartItem.cartCount}</p>
              <p className={styles.price}>${cartItem.price * cartItem.cartCount}</p>
              <div className={styles.cart_item_buttons}>
                <img src={Plus} alt="add icon" onClick={() => {
                    dispatch(addProductToCart(cartItem._id));
                    dispatch(incrementCount());
                  }}
                />
                <img src={Remove} alt="remove icon"
                  onClick={() => {
                    dispatch(removeFromCart(cartItem._id));
                    dispatch(decrementCount());
                  }}
                />
              </div>
            </div>
          </div>
        ))
      )}
      {totalPrice > 0 &&  <p className={styles.total}>Total: ${totalPrice}</p> }
      {totalPrice > 0 && 
        <Link to={`https://wa.me/3412297399?text=${encodeURIComponent(
                order
              )}`}
            target='_blank'
        >
          <Button>
            Pedir por whatsapp
          </Button>
        </Link> 
      }
    </div>
  )
}

export default Cart;
