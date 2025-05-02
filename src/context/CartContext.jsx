import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";
import {
  addItemToFirestore,
  deleteItemFromFirestore,
  decreaseItemQuantity,
  clearUserCart,
} from "../utils/firebaseUtils";

const cartContext = createContext();

export function useCart() {
  return useContext(cartContext);
}

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const { user } = useAuth();

  const setCartFromDatabase = (items) => setCart(items);
  const setWishListFromDatabase = (items) => setWishlist(items);

  // ✅ Add item to cart and Firestore
  const handleAddToCart = (product) => {
    if (!user) return;

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);

      const updatedCart = existing
        ? prevCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prevCart, { ...product, quantity: 1 }];

      const updatedProduct = existing
        ? { ...existing, quantity: existing.quantity + 1 }
        : { ...product, quantity: 1 };

      addItemToFirestore("cart", user, updatedProduct);
      return updatedCart;
    });
  };

  // ✅ Remove item from cart and Firestore
  const handleRemoveFromCart = (productId) => {
    if (!user) return;

    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== productId);
      deleteItemFromFirestore("cart", user, productId);
      return updatedCart;
    });
  };

  // ✅ Add to wishlist and Firestore
  const addToWishlist = (product) => {
    if (!user) return;

    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 2000);
        return prev;
      }

      addItemToFirestore("wishlist", user, product);
      return [...prev, product];
    });
  };

  // ✅ Remove from wishlist and Firestore
  const removeFromWishlist = (productId) => {
    if (!user) return;

    setWishlist((prev) => {
      const updated = prev.filter((item) => item.id !== productId);
      deleteItemFromFirestore("wishlist", user, productId);
      return updated;
    });
  };

  // ✅ Reducer with Firestore sync
  const reducer = (action) => {
    switch (action.type) {
      case "INCREASE_QUANTITY":
        setCart((prevCart) => {
          const updated = prevCart.map((item) =>
            item.id === action.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
          const product = prevCart.find((i) => i.id === action.id);
          if (product) {
            addItemToFirestore("cart", user, {
              ...product,
              quantity: product.quantity + 1,
            });
          }
          return updated;
        });
        break;

      case "DECREASE_QUANTITY":
        setCart((prevCart) => {
          const product = prevCart.find((i) => i.id === action.id);
          const updated = prevCart
            .map((item) =>
              item.id === action.id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0);

          if (product) {
            decreaseItemQuantity("cart", user, product);
          }
          return updated;
        });
        break;

      case "REMOVE_FROM_CART":
        setCart((prevCart) => {
          const updated = prevCart.filter((item) => item.id !== action.id);
          deleteItemFromFirestore("cart", user, action.id);
          return updated;
        });
        break;

      case "CLEAR_CART":
        setCart([]);
        clearUserCart(user);
        break;

      default:
        console.warn("Unknown reducer action:", action.type);
    }
  };

  const value = {
    cart,
    setCart,
    handleAddToCart,
    handleRemoveFromCart,
    reducer,
    wishlist,
    setWishlist,
    addToWishlist,
    removeFromWishlist,
    setCartFromDatabase,
    setWishListFromDatabase,
    showMessage,
  };

  return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
}

export default CartProvider;
