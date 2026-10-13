import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Productcard from "../component/common/Productcard";
import { getProducts } from "../api/product";
import { Link } from "react-router-dom";

function Home(){

    const navigate = useNavigate()

    const {data ,
         isPending,
        isError,
        error} = useQuery({
        queryKey: ["Home-Products"], 
        queryFn: ()=> getProducts({
            limit:12 ,
            skip :0
        })
    })
    
    const products = data?.products??[]
   

    return (
 

        <main className="min-h-screen bg-gray-50">


        <section className="bg-blue-600 px-4 py-16 text-white sm:py-20">
            <div className="mx-auto max-w-7xl text-center">

                <h1 className="mb-4 text-3xl font-bold sm:text-5xl">
                    Welcome to DentalKart
                </h1>

                <p className="mx-auto mb-8 max-w-2xl text-base text-blue-100 sm:text-lg">
                    Your one-stop store for dental care
                    products and everyday essentials.
                </p>

                <Link
                    to="/products"
                    className="inline-block rounded-lg bg-white px-6 py-3 font-semibold text-blue-700 no-underline transition hover:bg-gray-300"
                >
                    Explore All Products
                </Link>

            </div>
        </section>


      
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">

                <div>
                    <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                        Featured Products
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        Discover products selected for you.
                    </p>
                </div>

                <Link
                    to="/products"
                    className="font-medium text-blue-600 no-underline hover:text-blue-800"
                >
                    View All →
                </Link>

            </div>


          
            {isPending && (
                <p className="py-10 text-center text-gray-500">
                    Loading products...
                </p>
            )}


          
            {isError && (
                <p className="py-10 text-center text-red-600">
                    Failed to load products: {error.message}
                </p>
            )}


   
            {!isPending && !isError && (
                products.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                        {products.map((product) => (
                            <Productcard
                                key={product.id}
                                product={product}
                            />
                        ))}

                    </div>
                ) : (
                    <p className="py-10 text-center text-gray-500">
                        No products found.
                    </p>
                )
            )}

        </section>

    </main>
 
);
}

export default Home;