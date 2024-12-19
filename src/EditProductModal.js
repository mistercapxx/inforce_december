import { useState } from "react";
import { useDispatch } from "react-redux";
import Modal from 'react-modal';

const EditProductModal = ({isOpen,closeModal,product}) => {
    const dispatch =useDispatch();
    const [editedName,setEditedName] = useState(product.name);
    const [editedCount,setEditedCount] = useState(product.count);

    const saveChanges = () => {
        dispatch({
            type:'products/updateProduct',
            payload:{id:product.id,name:editedName,count:editedCount},
        });
        closeModal();
    };


    return (
        <Modal isOpen={isOpen} onRequestClose={closeModal}>
            <h2>Edit Product</h2>
            <div>
                <label>Name:</label>
                <input type="text" value={editedName} onChange={(e)=>setEditedName(e.target.value)}
                />
            </div>
            <div>
                <label>Quantity:</label>
                <input type="text" value={editedCount} onChange={(e)=>setEditedCount(parseInt(e.target.value,10))}
                />
            </div>
            <button onClick={saveChanges}>Save</button>
            <button onClick={closeModal}>Cancel</button>
        </Modal>

    );

}

export default EditProductModal;