import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditProductModal from "./EditProductModal";

const ProductView = ({ productId }) => {

  const [isModalOpen,setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const dispatch = useDispatch();


  const thatproduct = useSelector((state) => state.products.products.find((prod) => prod.id === productId));

  const [editedName, setEditedName] = useState(thatproduct.name); 
  const [editedCount, setEditedCount] = useState(thatproduct.count); 

  const handleSaveChanges = () => {
    dispatch({
      type: "products/updateProduct",
      payload: { id: productId, name: editedName,count:editedCount },
     
    });
  };

  const thatcomments = useSelector((state) => state.comments.comments.filter((com) => com.productId === productId)


  ); 
 

  const [newComment, setNewComment] = useState(""); 

  const handleAddComment = (e) => {
    e.preventDefault(); 
    dispatch({
      type: "comments/addComment",
      payload: { productId, text: newComment, id: Date.now(),date:new Date().toLocaleString() },

  
    });
    setNewComment(""); 
  };

  const handleDeleteComment = (commentId) => {
    dispatch({
      type: "comments/removeComment",
      payload: commentId,
    });
  };

  return (
    <div>
      <h2>Detailed Info Of Product </h2>
      <p>Name:{thatproduct.name}</p>
      <p>Quantity:{thatproduct.count}</p>

      <button onClick={openModal}>Change</button>
      <EditProductModal isOpen={isModalOpen} closeModal={closeModal} product={thatproduct}/>


      <br />
      <br /> 
      <h3>Comments:</h3>
      <ul>
      
        {thatcomments.map((comment) => (
          <li key={comment.id}>
          {comment.text} <t/>
            <small>({comment.date})</small>
        
            <button onClick={() => handleDeleteComment(comment.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <br />
      <br />
      <h4>Add comment:</h4>
      <form onSubmit={handleAddComment}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Type comment"
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};
export default ProductView;
