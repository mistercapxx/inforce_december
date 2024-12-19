import Modal from 'react-modal';
const ConfirmDeleteModal = ({isOpen,closeModal,onConfirm}) => {  

    return (
        <Modal isOpen={isOpen} onRequestClose={closeModal}>
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this product?</p>
        
            <button onClick={onConfirm}>Yes,delete</button>
     
            <button onClick={closeModal}>Cancel</button>
        </Modal>
    );
};

export default ConfirmDeleteModal;