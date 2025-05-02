import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function LoadCartOnLogin() {
  const { user } = useAuth();
  const { setCartFromDatabase, setWishListFromDatabase } = useCart();
  const db = getFirestore();
  const hasFetched = useRef(false); // Ensures fetch runs only once

  useEffect(() => {
    async function fetchUserData() {
      if (!user || hasFetched.current) return;

      try {
        console.log("here");
        // Fetch Cart
        const cartQuery = query(collection(db, "cart"), where("userId", "==", user.uid));
        const cartSnapshot = await getDocs(cartQuery);
        const cartItems = cartSnapshot.docs.map((doc) => doc.data());
        setCartFromDatabase(cartItems);

        // Fetch Wishlist
        const wishlistQuery = query(collection(db, "wishlist"), where("userId", "==", user.uid));
        const wishlistSnapshot = await getDocs(wishlistQuery);
        const wishlistItems = wishlistSnapshot.docs.map((doc) => doc.data());
        setWishListFromDatabase(wishlistItems);

        hasFetched.current = true;
      } catch (error) {
        console.error("Failed to load cart or wishlist from Firestore:", error);
      }
    }

    fetchUserData();
  }, [user, db]);

  return null;
}

export default LoadCartOnLogin;
