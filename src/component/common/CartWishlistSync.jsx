// src/components/CartWishlistSync.jsx

import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useAuth } from "../../context/AuthContext"

import { addToCart, removeFromCart } from "../../store/cartSlice"
import { addToWishlist, removeFromWishlist } from "../../store/wishlistSlice"

function CartWishlistSync() {
    const dispatch = useDispatch()
    const { user, loading } = useAuth()

    const cartItems = useSelector((state) => state.cart.items)
    const wishlistItems = useSelector((state) => state.wishlist.items)

    const lastLoadedUid = useRef(null)

    
    useEffect(() => {
        if (loading) {
            return
        }

        const uid = user?.uid || "guest"

        if (lastLoadedUid.current === uid) {
            return
        }

        lastLoadedUid.current = uid

        cartItems.forEach((item) => dispatch(removeFromCart(item.id)))
        wishlistItems.forEach((item) => dispatch(removeFromWishlist(item.id)))

        try {
            const savedCart = localStorage.getItem(`dentalkart_cart_${uid}`)
            if (savedCart) {
                JSON.parse(savedCart).forEach((item) => dispatch(addToCart(item)))
            }
        } catch (err) {
            console.error("Could not load saved cart:", err)
        }

        try {
            const savedWishlist = localStorage.getItem(`dentalkart_wishlist_${uid}`)
            if (savedWishlist) {
                JSON.parse(savedWishlist).forEach((item) => dispatch(addToWishlist(item)))
            }
        } catch (err) {
            console.error("Could not load saved wishlist:", err)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, loading])

    // SAVE: whenever cart changes, save it under the current user's key
    useEffect(() => {
        if (loading) {
            return
        }

        const uid = user?.uid || "guest"

        try {
            localStorage.setItem(`dentalkart_cart_${uid}`, JSON.stringify(cartItems))
        } catch (err) {
            console.error("Could not save cart:", err)
        }
    }, [cartItems, user, loading])

    // SAVE: whenever wishlist changes, save it under the current user's key
    useEffect(() => {
        if (loading) {
            return
        }

        const uid = user?.uid || "guest"

        try {
            localStorage.setItem(`dentalkart_wishlist_${uid}`, JSON.stringify(wishlistItems))
        } catch (err) {
            console.error("Could not save wishlist:", err)
        }
    }, [wishlistItems, user, loading])

    return null // renders nothing, just runs side effects
}

export default CartWishlistSync