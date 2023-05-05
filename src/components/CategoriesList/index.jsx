import React from 'react';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCategories, deleteCategory, createCategory } from '../../redux/thunks/admin';
import { toggleModal } from '../../redux/global/action';
import { resetMessage } from '../../redux/categories/actions';
import Input from '../Inputs';
import Button from '../Button';
import styles from './list.module.css';
import Trash from '../../assets/icons/trash.png';
import Modal from '../Modal';
import Loading from '../Loading';

function CategoriesList() {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.list );
    const showModal = useSelector( (state) => state.global.showModal);
    const isLoading = useSelector( (state) =>state.categories.isLoading);
    const [confirmation, setConfirmation] = useState(true);
    const [id, setId] = useState('');

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


    useEffect(() => {
        dispatch(getCategories())
    },[])

    console.log(categories)

    const closeHandler = () => {
      dispatch(toggleModal());
      dispatch(resetMessage());
      setConfirmation(true);
    }

   const confirmHandler = () => {
      dispatch(deleteCategory(id));
      setConfirmation(false);
   }

   const sendData = (data) => {
        dispatch(createCategory(data));
        reset();
        dispatch(getCategories());
        console.log(categories)
    }

  return (
    <>
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
      { isLoading ? (
        <Loading />
      ) : (
        <div className={styles.list_container}>
          <ul className={styles.list}>
            { categories.map((category) => (
                <li className={styles.list_item} key={category._id}>
                  <span>{category.name}</span>
                  <img src={Trash} alt="delete icon" onClick={() =>{
                    setId(category._id);
                    dispatch(toggleModal());
                    }}
                  />
                </li>
            ))}
          </ul>
        </div>
      )}
      <Modal isOpen={showModal} isConfirmation={confirmation} 
        handleClose={confirmation ? () => dispatch(toggleModal(false)) : () => closeHandler()}
        confirmed={() => confirmHandler()}
      >
        <p>{confirmation ? '¿Estás seguro de que querés eliminar esta categoría?' : 'Categoria eliminada' }</p>
      </Modal>
    </>
  )
}

export default CategoriesList
