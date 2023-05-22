import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../redux/thunks/admin';
import { NavLink } from 'react-router-dom';
import styles from './header.module.css';
import Arrow from '../../assets/icons/drop.png';
import Cart from '../../assets/icons/cart.png';

function Header() {
  const dispatch = useDispatch();
  const [show,setShow] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const count = useSelector((state) => state.global.count);
  const categories = useSelector((state) => state.categories.list);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const showMenu = () =>  {
    setShow(!show);
    setShowDropDown(false);
  }

  const closeMenu = () => {
    setShow(false);
    setShowDropDown(false);
  }

  const openDrop = () =>  setShowDropDown(!showDropDown);

  let classesSpan;
  let classesNav;

  if (show) {
    classesSpan = `${styles.nav_toggle} ${styles.open}`;
    classesNav = `${styles.navList} ${styles.open}`;
  } else {
    classesSpan = styles.nav_toggle;
    classesNav = styles.navList;
  };

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
      <header className={styles.header_container}>
        <div className={styles.logo}>
          <h1>ESSENZA</h1>
          <span className={styles.line}></span>
          <span className={styles.sub_title}>EXPERIENCIAS</span>
        </div>
        <NavLink to='/carrito' className={styles.cart_link}>
          <img src={Cart} alt="cart icon"  className={styles.cart}/>
          {count > 0 && (<span className={`${styles.badge}  ${styles.badge__warning} ${styles.cart__count}`}>{count}</span>)}
        </NavLink>
        <div className={classesSpan} onClick={showMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <nav className={classesNav}>
          <ul>
            <NavLink className={styles.link} to="/" onClick={closeMenu}>
              <li>Home</li>
            </NavLink>
              <li className={styles.fragancias} onClick={openDrop}>
                Categorías
                <img src={Arrow} alt="icono flecha" className={classesServ} />
              </li>
                <ul className={classesDrop}>
                 {categories?.map((category) => (
                  <NavLink to={`/productos/${category.name.toLowerCase()}`} key={category.name} className={styles.link}  onClick={closeMenu}>
                    <li>{category.name}</li>
                  </NavLink>
                 ))}
                </ul>
            <NavLink className={styles.link} to="/administracion"  onClick={closeMenu}>
              <li>Administrar</li>
            </NavLink>
          </ul>
        </nav>
      </header>
    </>
  )
}

export default Header;
