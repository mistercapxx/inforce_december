import { configureStore } from '@reduxjs/toolkit';

let productId = 1; ///for new products id

const initialProductsState = {
    products:[],
    isLoading:false,
};
const initialCommentsState = {
    comments: [],
};


const productsReducer = (state = initialProductsState,action) => {
    switch(action.type) {
        case 'products/setProducts':
            return {...state,
                products:action.payload};
            case 'products/addProduct':
                return {...state,
                    products:[...state.products,{...action.payload,id:productId++}]}; /// + new id parameter
                    case 'products/removeProduct':
                        return {...state,
                        products: state.products.filter(product =>product.id !== action.payload)};
                        case 'products/updateProduct':
                            return {...state,
                            products:state.products.map(product => product.id === action.payload.id ? 
                                action.payload : product
                                ),
                            }
                            default:
                                return state;
    };
};


const commentsReducer = (state = initialCommentsState, action) => {
    switch(action.type)
    {
        case 'comments/addComment':
            return {...state,
            comments: [...state.comments, action.payload]};
            case 'comments/removeComment':
                return {...state,
                comments:state.comments.filter(comment => comment.id !== action.payload)};
                default:
                    return state;
    }
}

const store = configureStore({
    reducer:{
        products:productsReducer,
        comments:commentsReducer,
    },
});

export default store;