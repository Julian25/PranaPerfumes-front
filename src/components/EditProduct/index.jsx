import React from 'react';
import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Joi from 'joi';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { getSingleProduct, getCategories, editProduct } from '../../redux/thunks/admin';
import { toggleModal } from '../../redux/global/action';
import { Image } from 'cloudinary-react';
import Input from '../Inputs';
import TextArea from '../TextArea';
import Button from '../Button';
import Modal from '../Modal';
import Loading from '../Loading';
import styles from './editProduct.module.css';



function EdiProduct() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const showModal = useSelector( (state) => state.global.showModal);
    const categories = useSelector( (state) => state.categories.list);
    const product = useSelector( (state) => state.products.product);
    const isLoading = useSelector( (state) => state.products.isLoading )
    const [images,setImages] = useState([]);
    const [imageToRemove, setImageToRemove] = useState(null);
    const [productEdited, setProductEdited] = useState(true);
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
        name: '',
        description: '',
        price: '',
        category: '',
        pictures: []
      },
      resolver: joiResolver(validationSchema)
    });

    useEffect(() => {
      dispatch(getCategories());
      dispatch(getSingleProduct(id));
    }, [])

    useEffect(() => {
      setImages(product?.pictures)
      reset({
        name: product?.name,
        description: product?.description,
        price: product?.price,
        category: product?.category?._id,
        pictures: product?.pictures
      })
    }, [product])


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
          setValue('pictures', [ { url: result.info.secure_url, public_id: result.info.public_id}])
        }
      });
      widget.open();
    }
    const handleRemoveImg = async (obj) => {
      setImageToRemove(obj.public_id);
      try {
        const token = sessionStorage.getItem('token');
        const requestConfig = {
          method: 'DELETE',
          headers: { 'Content-type':'application/json', token}
        }
  
        const response = await fetch(`${url}/admin/images/${obj.public_id}`, requestConfig);
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
          dispatch(editProduct(data, id));
          dispatch(toggleModal());
          setProductEdited(true);
          dispatch(getSingleProduct(id));
      } else {
          dispatch(toggleModal());
          setProductEdited(false)
      }
    }
  
    const closeHandler = () => {
      dispatch(toggleModal());
      navigate('/administracion/productos/')
    }
  
  return (
    <div className={styles.container}>
        <h2>Editar Producto</h2>
        {isLoading ? ( <Loading />) : (
            <div className={styles.form_container}>
                <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
                    <Input
                        type={"text"}
                        id={"name"}
                        text={"Nombre"}
                        error={errors.name}
                        register={register}
                    />
                    <TextArea
                        type={"text"}
                        id={"description"}
                        text={"Descripción"}
                        error={errors.description}
                        register={register}
                    />
                    <Input
                        type={"number"}
                        id={"price"}
                        text={"Precio"}
                        error={errors.price}
                        register={register}
                    />
                    <div className={styles.input_container}>
                      <label htmlFor={id}>Categoria</label>
                        <select
                            name={'category'}
                            {...register('category')}
                            className={errors.category ? styles.input_error: styles.input_ok}
                        >
                            <option
                                selected
                                disabled
                                className={styles.read_only}
                                value={product?.category}
                            >
                                {product?.category?.name}
                            </option>
                            {formatCategories()?.map((option, index) =>(
                                <option key={index}value={option.id}>
                                    {option.text}
                                </option>
                            ))}
                        </select>
                        {errors && <p className={styles.error}>{errors.message}</p>}
                    </div>
                    <div className={styles.upload}>
                        <Button classes={"accept"} onClick={showWidget}>
                            + Agregar imagen
                        </Button>
                        <div className={styles.upload_container}>
                            {images?.map((image) => (
                                <div className={styles.image_container} key={image.url}>
                                    <Image
                                        cloudName={import.meta.env.VITE_REACT_APP_CLOUD_NAME}
                                        src={image.url}
                                        name={"pictures"}
                                        {...register("pictures")}
                                        error={errors.pictures}
                                    />
                                    {imageToRemove !== image.public_id &&
                                      <i
                                          className="fa fa-times-circle"
                                          onClick={() => handleRemoveImg(image)}
                                      ></i>
                                    }
                                </div>
                            ))}
                        </div>
                    </div>
                    <Button>Editar producto</Button>
                </form>
            </div>
        )}
        <Modal
            isConfirmation={false}
            handleClose={() => closeHandler()}
            isOpen={showModal}
        >
            <h3 className={styles.modal_text}>
                {productEdited
                ? "Producto actualizado exitosamente"
                : "El producto debe tener al menos una imagen"}
            </h3>
        </Modal>
    </div>
  );
}

export default EdiProduct;
