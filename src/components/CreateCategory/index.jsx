import React from 'react';
import styles from './createCategory.module.css';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import Input from '../Inputs';
import Button from '../Button';

function CreateCategory() {

    const validationSchema = Joi.object({
        name : Joi
        .string()
        .min(3)
        .max(30)
        .pattern(/^[A-Za-z0-9 ]+$/)
        .required()
        .messages({
            'string.empty': ` El campo Nombre no puede estar vacío`,
            'string.max': `El numero máximo de caracteres para nombre es 30`,
            'string.min': `El numero mínimo de caracteres para nombre es 3`
          }),
    })

    const {
        register,
        handleSubmit,
        formState : { errors },
        reset
    } = useForm({
        mode: 'onBlur',
        defaultValues: { name: ''},
        resolver: joiResolver(validationSchema)
    });

    const sendData = (data) => {
        console.log(data);
    }

    return (
      
    <form className={styles.form} onSubmit={handleSubmit(sendData)}>
      <Input
        id={'name'}
        text={'Nombre'}
        type={'text'}
        register={register}
        error={errors.name}
      />
      <Button>Crear categoria</Button>
    </form>
  )
}

export default CreateCategory;
