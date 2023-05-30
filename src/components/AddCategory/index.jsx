import React from 'react';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { useSelector, useDispatch } from 'react-redux';
import {  createCategory } from '../../redux/thunks/admin';
import { toggleModal } from '../../redux/global/action';
import Input from '../Inputs';
import Button from '../Button';
import styles from './addCategory.module.css';
import Modal from '../Modal';

function AddCategory({closeForm}) {
    const dispatch = useDispatch();
    const showModal = useSelector( (state) => state.global.showModal);

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
        dispatch(createCategory(data));
        dispatch(toggleModal());
        reset();
    }

    const closeHandler = () => {
        dispatch(toggleModal());
    }

    const closeAdd = () => {
        setShowAddCategories(false);
      }


  return (
    <div className={styles.form_container}>
        <button className={styles.close} onClick={closeForm} >
            X
        </button>
        <form className={styles.form} onSubmit={handleSubmit(sendData)}>
            <Input
                id={'name'}
                text={'Nombre'}
                type={'text'}
                register={register}
                error={errors.name}
            />
            <Button>Crear categoría</Button>
        </form>
        <Modal isConfirmation={false} handleClose={() => closeHandler()} isOpen={showModal}>
            <h3 className={styles.modal_text}>
                Categoría creada exitosamente
            </h3>
      </Modal>
    </div>
  )
}

export default AddCategory
