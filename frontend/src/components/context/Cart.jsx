import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState(JSON.parse(localStorage.getItem('cart')) || []);

  const addToCart = (product) => {
    let updatedCart = [...cartData];

    if (cartData.length === 0) {
      updatedCart.push({
        id: `${product.id}-${Math.floor(Math.random() * 1000000)}`,
        product_id: product.id,
        title: product.title,
        price: product.price,
        qty: 1,
        image_url: product.image_url
      });
    } else {
      const isProductExists = updatedCart.find((item) => item.product_id === product.id);

      if (isProductExists) {
        updatedCart = updatedCart.map((item) =>
          item.product_id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        updatedCart.push({
          id: `${product.id}-${Math.floor(Math.random() * 1000000)}`,
          product_id: product.id,
          title: product.title,
          price: product.price,
          qty: 1,
          image: product.image
        });
      }
    }

  

    setCartData(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const shipping = () => {
        return 0;
    }

    const subTotal = () => {
        let subtotal = 0
        cartData.map(item => {
            subtotal += item.qty *item.price
        })

        return subtotal
    }

    const grandTotal = () => {
        return subTotal() + shipping()
    }  

  const updateCartItem = (cartItemId, newQty) => {
  let updatedCart = [...cartData];
  
  // هنا كان الخطأ، الآن أصبح صحيحًا:
  updatedCart = updatedCart.map(item => 
    (item.id === cartItemId) ?
    { ...item, qty: newQty } : item
  );

  // تحديث الـ State والـ LocalStorage
  setCartData(updatedCart);
  localStorage.setItem('cart', JSON.stringify(updatedCart));
  };


  const removeFromCart = (cartItemId) => {
    const updatedCart = cartData.filter((item) => item.id !== cartItemId);
    setCartData(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <CartContext.Provider value={{ addToCart, updateCartItem, removeFromCart, cartData , subTotal , shipping , grandTotal }}>
      {children}
    </CartContext.Provider>
  );
};