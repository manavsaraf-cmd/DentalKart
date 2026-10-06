import { createSlice } from "@reduxjs/toolkit";

const initialState= { items:[]}

const wishlistSlice= createSlice({
    name: 'wishlist' , 
    initialState , 
    reducers: {
        addToWishlist : (state ,action)=> {
            const itemcheck= state.items.find((wishlistCheck)=> wishlistCheck.id===action.payload.id)
            if(!itemcheck){
                state.items.push(action.payload)
            }
            
           },
        removeFromWishlist:(state, action)=> {state.items =state.items.filter((itemsWishlist)=> itemsWishlist.id!==action.payload)}
    }
})

export const{ addToWishlist , removeFromWishlist} = wishlistSlice.actions

export default wishlistSlice.reducer