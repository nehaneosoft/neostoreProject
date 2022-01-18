

export const addToCart = (_id,productName,productImage,productProducer,productCost,productStock,quantity) =>(dispatch,getState)=> {
   var cartItem = {
       _id,
       productName,
       productImage,
       productProducer,
       productCost,
       productStock,
       quantity:Number(quantity),
       totalPrice : quantity * productCost
    
   };

   if(cartItem.quantity > 10)
   {
       alert(`You can only add 10 ${cartItem.productName}`);
   }else{
       if(cartItem.quantity < 1 ){
        dispatch({type: 'DELETE_FROM_CART', payload:_id})
       }else{
        dispatch({type:"ADD_TO_CART",payload:cartItem});
        localStorage.setItem("cartItems", JSON.stringify(getState().cartReducer.cartItems));

       }
   

   }
};

export const deleteFromCart = (_id) => (dispatch,getState) => {
    dispatch({type: 'DELETE_FROM_CART', payload:_id})
    const cartItems = getState().cartReducer.cartItems
    localStorage.setItem('cartItems',JSON.stringify(cartItems));
}