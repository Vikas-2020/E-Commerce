import Header from "../components/Header"
import Footer from "../components/Footer"
import { Outlet } from "react-router-dom"
import LoadCartOnLogin from "../components/LoadCartOnLogin"

function First() {
  return (
   <>
   <LoadCartOnLogin />
   <Header />
   <Outlet />
   <Footer />
   </>
  )
}

export default First