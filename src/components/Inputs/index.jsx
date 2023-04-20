import React from 'react';
import styles from './input.module.css';

function Input({id,text,type, register, error}) {
  return (
    <div className={styles.input_container}>
      <label htmlFor={id}>{text}</label>
      <input
        type={type}
        name={id}
        {...register(id)}
        className={error && styles.input_error}
      />
      {error && <p className={styles.error}>{error.message}</p>}
    </div>
  );
}

export default Input;
