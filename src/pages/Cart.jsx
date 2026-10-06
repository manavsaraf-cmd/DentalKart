import {  useDispatch, useSelector } from "react-redux";
import { removeFromCart , increaseToCart  , decreaseFromCart} from "../store/cartSlice";
import { useNavigate } from "react-router-dom";
import OrderSummary from "./OrderSummary";

function Cart(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cartdata = useSelector((state) => state.cart.items);


    return (


<>
        
        {cartdata.map((iData)=> (
        <div key = 
                    {iData.id}>
                    <img src={iData.image}
                    alt ={iData.name}/>
                    {iData.name}({iData.category}) 
                    {iData.price}

                    <button   className="rounded-lg border border-red-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:border-blue-600 hover:bg-blue-100" onClick={()=>dispatch(increaseToCart(iData))}>
                    +
                    </button>
                     <span>{iData.quantity}</span>

                     <button  className="rounded-lg border border-red-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:border-red-600 hover:bg-red-100" onClick={()=>dispatch(decreaseFromCart(iData))}>
                    -
                    </button>

                     <button className="rounded-lg border border-red-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:border-red-600 hover:bg-red-100" onClick={()=> dispatch(removeFromCart(iData.id))}> Remove</button></div>) )}
                     
    <OrderSummary></OrderSummary>
    <button onClick={()=>navigate('/checkout')}>Check Out</button>

</>
        
    )
}

export default Cart;