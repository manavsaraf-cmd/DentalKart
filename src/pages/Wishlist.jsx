import { useDispatch , useSelector } from "react-redux";
import { removeFromWishlist } from "../store/wishlistSlice";
function Wishlist(){
 
    const wishlistdata = useSelector((state)=> state.wishlist.items)

    const dispatch = useDispatch();


    return (

<>
   
    {wishlistdata.map((wishlistsItems)=> 
    <div key={wishlistsItems.id}>
        <img src={wishlistsItems.image}
        alt ={wishlistsItems.name}/>
        {wishlistsItems.name}({wishlistsItems.category})
    <button className="rounded-lg border border-red-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:border-red-600 hover:bg-red-100" onClick={() => dispatch(removeFromWishlist(wishlistsItems.id))}> Remove </button></div>)}
    

</>
        
    )
}

export default Wishlist;