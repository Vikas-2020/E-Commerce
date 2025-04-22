import React, { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import First from "./pages/First";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Notfound from "./pages/Notfound";
import Singleproduct from "./pages/Singleproduct";
import CartProvider from "./context/CartContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <First />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path:"/home",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/products/:id",
        element: <Singleproduct />,
      },
      {
        path: "*",
        element: <Notfound />,
      },
    ],
  },
]);

function App() {

  useEffect(() => {
    // Clear localStorage on full reload
    localStorage.clear();
  }, []);

  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;
