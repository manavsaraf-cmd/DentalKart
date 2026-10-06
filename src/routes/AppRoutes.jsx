import { BrowserRouter , Routes, Route } from 'react-router-dom'
import Wishlist from '../pages/Wishlist.jsx'
import Home from '../pages/Home.jsx'
import Cart from '../pages/Cart.jsx'
import Products from '../pages/Products.jsx'
import Checkout from '../pages/Checkout.jsx'
import Payment from '../pages/Payment.jsx'
import ProductDetails from '../pages/ProductDetails.jsx'

function AppRoutes() {
  return (
    
    
    <Routes>
     
        <Route  path= "/" element={<Home/>}></Route>
        <Route  path= "/products" element={<Products/>}></Route>
        <Route  path= "/wishlist" element={<Wishlist/>}></Route>
        <Route  path= "/cart" element={<Cart/>}></Route>
        <Route path="/checkout" element={<Checkout/>}></Route>
        <Route path="/payment" element={<Payment/>}></Route>
        <Route path="/product/:productid" element={<ProductDetails/>}></Route>

      
    </Routes>
    

    
    
  )
}

export default AppRoutes;
