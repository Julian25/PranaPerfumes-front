import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './header.module.css';
import Arrow from '../../assets/icons/drop.png';

function Header() {
  const [show,setShow] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);

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
          <h1>PRANA</h1>
          <span className={styles.line}></span>
          <span className={styles.sub_title}>PERFUMES</span>
        </div>
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
                Fragancias
                <img src={Arrow} alt="icono flecha" className={classesServ} />
              </li>
                <ul className={classesDrop}>
                  <NavLink to='/fragancias/ellas' className={styles.link} onClick={closeMenu}>
                    <li>
                      Fragancias para ellas
                    </li>
                  </NavLink>
                  <NavLink to='/fragancias/ellos' className={styles.link} onClick={closeMenu}>
                    <li>
                      Fragancias para ellos
                    </li>
                  </NavLink>
                </ul>
            <NavLink className={styles.link} to="/administracion">
              <li>Administrar</li>
            </NavLink>
          </ul>
        </nav>
      </header>
    </>
  )
}

export default Header;
