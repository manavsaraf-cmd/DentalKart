import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../store/cartSlice";
import { addToWishlist, removeFromWishlist } from "../../store/wishlistSlice";

function Productcard({ product }) {
  const dispatch = useDispatch();
  const cartIn = useSelector((state) => state.cart.items);
  const wishlistIn = useSelector((state) => state.wishlist.items);

  let cartAdded = cartIn.some((item) => item.id === product.id);

  let wislistAdded = wishlistIn.some((item) => item.id === product.id);

  function handleAddToCart() {
    if (!cartAdded) {
      dispatch(addToCart(product));
    }
  }

  function handleAddToWishlist() {
    if (!wislistAdded) {
      dispatch(addToWishlist(product));
    } else {
      dispatch(removeFromWishlist(product.id));
    }
  }

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      <Link to={`/product/${product.id}`}>
        <div className="flex h-56 items-center justify-center bg-gray-100 p-4">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link to={`/product/${product.id}`} className="no-underline">
          <h2 className="mb-2 text-lg font-semibold text-gray-800 hover:text-blue-600">
            {product.name}
          </h2>
        </Link>

        <p className="mb-2 text-sm capitalize text-gray-500">
          {product.category}
        </p>

        <div className="mb-2">
          <span className="font-medium text-gray-700">Rating:</span>

          <span className="ml-1 text-yellow-500">⭐ {product.rating}</span>
        </div>

        <p className="mb-4 text-xl font-bold text-gray-900">₹{product.price}</p>

        <div className="mt-auto flex gap-2">
          <button
            onClick={handleAddToCart}
            disabled={cartAdded}
            className="flex-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-blue transition hover:bg-blue-700"
          >
            {!cartAdded ? "Add To Cart" : " Added to Cart"}
          </button>

          <button
            onClick={handleAddToWishlist}
            aria-label={
              wislistAdded ? "Remove from wishlist" : "Add to wishlist"
            }
            aria-pressed={wislistAdded}
            className={`rounded-lg border px-3 py-2 text-xl transition ${
              wislistAdded
                ? "border-red-500 bg-red-50 text-red-600"
                : "border-gray-300 text-gray-700 hover:border-red-500 hover:bg-red-50 hover:text-red-600"
            }`}
          >
            {wislistAdded ? "♥" : "♡"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Productcard;
