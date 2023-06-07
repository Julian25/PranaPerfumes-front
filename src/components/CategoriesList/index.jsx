import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCategories, deleteCategory} from '../../redux/thunks/admin';
import { toggleModal } from '../../redux/global/action';
import { resetMessage } from '../../redux/categories/actions';
import Loading from '../Loading';
import styles from './categoriesList.module.css';
import Trash from '../../assets/icons/trash.png';
import Modal from '../Modal';

function CategoriesList() {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.list );
    const showModal = useSelector( (state) => state.global.showModal);
    const isLoading = useSelector( (state) =>state.categories.isLoading);
    const [confirmation, setConfirmation] = useState(true);
    const [id, setId] = useState('');

    useEffect(() => {
        dispatch(getCategories())
    },[])

    const closeHandler = () => {
        dispatch(toggleModal());
        dispatch(resetMessage());
        setConfirmation(true);
    }
  
    const confirmHandler = () => {
        dispatch(deleteCategory(id));
        setConfirmation(false);
    }


  return (
    <div className={styles.list_container}>
        <ul className={styles.list}>
            { isLoading ? (<Loading/>) : (categories.map((category) => (
                <li className={styles.list_item} key={category._id}>
                    <span>{category.name}</span>
                    <img src={Trash} alt="delete icon" onClick={() =>{
                        setId(category._id);
                        dispatch(toggleModal());
                    }}
                    />
                </li>
            )))}
        </ul>
        <Modal isOpen={showModal} isConfirmation={confirmation} 
            handleClose={confirmation ? () => dispatch(toggleModal(false)) : () => closeHandler()}
            confirmed={() => confirmHandler()}
        >
            <p className={styles.modal_text}>{confirmation ? '¿Estás seguro de que querés eliminar esta categoría?' : 'Categoria eliminada' }</p>
        </Modal>
    </div>
  )
}

export default CategoriesList;
