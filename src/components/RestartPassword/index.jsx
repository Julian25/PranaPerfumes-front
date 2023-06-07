import React from 'react';
import Joi from 'joi';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import firebase from '../../helper/firebase'
import Input from '../Inputs';
import Button from '../Button';
import Modal from '../Modal';
import styles from './reset.module.css';


const loginValidations = Joi.object({
    email: Joi
      .string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required()
      .messages({
        'string.empty': `El campo Email no puede estar vacío`,
        'string.email': `Debe ingresar una dirección de email valida`
      })
  });




function ResetPassWord() {
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState('');
    const [sent, setSent] = useState(false);
    const isLoading = useSelector( (state) => state.auth.isLoading);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        mode: 'onBlur',
        resolver: joiResolver(loginValidations),
        defaultValues: {
            email: ''
        }
    });

    useEffect(() => {
      reset();
    }, []);

    const recoverPassword = (email) => {
        firebase
            .auth().sendPasswordResetEmail(email)
            .then(() => {
                setSent(true);
                setMessage('Email para restablecer contraseña enviado. Revisa tu casilla de correos.');
                setShowModal(true);
            })
            .catch((error) => {
                console.log(error);
                setSent(false);
                setMessage('El email provisto no corresponde a un usuario existente');
                setShowModal(true);
            })
    }

    const submitHandler = (data) => {
        recoverPassword(data.email);
    }

    const closeHandler = () => {
      setShowModal(false);
      setMessage('');
      if(sent === true) {
        navigate('/login')
      }
    };


      return (
    <section className={styles.container}>
        <h2>Recuperar contraseña</h2>
            <div className={styles.form_container}>
                <form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
                    <Input
                        type={"email"}
                        id={"email"}
                        text={"Email"}
                        error={errors.email}
                        register={register}
                        onkeyDown={handleSubmit(submitHandler)}
                    />
                    <Button>Enviar</Button>
                </form>
            </div>
        <Modal handleClose={() => closeHandler()} isConfirmation={false} isOpen={showModal}>
          <p className={styles.modal_message}>{message}</p>
        </Modal>
    </section>
  );
}

export default ResetPassWord;
