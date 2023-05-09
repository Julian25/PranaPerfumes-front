import React from 'react';
import styles from './select.module.css';

function Select({ text, id, options, error, register }) {
  return (
    <div className={styles.input_container}>
      <label htmlFor={id}>{text}</label>
        <select
            name={id}
            {...register(id)}
            className={error ? styles.input_error: styles.input_ok}
        >
            <option
                selected
                disabled
                className={styles.read_only}
                value=""
            >
                {`Seleccionar ${text}`}
            </option>
            {options?.map((option, index) =>(
                <option key={index}value={option.id}>
                    {option.text}
                </option>
            ))}
        </select>
        {error && <p className={styles.error}>{error.message}</p>}
    </div>
  );
};

export default Select;
