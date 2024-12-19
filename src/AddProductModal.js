import Modal from 'react-modal';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const AddProductModal = ({isOpen,closeModal}) => {
    const dispatch = useDispatch();

    const [name,setName] = useState('');
    const [count,setCount] = useState('');

    const addProduct = () => {
       dispatch({
        type:'products/addProduct',
        payload:{name,count:parseInt(count)},
       });
       closeModal();

    }

    return (
        <Modal isOpen={isOpen} onRequestClose={closeModal}>
         
            <h2>Add New Product?</h2>
            <div>
                <label>Name :</label>
                <input
                type='text'
                value={name}
                onChange={(e)=>setName(e.target.value)}
                />

            </div>
            <div>
                <label>Quantity :</label>
                <input
                type='text'
                value={count}
                onChange={(e)=>setCount(e.target.value)}
                />
                
            </div>
            <button onClick={addProduct}>Confirm</button>
            <button onClick={closeModal}>Cancel</button>
        </Modal>
    )
}

export default AddProductModal;


