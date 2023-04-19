import React from 'react'
import styles from './footer.module.css';
import Instagram from '../../assets/icons/instagram.png';
import Whatsapp from '../../assets/icons/whatsapp.png'
function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.links}>
        <div className={styles.social_box}>
          <a href="https://www.instagram.com/prana.perfumes/" target="blank">
            <img src={Instagram} alt="Instagram logo" />
          </a>
          <p>Seguinos</p>
        </div>
        <div className={styles.social_box}>
          <a href='#' target="blank">
            <img src={Whatsapp} alt="Whatsapp logo" />
          </a>
          <p>Escribinos</p>
        </div>
      </div>
      <div className={styles.copyright}>
        <p>Rosario, Argentina.</p>
        <p>Copyright © 2023 PIXEL WEB LAB</p>
      </div>
    </footer>
  )
}

export default Footer;
