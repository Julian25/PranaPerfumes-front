import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Joi from 'joi';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { getCategories, createProduct } from '../../redux/thunks/admin';
import { toggleModal } from '../../redux/global/action';
import styles from './addProducts.module.css';
import Input from '../Inputs';
import TextArea from '../TextArea';
import Select from '../Select';
import Button from '../Button';
import { Image } from 'cloudinary-react';
import Modal from '../Modal';


function AddProduct({closeForm}) {
  const dispatch = useDispatch();
  const showModal = useSelector( (state) => state.global.showModal);
  const categories = useSelector( (state) => state.categories.list);
  const [images,setImages] = useState([]);
  const [imageToRemove, setImageToRemove] = useState(null);
  const [productCreated, setProductCreated] = useState(true)
  const url = import.meta.env.VITE_REACT_APP_API_URL


  const validationSchema = Joi.object({
    name: Joi
      .string()
      .min(4)
      .max(40)
      .required()
      .label('Name')
      .messages({
        'string.empty': `El campo "nombre" no puede estar vacío`,
        'string.max': `El nombre del producto no puede esta compuesto por más de 40 caracteres`,
        'string.min': `El nombre del producto no puede estar compuesto por menos de 3 caracteres`
      }),
    description: Joi
      .string()
      .min(0)
      .max(200)
      .label('Description')
      .messages({
        'string.max': `La descripción del producto no puede contener más de 200 caracteres`,
        'string.min': `La descripción del producto no puede estar compuesta por menos de 10 caracteres`
      }),
    price: Joi
      .number()
      .allow('')
      .optional()
      .label('Price'),
    category: Joi
      .string()
      .required()
      .label('Category')
      .messages({
        'string.empty': `El campo "categoría" no puede estar vacío`,
      }),
      pictures: Joi
      .required()
      .label('Pictures')
      .messages({
        'string.empty': `El campo "imágenes" no puede estar vacío, debe ingresar al menos una imagen`,
      })
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState : { errors }
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      name:'',
      description:'',
      price:'',
      category:'',
      pictures: []
    },
    resolver: joiResolver(validationSchema)
  });

  useEffect(() => {
    dispatch(getCategories());
  }, [])

  const formatCategories = () => {
    return categories.map((category) => {
      return {id: category._id, text: `${category.name}`}
    });
  };

  const showWidget = () => {
    const widget = window.cloudinary.createUploadWidget({
      cloudName: import.meta.env.VITE_REACT_APP_CLOUD_NAME,
      uploadPreset: import.meta.env.VITE_REACT_APP_UPLOAD_PRESET
    },
    (error, result) => {
      if(!error && result.event === 'success' ) {
        setImages((prev) => [...prev,  {url: result.info.url, public_id: result.info.public_id}])
        setValue('pictures', [ { url: result.info.secure_url, public_id: result.info.public_id}]);
      }
    });
    widget.open();
  }
   const handleRemoveImg = async (obj) => {
    setImageToRemove(obj.public_id);
    console.log(imageToRemove);
    try {
      // const token = sessionStorage.getItem('token');
      const requestConfig = {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json', token }
      }

      const response = await fetch(`${url}/admin/images/:public_id`, requestConfig);
      const data = response.json();
      if(!data.error) {
        setImageToRemove(null);
        setImages((prev) => prev.filter((img) => img.public_id !== obj.public_id));
      }
    } catch (error) {
      console.log(error)
    }
  }


  const submitHandler = (data) => {
  if (images.length > 0) {
      dispatch(createProduct(data));
      dispatch(toggleModal());
      reset();
      setImages([]);
      setProductCreated(true)
      console.log(data)
    } else {
      dispatch(toggleModal());
      setProductCreated(false)
    }
  
  }

  const closeHandler = () => {
    dispatch(toggleModal());
  }


  return (
    <div className={styles.form_container} >
        <button className={styles.close} onClick={closeForm} >
            X
        </button>
      <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
        <Input
          type={'text'}
          id={'name'}
          text={'Nombre'}
          error={errors.name}
          register={register}
        />
        <TextArea
          type={'text'}
          id={'description'}
          text={'Descripción'}
          error={errors.description}
          register={register}
        />
         <Input
          type={'number'}
          id={'price'}
          text={'Precio'}
          error={errors.price}
          register={register}
        />
        <Select
          text={'Categoría'}
          id={'category'}
          options={formatCategories()}
          error={errors.category}
          register={register}
        />
        <div className={styles.upload}>
          <Button classes={'accept'} onClick={showWidget}>
            + Agregar imagen
          </Button>
          <div className={styles.upload_container}>
            {images.map((image) => (
              <div className={styles.image_container} key={image.url}>
                <Image
                  cloudName= {import.meta.env.VITE_REACT_APP_CLOUD_NAME}
                  src={image.url}
                  name={'pictures'}
                  {...register('pictures')}
                  error={errors.pictures}
                />
                {imageToRemove !== image.public_id && <i className='fa fa-times-circle'onClick={()=>handleRemoveImg(image)}></i>}
              </div>
            ))}
          </div>
        </div>
        <Button>Crear producto</Button>
      </form>
      <Modal isConfirmation={false} handleClose={() => closeHandler()} isOpen={showModal}>
        <h3 className={styles.modal_text}>
          {productCreated ? 'Producto creado exitosamente' : 'Debe agregar al menos una imagen para crear un producto' }
        </h3>
      </Modal>
    </div>
  )
}

export default AddProduct;
