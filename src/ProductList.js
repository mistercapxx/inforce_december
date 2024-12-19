import { useDispatch, useSelector } from "react-redux";
import AddProductModal from "./AddProductModal";
import { useState } from "react";
import ProductView from "./ProductView";
import ConfirmDeleteModal from "./ConfirmDeleteModal"; 

const ProductList = () => {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [sortOption, setSortOption] = useState("name");
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [productToDelete,setProductToDelete] = useState(null);


  const productSelection = (productId) => {    
 
    setSelectedProductId(productId); 

  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value); 

  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {  setProductToDelete(null); setIsModalOpen(false);} 


  const sortedProducts = [...products].sort((a, b) => {

    if (sortOption === "name") {

      return a.name.localeCompare(b.name);
    } else {
      return a.count - b.count;
  
    }
  });


  const removeProduct = () => {
    if(productToDelete) 
    {
      dispatch({
        type:'products/removeProduct',
        payload:productToDelete,
      });
      setProductToDelete(null); 
      closeModal(); 
    }
  };

  return (
    <div>



      {selectedProductId ? (
        <>
    
        <button onClick={()=>setSelectedProductId(null)}>Back to List</button>

             <ProductView productId={selectedProductId} />
    
        </>
   
      ) : (
       <>
          <h1>Products</h1>
      <select onChange={handleSortChange} value={sortOption}>
        <option value="name">Sort By Name</option>
        <option value="count">Sort By Quantity</option>
      </select>
      <br/>
      <br/>
        <ul>
        
          {sortedProducts.map((product) => (
            <li key={product.id}>
          
              <button onClick={() => productSelection(product.id)}> 
                 
                {product.name} - {product.count}  <t/>
              </button>
              <t/> <t/> <t/> <t/>
     
              <button onClick={() => setProductToDelete(product.id)}>Remove</button> 
            </li>
          ))}
        </ul>
        <button onClick={openModal}>Add New Product</button>
        </>
      )}
    
      <br/>
      <br/>

  

      <AddProductModal isOpen={isModalOpen} closeModal={closeModal} />
      <ConfirmDeleteModal isOpen={productToDelete !== null} closeModal={closeModal} onConfirm={removeProduct}/>
 
    </div>
  );
};
export default ProductList;
