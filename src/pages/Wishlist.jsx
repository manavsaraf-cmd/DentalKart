import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { removeFromWishlist } from "../store/wishlistSlice";
import { addToCart } from "../store/cartSlice";
import { useAuth } from "../context/AuthContext";

function Wishlist() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const wishlistItems = useSelector(
        (state) => state.wishlist.items
    );

    const cartItems = useSelector(
        (state) => state.cart.items
    );

    const { user, loading } = useAuth();

    const userName =
        user?.displayName ||
        user?.email?.split("@")[0];

    function handleRemove(productId) {
        dispatch(removeFromWishlist(productId));
    }

    function handleAddToCart(product) {
        

        const isAlreadyInCart = cartItems.some(
            (item) => item.id === product.id
        );

        if (!isAlreadyInCart) {
            dispatch(addToCart(product));
        }
    }

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">

            <div className="mx-auto max-w-7xl">

              
                <section className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

                    <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl text-center">
                        {userName
                            ? `${userName}'s Wishlist`
                            : "My Wishlist"}
                    </h1>

                    <p className="mt-2 text-sm text-gray-500 text-center">
                        {wishlistItems.length === 1
                            ? "You have 1 saved product."
                            : `You have ${wishlistItems.length} saved products.`}
                    </p>

                </section>


               
                {wishlistItems.length === 0 ? (
                    <div className="rounded-xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">

                        <div className="mb-4 text-5xl text-gray-300">
                            ♡
                        </div>

                        <h2 className="mb-2 text-xl font-semibold text-gray-800">
                            Your wishlist is empty
                        </h2>

                        <p className="mb-6 text-gray-500">
                            Save your favourite products here for later.
                        </p>

                        <Link
                            to="/products"
                            className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white no-underline transition hover:bg-blue-700"
                        >
                            Explore Products
                        </Link>

                    </div>
                ) : (

                   
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                        {wishlistItems.map((product) => {

                            const isInCart = cartItems.some(
                                (item) => item.id === product.id
                            );

                            return (
                                <article
                                    key={product.id}
                                    className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
                                >

                                    {/* Product image */}
                                    <Link
                                        to={`/product/${product.id}`}
                                        className="block"
                                    >
                                        <div className="flex h-52 items-center justify-center bg-gray-100 p-4">

                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="h-full w-full object-contain"
                                            />

                                        </div>
                                    </Link>


                                    {/* Product information */}
                                    <div className="flex flex-1 flex-col p-4">

                                        <Link
                                            to={`/product/${product.id}`}
                                            className="no-underline"
                                        >
                                            <h2 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-800 hover:text-blue-600">
                                                {product.name}
                                            </h2>
                                        </Link>

                                        <p className="mb-2 text-sm capitalize text-gray-500">
                                            {product.category}
                                        </p>

                                        {product.rating != null && (
                                            <p className="mb-3 text-sm text-yellow-600">
                                                ⭐ {product.rating}
                                            </p>
                                        )}

                                        <p className="mb-5 text-xl font-bold text-gray-900">
                                            ₹{product.price}
                                        </p>


                                       
                                        <div className="mt-auto flex gap-2">

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleAddToCart(product)
                                                }
                                                disabled={
                                                    loading || isInCart
                                                }
                                                className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
                                                    isInCart
                                                        ? "cursor-not-allowed bg-gray-300 text-gray-600"
                                                        : "bg-blue-600 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                                                }`}
                                            >
                                                {isInCart
                                                    ? "Added to Cart"
                                                    : "Add to Cart"}
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleRemove(product.id)
                                                }
                                                aria-label={`Remove ${product.name} from wishlist`}
                                                className="rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                                            >
                                                Remove
                                            </button>

                                        </div>

                                    </div>
                                </article>
                            );
                        })}

                    </div>
                )}

            </div>
        </main>
    );
}

export default Wishlist;