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
  const [showMessage, setShowMessage] = useState(null);
  const { user } = useAuth();

  const setCartFromDatabase = (items) => setCart(items);
  const setWishListFromDatabase = (items) => setWishlist(items);

  const showTemporaryMessage = (msg) => {
    setShowMessage(msg);
    setTimeout(() => setShowMessage(null), 2000);
  };

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
      showTemporaryMessage("✅ Added to cart.");
      return updatedCart;
    });
  };

  // ✅ Remove item from cart and Firestore
  const handleRemoveFromCart = (productId) => {
    if (!user) return;

    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== productId);
      deleteItemFromFirestore("cart", user, productId);
      showTemporaryMessage("❌ Removed from cart.");
      return updatedCart;
    });
  };

  // ✅ Add to wishlist and Firestore
  const addToWishlist = (product) => {
    if (!user) return;

    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        showTemporaryMessage("✅ Item already in wishlist.");
        return prev;
      }

      addItemToFirestore("wishlist", user, product);
      showTemporaryMessage("✅ Added to wishlist.");
      return [...prev, product];
    });
  };

  // ✅ Remove from wishlist and Firestore
  const removeFromWishlist = (productId) => {
    if (!user) return;

    setWishlist((prev) => {
      const updated = prev.filter((item) => item.id !== productId);
      deleteItemFromFirestore("wishlist", user, productId);
      showTemporaryMessage("❌ Removed from wishlist.");
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
          showTemporaryMessage("⬆️ Quantity increased.");
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
          showTemporaryMessage("⬇️ Quantity decreased.");
          return updated;
        });
        break;

      case "REMOVE_FROM_CART":
        setCart((prevCart) => {
          const updated = prevCart.filter((item) => item.id !== action.id);
          deleteItemFromFirestore("cart", user, action.id);
          showTemporaryMessage("🗑️ Removed from cart.");
          return updated;
        });
        break;

      case "CLEAR_CART":
        setCart([]);
        clearUserCart(user);
        showTemporaryMessage("🧹 Cart cleared.");
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
