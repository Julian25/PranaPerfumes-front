import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct } from '../../redux/thunks/admin';
import { toggleModal } from '../../redux/global/action';
import Modal from '../Modal';
import Loading from '../Loading'
import Trash from '../../assets/icons/trash.png';
import Pencil from '../../assets/icons/pencil.png';
import styles from './productsList.module.css';

function ProductsList() {
  const dispatch = useDispatch();
  const products = useSelector( (state) => state.products.list);
  const isLoading = useSelector( (state) => state.products.isLoading);
  const showModal = useSelector( (state) => state.global.showModal);
  const [confirmation, setConfirmation] = useState(true);
  const [id, setId] = useState('');

  useEffect(() => {
    dispatch(getProducts());
  }, [])

  const handleConfirm = () => {
    dispatch(deleteProduct(id));
    setConfirmation(false)
  }

  const closeHandler = () => {
    dispatch(toggleModal());
    setConfirmation(true);
  }

  return (
    <section className={styles.table_container}>
    {isLoading ? ( <Loading /> ) : (
      <table className={styles.table}>
        <thead>
          <tr className={styles.header_row}>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Eliminar/ Editar</th>
          </tr>
        </thead>
        <tbody>
        {products.map((product) => (
            <tr key={product._id} className={styles.rows}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category?.name}</td>
                <td>
                  <img src={Trash} alt="icono de eliminar"  
                    className={styles.td_img}
                    onClick={() => {
                      setId(product._id);
                      dispatch(toggleModal());
                    }}
                  />
                  <Link to={`/administracion/productos/${product._id}`}>
                    <img src={Pencil} alt="icono de editar" className={styles.td_img} />
                  </Link>
                </td>
            </tr>
        ))}
        </tbody>
      </table>
    )}
    <Modal
      isConfirmation={confirmation}
      isOpen={showModal}
      confirmed={handleConfirm}
      handleClose={closeHandler}
      >
        <h3 className={styles.modal_text}>{confirmation ? '¿Estás seguro de que querés eliminar este producto?' : 'Producto eliminado exitosamente'}</h3>
      </Modal>
    </section>
  )
}

export default ProductsList;
