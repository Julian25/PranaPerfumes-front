import React from 'react';
import styles from './textArea.module.css';

const TextArea = ({ text, id, register, error }) => {
  return (
    <div className={styles.text_area_container}>
      <label htmlFor={id}>{text}</label>
      <textarea 
        cols="40" rows="5" 
        name={id}
        {...register(id)}
        className = {error && styles.text_area_error}
      >
      </textarea>
      { error && <p className={styles.error}>{error.message}</p>}
    </div>
  );
};

export default TextArea;
