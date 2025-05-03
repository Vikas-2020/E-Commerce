import { getFirestore, doc, setDoc, deleteDoc, collection, getDocs } from "firebase/firestore";

const db = getFirestore();

//add placed order to firestore
export async function placeOrders(orderData, user){
  
}

// Add item to cart or wishlist
export async function addItemToFirestore(collectionName, user, product) {
  const docRef = doc(db, collectionName, `${user.uid}_${product.id}`);
  const itemToSave = {
    ...product,
    userId: user.uid,
  };
  await setDoc(docRef, itemToSave);
}

// Delete an item (from cart or wishlist)
export async function deleteItemFromFirestore(collectionName, user, productId) {
  const docRef = doc(db, collectionName, `${user.uid}_${productId}`);
  await deleteDoc(docRef);
}

// Decrease item quantity in cart or remove if quantity becomes 0
export async function decreaseItemQuantity(collectionName, user, product) {
  const docRef = doc(db, collectionName, `${user.uid}_${product.id}`);

  if (product.quantity > 1) {
    const updatedProduct = {
      ...product,
      quantity: product.quantity - 1,
    };
    await setDoc(docRef, updatedProduct); // update quantity
  } else {
    await deleteDoc(docRef); // remove item if quantity hits 0
  }
}

// Clear entire cart (delete all user's cart docs)
export async function clearUserCart(user) {
  const cartCollectionRef = collection(db, "cart");
  const snapshot = await getDocs(cartCollectionRef);

  const deletePromises = [];
  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    if (data.userId === user.uid) {
      deletePromises.push(deleteDoc(doc(db, "cart", docSnap.id)));
    }
  });

  await Promise.all(deletePromises);
}
