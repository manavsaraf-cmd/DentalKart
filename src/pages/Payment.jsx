import OrderSummary from "./OrderSummary"
import Checkout from "./Checkout"
import { useLocation } from "react-router-dom"

function Payment(){

    const location = useLocation()
    const formdata = location.state?.formdata
    return(
        <>
        <h1> My payment </h1>
        <p>Name: {formdata?.Name}</p>
            <p>Email: {formdata?.Email}</p>
            <p>Mobile: {formdata?.Mobile}</p>
            <p>Address: {formdata?.Address}</p>
            <p>Payment Method: {formdata?.Payment}</p>
       <OrderSummary/>
        </>
    )
}


export default Payment