import {Link, useNavigate} from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
function Header(){

    const {user , loading , logout} = useAuth()
    const [logoutError , setLogoutError] = useState("")
    const navigate= useNavigate()
    const linkStyle =
        "text-sm font-medium text-gray-700 transition hover:text-blue-600";

       async function handleLogout() {

        setLogoutError("");

        try {
            await logout();
            navigate("/");
        } catch (error) {
            console.error("Logout error:", error);

            setLogoutError(
                "Unable to log out. Please try again."
            );
        }
    }

    return (
<header className="border-b border-gray-200 bg-white shadow-sm border-blue-500 ">
    
    <nav className="mx-auto flex max-w-7xl flex-wrap  items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8 ">

    <Link  to="/"  className="text-xl font-bold text-blue-600 no-underline"  >DentalKart  </Link>
        <div className="flex flex-wrap items-center gap-4">
        <Link to="/" className={linkStyle} > Home  </Link> 
        <Link to="/products" className={linkStyle} > Products </Link>
        <Link to="/wishlist" className={linkStyle} > Wishlist </Link>
        <Link to="/cart" className={linkStyle}> Cart </Link>

        {loading ? (
                        <span className="text-sm text-gray-500">
                            Checking account...
                        </span>
                    ) : user ? (
                        <>
                            <span
                                className="max-w-40 truncate text-sm text-blue-600 font-bold"
                                title={user.name || ""}
                            >
                                {user.displayName || "Signed in"}
                            </span>

                            <button
                                type="button"
                                onClick={handleLogout}
                                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                           

                            <Link
                                to="/signup"
                                className={linkStyle}
                            >
                                Sign Up
                            </Link>

                            <Link
                                to="/login"
                                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white no-underline transition hover:bg-blue-700"
                            >
                                Login
                            </Link>
                        </>
                    )}
       </div>
    </nav>
    {logoutError && (
                <p className="mx-auto max-w-7xl px-4 pb-3 text-sm text-red-600">
                    {logoutError}
                </p>
            )}

</header>

    )
}

export default Header;