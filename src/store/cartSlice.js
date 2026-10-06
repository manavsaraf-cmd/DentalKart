import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items:[]
}

const cartSlice = createSlice( { 

    name: 'cart' , 
    initialState,
    reducers: {
        addToCart: (state , action )=> {
            const incCarts = state.items.find((incCart)=>incCart.id===action.payload.id)
            if(!incCarts){
                state.items.push({...action.payload, quantity:1})
            }
            else{ incCarts.quantity += 1}
            } , 
        removeFromCart:(state, action )=> {state.items=state.items.filter((item)=>item.id!==action.payload)
        },
        increaseToCart: (state , action)=> {
            const increaseCarts=state.items.find((increaseCart)=> increaseCart.id===action.payload.id)
            if(increaseCarts){
                increaseCarts.quantity +=1
            }
        } , 
        decreaseFromCart:(state ,action)=> {
            const decreaseCarts=state.items.find((decreaseCart)=> decreaseCart.id===action.payload.id)
            if(decreaseCarts.quantity>=1){
                decreaseCarts.quantity -=1
            }

        }
    }

})

export const {
    addToCart,
    removeFromCart , increaseToCart , decreaseFromCart
  } = cartSlice.actions
  
  export default cartSlice.reducer


    
