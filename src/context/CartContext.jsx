import { createContext, useContext, useState } from "react";

const cartContext = createContext();

export function useCart() {
  return useContext(cartContext);
}
function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  function handleAddToCart(product) {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);

      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  }

  function handleRemoveFromCart(productId) {
    setCart((prevCart) => {
      return prevCart.filter((item) => item.id !== productId);
    });
  }

  const addToWishlist = (product) => {
    setWishlist((prev) => {
      const alreadyExists = prev.some((item) => item.id === product.id);
      if (!alreadyExists) {
        return [...prev, product];
      }
      return prev;
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  };

  const reducer = (action) => {
    console.log(action);

    switch (action.type) {
      case "INCREASE_QUANTITY":
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.id === action.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
        break;

      case "DECREASE_QUANTITY":
        setCart((prevCart) =>
          prevCart
            .map((item) =>
              item.id === action.id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0)
        );
        break;

      case "REMOVE_FROM_CART":
        setCart((prevCart) => prevCart.filter((item) => item.id !== action.id));
        break;

      case "CLEAR_CART":
        setCart([]);
        break;

      default:
        console.warn("Unknown action type:", action.type);
    }
  };

  return (
    <cartContext.Provider
      value={{
        cart,
        setCart,
        handleAddToCart,
        handleRemoveFromCart,
        reducer,
        wishlist,
        setWishlist,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}

export default CartProvider;
