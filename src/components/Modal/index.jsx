import React from 'react';
import styles from './modal.module.css'
import Button from '../Button';

function Modal({ children, isOpen, handleClose, isConfirmation, confirmed}) {
  if (!isOpen) {
    return null;
  }
  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal_wrapper}>
        <Button classes={'close'} onClick={handleClose}>
            X
        </Button>
        <div className={styles.children_container}>
            {children}
        </div>
        { isConfirmation ? (
            <div className={styles.button_wrapper}>
                <Button classes="accept" onClick={confirmed}>
                    Accept
                </Button>
                <Button classes='red' onClick={handleClose}>
                    Cancel
                </Button>
            </div>
        ) : (
            <div className={styles.buttonWrapper}></div>
        )}
      </div>
    </div>
  )
}

export default Modal;
