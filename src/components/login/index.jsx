import React from 'react';
import Joi from 'joi';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Input from '../Inputs';
import Button from '../Button';
import Loading from '../Loading';
import Modal from '../Modal';
import styles from './login.module.css';
import { login } from '../../redux/thunks/auth';
import { resetMessage } from '../../redux/auth/actions';
import { setAdmin } from '../../redux/global/action';
import { getAuthAdmin } from '../../redux/thunks/admin';

const loginValidations = Joi.object({
    email: Joi
      .string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required()
      .messages({
        'string.empty': `El campo Email no puede estar vacío`,
        'string.email': `Debe ingresar una dirección de email valida`
      }),
    password: Joi.string().required().label('Password').min(8).messages({
      'string.empty': `El campo password no puede estar vacio`,
      'string.min': `Ingrese un password valido`
    })
  });




function Login() {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const isLoading = useSelector( (state) => state.auth.isLoading);
    const message = useSelector( (state) => state.auth.message);
    const adminPath = useSelector( (state) => state.global.adminPath)
    const navigate = useNavigate();
    const error = useSelector( (state) => state.auth.error);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        mode: 'onBlur',
        resolver: joiResolver(loginValidations),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    useEffect(() => {
      reset();
    }, []);

    const setPath = () => {
      if(sessionStorage.getItem('token')) {
        sessionStorage.getItem('role') === 'Admin' && dispatch(setAdmin('/administracion'));
      }
    }

    const token = sessionStorage.getItem('token')
    const role =sessionStorage.getItem('role');
    console.log(role);
    console.log(token)
    const submitHandler = (data) => {
        dispatch(login(data));
        setShowModal(true);
    };

    const closeHandler = () => {
      setShowModal(false);
      dispatch(resetMessage());
      console.log('pepe')
      if (!error) {
          setPath();
          navigate('/administracion/');
          console.log(adminPath);
          dispatch(getAuthAdmin());
          console.log(token)
        }
    };


      return (
    <section className={styles.container}>
        {isLoading ? (
            <Loading />
        ) : (
            <div className={styles.form_container}>
                <h2>Log In</h2>
                <form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
                    <Input
                        type={"email"}
                        id={"email"}
                        text={"Email"}
                        error={errors.email}
                        register={register}
                        onkeyDown={handleSubmit(submitHandler)}
                    />
                    <Input
                        type={"password"}
                        id={"password"}
                        text={"Password"}
                        error={errors.password}
                        register={register}
                        onkeyDown={handleSubmit(submitHandler)}
                    />
                    <Button>Log in</Button>
                </form>
            </div>
        )}
        <Modal handleClose={() => closeHandler()} isConfirmation={false} isOpen={showModal}>
          <h2>{message ? message : 'Login...'}</h2>
        </Modal>
    </section>
  );
}

export default Login;
