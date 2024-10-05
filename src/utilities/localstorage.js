const getStoredCart = () =>{
    const storedCartString = localStorage.getItem('cart')
    if(storedCartString){
        return JSON.parse(storedCartString)
    }
    return [];
}
const saveCartToL= cart =>{
    const cartStringified = JSON.stringify(cart);
localStorage.setItem('cart',cartStringified);
}

const addToLs = id =>{
    const cart = getStoredCart();
    cart.push(id);
    saveCartToL(cart);
}
const removeFromLs = id =>{
    const cart = getStoredCart();
    const remaining = cart.filter(idx =>idx !== id);
    saveCartToL(remaining);
}

export {addToLs,getStoredCart,removeFromLs}