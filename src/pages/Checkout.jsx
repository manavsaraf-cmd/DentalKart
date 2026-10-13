import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Checkout() {
    const navigate = useNavigate();
    const location = useLocation();

    const { user, loading } = useAuth();

    const [formdata, setFormData] = useState({
        Name: "",
        Email: "",
        Address: "",
        Mobile: "",
        Payment: ""
    });

    const [error, setError] = useState({});
    const [isCheckingDetails, setIsCheckingDetails] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (loading) {
            return;
        }

        if (!user) {
            navigate("/login", {
                replace: true,
                state: { from: location.pathname }
            });
            return;
        }

        const defaultDetails = {
            Name:
                user.displayName ||
                user.email?.split("@")[0] ||
                "",
            Email: user.email || "",
            Address: "",
            Mobile: "",
            Payment: ""
        };

        const storageKey = `dentalkart_checkout_${user.uid}`;

        let savedDetails = null;

        try {
            const saved = localStorage.getItem(storageKey);

            if (saved) {
                savedDetails = JSON.parse(saved);
            }
        } catch (storageError) {
            console.error(
                "Could not read saved checkout details:",
                storageError
            );
        }

        const currentDetails = {
            ...defaultDetails,
            ...(savedDetails || {})
        };

        setFormData(currentDetails);

        const detailsAreComplete =
            currentDetails.Name.trim() !== "" &&
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                currentDetails.Email.trim()
            ) &&
            currentDetails.Address.trim() !== "" &&
            /^\d{10}$/.test(
                currentDetails.Mobile.trim()
            ) &&
            currentDetails.Payment !== "";

        if (detailsAreComplete) {
            // Reuse saved details and continue to Payment.
            navigate("/payment", {
                replace: true,
                state: { formdata: currentDetails }
            });

            return;
        }

        setIsCheckingDetails(false);
    }, [user, loading, navigate, location.pathname]);

    function handleForm(event) {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }));
    }

    function validateForm() {
        const newErrors = {};

        if (!formdata.Name.trim()) {
            newErrors.Name = "Name is required.";
        }

        if (!formdata.Email.trim()) {
            newErrors.Email = "Email is required.";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                formdata.Email.trim()
            )
        ) {
            newErrors.Email = "Enter a valid email address.";
        }

        if (!formdata.Address.trim()) {
            newErrors.Address = "Delivery address is required.";
        }

        if (!/^\d{10}$/.test(formdata.Mobile.trim())) {
            newErrors.Mobile =
                "Enter a valid 10-digit mobile number.";
        }

        if (!formdata.Payment) {
            newErrors.Payment = "Select a payment method.";
        }

        setError(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (!user) {
            navigate("/login", {
                state: { from: "/checkout" }
            });
            return;
        }

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        const detailsToSave = {
            Name: formdata.Name.trim(),
            Email: formdata.Email.trim(),
            Address: formdata.Address.trim(),
            Mobile: formdata.Mobile.trim(),
            Payment: formdata.Payment
        };

        try {
            const storageKey =
                `dentalkart_checkout_${user.uid}`;

            localStorage.setItem(
                storageKey,
                JSON.stringify(detailsToSave)
            );

            navigate("/payment", {
                state: { formdata: detailsToSave }
            });
        } catch (storageError) {
            console.error(
                "Could not save checkout details:",
                storageError
            );

            setError((previousErrors) => ({
                ...previousErrors,
                storage:
                    "Could not save your details in this browser. Please check your browser storage settings."
            }));

            setIsSubmitting(false);
        }
    }

    if (loading || isCheckingDetails) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center bg-gray-50">
                <p className="text-gray-500">
                    Checking your account and delivery details...
                </p>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Delivery Details
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Enter your delivery information to continue.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
                >
                    {error.storage && (
                        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                            {error.storage}
                        </p>
                    )}

                    <div>
                        <label
                            htmlFor="Name"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Full Name
                        </label>

                        <input
                            id="Name"
                            name="Name"
                            type="text"
                            autoComplete="name"
                            value={formdata.Name}
                            onChange={handleForm}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />

                        {error.Name && (
                            <p className="mt-1 text-sm text-red-600">
                                {error.Name}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="Email"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Email Address
                        </label>

                        <input
                            id="Email"
                            name="Email"
                            type="email"
                            autoComplete="email"
                            value={formdata.Email}
                            onChange={handleForm}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />

                        {error.Email && (
                            <p className="mt-1 text-sm text-red-600">
                                {error.Email}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="Address"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Delivery Address
                        </label>

                        <textarea
                            id="Address"
                            name="Address"
                            rows={3}
                            autoComplete="street-address"
                            value={formdata.Address}
                            onChange={handleForm}
                            placeholder="House number, street, area, city and PIN code"
                            className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />

                        {error.Address && (
                            <p className="mt-1 text-sm text-red-600">
                                {error.Address}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="Mobile"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Mobile Number
                        </label>

                        <input
                            id="Mobile"
                            name="Mobile"
                            type="tel"
                            inputMode="numeric"
                            autoComplete="tel"
                            maxLength={10}
                            value={formdata.Mobile}
                            onChange={handleForm}
                            placeholder="10-digit mobile number"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />

                        {error.Mobile && (
                            <p className="mt-1 text-sm text-red-600">
                                {error.Mobile}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="Payment"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Payment Method
                        </label>

                        <select
                            id="Payment"
                            name="Payment"
                            value={formdata.Payment}
                            onChange={handleForm}
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        >
                            <option value="">
                                Select Payment Method
                            </option>

                            <option value="Card">
                                Card
                            </option>

                            <option value="UPI">
                                UPI
                            </option>
                        </select>

                        {error.Payment && (
                            <p className="mt-1 text-sm text-red-600">
                                {error.Payment}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isSubmitting
                            ? "Saving details..."
                            : "Continue to Payment"}
                    </button>
                </form>
            </div>
        </main>
    );
}

export default Checkout;