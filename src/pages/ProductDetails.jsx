import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";

import { getProductById } from "../api/product";
import { addToCart } from "../store/cartSlice";
import  { addToWishlist , removeFromWishlist } from '../store/wishlistSlice'
import { useAuth } from "../context/AuthContext";

function ProductDetails() {
    const { productid } = useParams();

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const { user, loading: authLoading } = useAuth();

    const cartItems = useSelector(
        (state) => state.cart.items
    );

    const wishlistItems = useSelector(
        (state) => state.wishlist.items
    );

    const {
        data: product,
        isPending,
        isError,
        error
    } = useQuery({
        queryKey: ["product", productid],
        queryFn: () => getProductById(productid),
        enabled: Boolean(productid)
    });

    const isInCart = product
        ? cartItems.some((item) => item.id === product.id)
        : false;

    const isWishlisted = product
        ? wishlistItems.some((item) => item.id === product.id)
        : false;

    function handleAddToCart() {
        if (!product || authLoading || isInCart) {
            return;
        }

       

        dispatch(addToCart(product));
    }

    function handleToggleWishlist() {
        if (!product) {
            return;
        }

        if (isWishlisted) {
            dispatch(removeFromWishlist(product.id));
        } else {
            dispatch(addToWishlist(product));
        }
    }

    if (isPending) {
        return (
            <main className="flex min-h-[60vh] items-center justify-center bg-gray-50 px-4">
                <p className="text-gray-500">
                    Loading product details...
                </p>
            </main>
        );
    }

    if (isError || !product) {
        return (
            <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-gray-50 px-4">
                <h1 className="text-2xl font-bold text-gray-800">
                    Product not found
                </h1>

                <p className="text-center text-gray-500">
                    We couldn't load this product. Please try again.
                </p>

                <Link
                    to="/products"
                    className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white no-underline hover:bg-blue-700"
                >
                    Back to Products
                </Link>

                {isError && (
                    <p className="text-sm text-red-600">
                        {error.message}
                    </p>
                )}
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">

            <div className="mx-auto max-w-7xl">

                <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500">
                    <Link
                        to="/"
                        className="text-blue-600 no-underline hover:text-blue-800"
                    >
                        Home
                    </Link>

                    <span>/</span>

                    <Link
                        to="/products"
                        className="text-blue-600 no-underline hover:text-blue-800"
                    >
                        Products
                    </Link>

                    <span>/</span>

                    <span className="text-gray-700">
                        Product Details
                    </span>
                </div>

                <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                    <div className="grid grid-cols-1 gap-8 p-5 sm:p-8 lg:grid-cols-2 lg:gap-12 lg:p-10">

                        <div className="flex min-h-72 items-center justify-center rounded-xl bg-gray-50 p-6 sm:min-h-96">

                            <img
                                src={product.image}
                                alt={product.name}
                                className="max-h-96 w-full object-contain"
                            />

                        </div>

                        <div className="flex flex-col">

                            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
                                {product.category}
                            </p>

                            <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
                                {product.name}
                            </h1>

                            {product.brand && (
                                <p className="mt-3 text-sm text-gray-500">
                                    Brand: {product.brand}
                                </p>
                            )}

                            <div className="mt-4 flex flex-wrap items-center gap-3">

                                <span className="rounded-full bg-yellow-50 px-3 py-1 text-sm font-medium text-yellow-700">
                                    ⭐ {product.rating ?? "Not rated"}
                                </span>

                                {product.stock > 0 ? (
                                    <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
                                        In stock
                                    </span>
                                ) : (
                                    <span className="rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-red-700">
                                        Out of stock
                                    </span>
                                )}

                            </div>

                            <p className="mt-6 text-3xl font-bold text-gray-900">
                                ₹{product.price}
                            </p>

                            <div className="my-6 border-t border-gray-200" />

                            <h2 className="mb-2 text-lg font-semibold text-gray-800">
                                Product Description
                            </h2>

                            <p className="leading-7 text-gray-600">
                                {product.description ||
                                    "No description is available for this product."}
                            </p>

                            {product.tags?.length > 0 && (
                                <div className="mt-5 flex flex-wrap gap-2">
                                    {product.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row">

                                <button
                                    type="button"
                                    onClick={handleAddToCart}
                                    disabled={
                                        authLoading ||
                                        isInCart ||
                                        product.stock <= 0
                                    }
                                    className={`flex-1 rounded-lg px-5 py-3 font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${
                                        isInCart
                                            ? "bg-gray-200 text-gray-600"
                                            : "bg-blue-600 text-white hover:bg-blue-700"
                                    }`}
                                >
                                    {isInCart
                                        ? "Added to Cart"
                                        : authLoading
                                            ? "Checking account..."
                                            : product.stock <= 0
                                                ? "Out of Stock"
                                                :  "Add to Cart"}
                                </button>

                                <button
                                    type="button"
                                    onClick={handleToggleWishlist}
                                    aria-label={
                                        isWishlisted
                                            ? "Remove from wishlist"
                                            : "Add to wishlist"
                                    }
                                    aria-pressed={isWishlisted}
                                    className={`rounded-lg border px-5 py-3 text-xl transition ${
                                        isWishlisted
                                            ? "border-red-500 bg-red-50 text-red-600"
                                            : "border-gray-300 text-gray-700 hover:border-red-500 hover:bg-red-50 hover:text-red-600"
                                    }`}
                                >
                                    {isWishlisted ? "♥" : "♡"}
                                </button>

                            </div>


                        </div>
                    </div>
                </section>

                <div className="mt-6">
                    <button
                        type="button"
                        onClick={() => navigate("/products")}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                        ← Back to all products
                    </button>
                </div>

            </div>
        </main>
    );
}

export default ProductDetails;