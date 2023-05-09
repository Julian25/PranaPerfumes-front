import React from 'react';
import styles from './button.module.css';


function Button({children, classes, onClick}) {

    switch (classes) {
        case 'red':
            classes = `${styles.btn} ${styles.redBtn}`;
            break;
        case 'close':
            classes = `${styles.roundBtn} ${styles.closeBtn}`;
            break;
        case 'accept':
            classes = `${styles.btn} ${styles.acceptBtn}`
            break;
        case 'card':
            classes = styles.cardBtn;
            break;
        default:
            classes = styles.btn;
            break;
    }

  return (
    <>
        <button
            className={classes}
            {...(onClick !== undefined && {
                onClick: (e) => {
                    e.preventDefault();
                    onClick();
                }
            })}
        >
            {classes === 'closeBtn' ? 'X' : children}
        </button>
    </>
  )
}

export default Button;
