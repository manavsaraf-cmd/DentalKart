import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate , useLocation} from "react-router-dom";

import {
    removeFromCart,
    increaseToCart,
    decreaseFromCart
} from "../store/cartSlice";

import OrderSummary from "./OrderSummary";
import { useAuth } from "../context/AuthContext";

function Cart() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation()

    const cartItems = useSelector(
        (state) => state.cart.items
    );

    const { user, loading } = useAuth();

    const userName =
        user?.displayName ||
        user?.email?.split("@")[0];

    function handleCheckout() {
        if (loading || cartItems.length === 0) {
            return;
        }

        if (!user) {
            navigate("/login", {
                state: { from: "/checkout" }
            });
            return;
        }

        navigate("/checkout");
    }

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">

               
                <section className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm text-center">
                    <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
                        {userName
                            ? `${userName}'s Cart`
                            : "My Cart"}
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        {cartItems.length}{" "}
                        {cartItems.length === 1
                            ? "item"
                            : "items"}{" "}
                        in your cart
                    </p>
                </section>

                {cartItems.length === 0 ? (
                   
                    <section className="rounded-xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
                        <div className="mb-4 text-5xl text-gray-300">
                            🛒
                        </div>

                        <h2 className="mb-2 text-xl font-semibold text-gray-800">
                            Your cart is empty
                        </h2>

                        <p className="mb-6 text-gray-500">
                            Discover products and add your favourites.
                        </p>

                        <Link
                            to="/products"
                            className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white no-underline transition hover:bg-blue-700"
                        >
                            Explore Products
                        </Link>
                    </section>
                ) : (
                    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">

                       
                        <section className="space-y-4 lg:col-span-2">
                            {cartItems.map((item) => (
                                <article
                                    key={item.id}
                                    className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
                                >
                                    <Link
                                        to={`/product/${item.id}`}
                                        className="flex h-36 w-full shrink-0 items-center justify-center rounded-lg bg-gray-100 p-3 sm:w-36"
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="h-full w-full object-contain"
                                        />
                                    </Link>

                                    <div className="flex flex-1 flex-col">
                                        <Link
                                            to={`/product/${item.id}`}
                                            className="font-semibold text-gray-800 no-underline hover:text-blue-600"
                                        >
                                            {item.name}
                                        </Link>

                                        <p className="mt-1 text-sm capitalize text-gray-500">
                                            {item.category}
                                        </p>

                                        <p className="mt-2 text-lg font-bold text-gray-900">
                                            ₹{item.price}
                                        </p>

                                        <div className="mt-4 flex flex-wrap items-center gap-3">
                                            <span className="text-sm text-gray-600">
                                                Quantity:
                                            </span>

                                            <button
                                                type="button"
                                                disabled={item.quantity <= 1}
                                                onClick={() =>
                                                    dispatch(
                                                        decreaseFromCart(item)
                                                    )
                                                }
                                                aria-label={`Decrease ${item.name} quantity`}
                                                className="rounded-md border border-gray-300 px-3 py-1 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                                            >
                                                −
                                            </button>

                                            <span className="min-w-6 text-center font-medium">
                                                {item.quantity}
                                            </span>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    dispatch(
                                                        increaseToCart(item)
                                                    )
                                                }
                                                aria-label={`Increase ${item.name} quantity`}
                                                className="rounded-md border border-gray-300 px-3 py-1 hover:bg-gray-100"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex flex-row items-center justify-between gap-3 sm:flex-col sm:items-end">
                                        <p className="font-bold text-gray-900">
                                            ₹
                                            {(
                                                item.price *
                                                item.quantity
                                            ).toFixed(2)}
                                        </p>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                dispatch(
                                                    removeFromCart(item.id)
                                                )
                                            }
                                            className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </article>
                            ))}

                            <Link
                                to="/products"
                                className="inline-block pt-2 text-sm font-medium text-blue-600 no-underline hover:text-blue-800"
                            >
                                ← Continue Shopping
                            </Link>
                        </section>

                        {/* Order summary */}
                        <aside className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm lg:sticky lg:top-6">
                            <h2 className="mb-4 text-xl font-bold text-gray-800">
                                Order Summary
                            </h2>

                            <OrderSummary />

                            <button
                                type="button"
                                disabled={loading || cartItems.length === 0}
                                onClick={handleCheckout}
                                className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {loading
                                    ? "Checking account..."
                                    : "Proceed to Checkout"}
                            </button>

                            {!user && !loading && (
                                <p className="mt-3 text-center text-xs text-gray-500">
                                    You'll need to log in before checkout.
                                </p>
                            )}
                        </aside>
                    </div>
                )}
            </div>
        </main>
    );
}

export default Cart;