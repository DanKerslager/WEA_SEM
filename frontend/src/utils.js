export const addToCart = async(book, setShoppingCart) => {
    let shoppingCart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    if (!shoppingCart) {
        shoppingCart = [];
    }
    shoppingCart.push(book);
    setShoppingCart((prevCart) => [...prevCart, book]);
    sessionStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
}
export const removeFromCart = async(bookId, setShoppingCart) => {
    let shoppingCart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    if (!shoppingCart) {
      shoppingCart = [];
    }
    shoppingCart = shoppingCart.filter(book => book._id !== bookId);
    
    sessionStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
}