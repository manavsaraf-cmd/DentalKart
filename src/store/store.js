import cartReducer from './cartSlice.js'
import wishlistReducer from './wishlistSlice.js'
import { configureStore } from '@reduxjs/toolkit'

const store= configureStore({
    reducer:{
        cart: cartReducer ,
        wishlist:wishlistReducer
    }
})

export default store