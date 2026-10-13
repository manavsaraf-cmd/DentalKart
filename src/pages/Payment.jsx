import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import OrderSummary from "./OrderSummary";

function Payment() {
    const location = useLocation();
    const navigate = useNavigate();

    const { user, loading } = useAuth();

    const cartItems = useSelector(
        (state) => state.cart.items
    );

    const [formdata, setFormData] = useState(
        location.state?.formdata || null
    );

    const [demoMessage, setDemoMessage] = useState("");

    useEffect(() => {
        if (loading) return;

        if (!user) {
            navigate("/login", {
                replace: true,
                state: { from: "/checkout" }
            });
            return;
        }

        if (location.state?.formdata) {
            setFormData(location.state.formdata);
            return;
        }

        // Recover details if the page was refreshed.
        try {
            const savedDetails = localStorage.getItem(
                `dentalkart_checkout_${user.uid}`
            );

            if (savedDetails) {
                setFormData(JSON.parse(savedDetails));
            } else {
                navigate("/checkout", { replace: true });
            }
        } catch (error) {
            console.error("Could not load checkout details:", error);
            navigate("/checkout", { replace: true });
        }
    }, [user, loading, location.state, navigate]);

    const paymentMethod = (formdata?.Payment || "Not selected")
        .toUpperCase();

    if (loading || !user || !formdata) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-gray-50">
                <p className="text-gray-500">
                    Preparing your payment page...
                </p>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">

            <div className="mx-auto max-w-7xl">

                <div className="mb-8">
                    <Link
                        to="/checkout"
                        className="text-sm font-medium text-blue-600 no-underline hover:text-blue-800"
                    >
                        ← Back to Checkout
                    </Link>

                    <h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                        Review Your Order
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Check your delivery information and payment method.
                    </p>
                </div>

                <div className="mb-8 grid grid-cols-3 gap-3">

                    <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-center">
                        <p className="text-sm font-semibold text-green-700">
                            ✓ Cart
                        </p>
                    </div>

                    <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-center">
                        <p className="text-sm font-semibold text-green-700">
                            ✓ Delivery
                        </p>
                    </div>

                    <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-center">
                        <p className="text-sm font-semibold text-blue-700">
                            3. Payment
                        </p>
                    </div>

                </div>

                <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">

                    <div className="space-y-6 lg:col-span-2">

                       
                        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

                            <div className="mb-6 flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-2xl">
                                    📍
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">
                                        Delivery Address
                                    </h2>

                                    <p className="text-sm text-gray-500">
                                        Your delivery information
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Full Name
                                    </p>

                                    <p className="mt-1 font-semibold text-gray-800">
                                        {formdata.Name}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Email Address
                                    </p>

                                    <p className="mt-1 break-all font-medium text-gray-800">
                                        {formdata.Email}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Delivery Address
                                    </p>

                                    <p className="mt-1 font-medium text-gray-800">
                                        {formdata.Address}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Mobile Number
                                    </p>

                                    <p className="mt-1 font-medium text-gray-800">
                                        {formdata.Mobile}
                                    </p>
                                </div>

                            </div>

                            <Link
                                to="/checkout"
                                className="mt-6 inline-block text-sm font-semibold text-blue-600 no-underline hover:text-blue-800"
                            >
                                Edit Details
                            </Link>

                        </section>

                        {/* Payment method */}
                        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

                            <div className="mb-5 flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-2xl">
                                    💳
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">
                                        Payment Method
                                    </h2>

                                    <p className="text-sm text-gray-500">
                                        Your selected payment option
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between rounded-xl border border-blue-200 bg-blue-50 p-4">
                                <div>
                                    <p className="font-semibold text-gray-900">
                                        {paymentMethod}
                                    </p>

                                    <p className="mt-1 text-sm text-gray-600">
                                        Selected during checkout
                                    </p>
                                </div>

                                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                                    Selected
                                </span>
                            </div>

                            

                        </section>

                    </div>

                    {/* Right side */}
                    <aside className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:sticky lg:top-6">

                        <h2 className="text-xl font-bold text-gray-900">
                            Order Summary
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Review your final order total.
                        </p>

                        {/* Your existing summary component */}
                        <div className="mt-5">
                            <OrderSummary />
                        </div>

                        {cartItems.length === 0 && (
                            <p className="mt-4 text-sm text-red-600">
                                Your cart is empty.
                            </p>
                        )}

                        <button
                            type="button"
                            disabled={cartItems.length === 0}
                            onClick={() =>
                                setDemoMessage(
                                    "Demo only: no payment was processed and no order was created."
                                )
                            }
                            className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Simulate Payment
                        </button>

                        {demoMessage && (
                            <p
                                role="status"
                                className="mt-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-800"
                            >
                                {demoMessage}
                            </p>
                        )}

                        

                    </aside>

                </div>
            </div>
        </main>
    );
}

export default Payment;