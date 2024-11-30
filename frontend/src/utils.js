export const addToCart = async(book, setShoppingCart) => {
    let shoppingCart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    if (!shoppingCart) {
        shoppingCart = [];
    }
    book.quantity = 1;
    shoppingCart.push(book);
    setShoppingCart((prevCart) => [...prevCart, book]);
    sessionStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
    return shoppingCart;
}
export const removeFromCart = async(bookId, setShoppingCart) => {
    let shoppingCart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    if (!shoppingCart) {
      shoppingCart = [];
    }
    shoppingCart = shoppingCart.filter(book => book._id !== bookId);
    setShoppingCart((prevCart) => prevCart.filter((book) => book._id !== bookId));
    sessionStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
}
  
export const addQuantity = (bookId, shoppingCart, setShoppingCart) => {
    const newCart = shoppingCart.map((book) => {
      if (book._id === bookId) {
        return { ...book, quantity: book.quantity + 1 };
      }
      return book;
    });
    setShoppingCart(newCart);
    sessionStorage.setItem('shoppingCart', JSON.stringify(newCart));
  };
export const removeQuantity = (bookId, shoppingCart, setShoppingCart) => {
    const newCart = shoppingCart.map((book) => {
      if (book._id === bookId && book.quantity > 1) {
        return { ...book, quantity: book.quantity - 1 };
      }
      return book;
    });
    setShoppingCart(newCart);
    sessionStorage.setItem('shoppingCart', JSON.stringify(newCart));
  };
