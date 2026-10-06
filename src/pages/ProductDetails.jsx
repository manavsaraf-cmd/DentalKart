import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import data from "../data/productitems"
import { addToCart } from "../store/cartSlice"
import { addToWishlist } from "../store/wishlistSlice"
function ProductDetails() {
    const dispatch = useDispatch()
    const {productid}=useParams()
    const product= data.find((item)=> item.id===Number(productid))
    if(!product){
        <p>Sorry Product is not found</p>}
    return (
        <>
      
      
       <p>Product Details</p>
       {product.name}({product.category}){product.Price}
       <button onClick={()=>dispatch(addToCart(product))} >Add To Cart</button>
       <button onClick={()=>dispatch(addToWishlist(product))} >Add To Wishlist</button>
        

    
        </>
    )
}

export default ProductDetails