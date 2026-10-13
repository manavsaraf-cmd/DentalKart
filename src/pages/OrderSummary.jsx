import { useSelector } from "react-redux"

function OrderSummary(){


    const cartdata = useSelector((state)=> ( state.cart.items))
    const subtotal = cartdata.reduce((price, item)=> price + item.quantity* item.price , 0)
    const totalTax= subtotal*.18
    const finalPrice=   (subtotal+ totalTax).toFixed(2)
    console.log(cartdata)

    return(

        <>
        
            <p>Subtotal-{subtotal.toFixed(2)}</p>
            <p>Total Tax- {totalTax.toFixed(2)}</p>

             <p>Total price - {finalPrice }</p>
        
        </>
    )
}

export default OrderSummary