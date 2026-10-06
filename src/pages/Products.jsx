import { useInfiniteQuery } from "@tanstack/react-query";
import Productcard from "../component/common/Productcard";
import { getProducts } from "../api/product";
import { useEffect  , useRef, useState} from "react";

function Products() {
    const loadMoreRef =useRef(null)
    const [searchinput , setSearchInput] = useState("")
    const [search , setSearch] = useState("")
    const [category ,setCategory] = useState("")
    const [sort , setSort] = useState("")
    const [order , setOrder] = useState("") 

    useEffect(()=>{
           const timerid = setTimeout( ()=> setSearch(searchinput) , 500)

            return ()=> {clearTimeout(timerid)}
        }, [searchinput])
    

    const {
        data,
        isPending,
        isError,
        error,
        fetchNextPage,
        hasNextPage ,
        isFetchingNextPage 
    } = useInfiniteQuery({
        queryKey: ["products" , search, category, sort , order] ,
        queryFn: ({pageParam}) => { return getProducts({
            limit: 10,
            skip: pageParam ,
            search,
            category, 
            sort,
            order
        }) } , 
        initialPageParam : 0 ,
        getNextPageParam: (lastpage)=> {
           const nextpage= lastpage.skip + lastpage.limit 
           if(nextpage <lastpage.total){return nextpage}
           else{ return undefined}
        }
    });

    
    useEffect(()=>{

        const observer = new IntersectionObserver((enteries)=> {
            const firstentry = enteries[0]
            if(firstentry.isIntersecting && hasNextPage && !isFetchingNextPage){
                fetchNextPage()
            }
        

        } , {rootMargin: "200px" })
        const element = loadMoreRef.current
        if(element){observer.observe(element)}

        return ()=> { if(element) {observer.unobserve(element)}} 
    
    } , [fetchNextPage  , hasNextPage , isFetchingNextPage])

   

   
    const products = data?.pages.flatMap(
        (page) => page.products
    ) ?? [];

    
    return ( <>
        <div className="min-h-screen bg-gray-50">
    
           
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
    
                
    
    
                <div className="mb-8 flex flex-col gap-4 rounded-xl bg-white p-5 shadow-sm md:flex-row">
    
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchinput}
                        onChange={(event) =>
                            setSearchInput(event.target.value)
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
    
    
                    <select
                        value={category}
                        onChange={(event) =>
                            setCategory(event.target.value)
                        }
                        className="rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    >
                        <option value="">
                            All Categories
                        </option>
    
                        <option value="fragrances">
                            Fragrances
                        </option>
    
                        <option value="groceries">
                            Groceries
                        </option>
    
                        <option value="furniture">
                            Furniture
                        </option>
                    </select>
    
    
                    <select
                        value={sort && order ? `${sort}-${order}` : ""}
                        onChange={(event) => {
    
                            const sortValue =
                                event.target.value;
    
                            if (!sortValue) {
                                setSort("");
                                setOrder("");
                                return;
                            }
    
                            const [field, direction] =
                                sortValue.split("-");
    
                            setSort(field);
                            setOrder(direction);
                        }}
                        className="rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    >
                        <option value="">
                            Sort By
                        </option>
    
                        <option value="price-asc">
                            Price: Low to High
                        </option>
    
                        <option value="price-desc">
                            Price: High to Low
                        </option>
    
                        <option value="title-asc">
                            Name: A to Z
                        </option>
    
                        <option value="title-desc">
                            Name: Z to A
                        </option>
                    </select>
    
                </div>
    
    
             
                {isPending && (
                    <p className="py-10 text-center text-gray-600">
                        Loading products...
                    </p>
                )}
    
    
               
                {isError && (
                    <p className="py-10 text-center text-red-600">
                        Error: {error.message}
                    </p>
                )}
    
    
             
                {!isPending && !isError && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    
                        {products.map((item) => (
                            <Productcard
                                key={item.id}
                                product={item}
                            />
                        ))}
    
                    </div>
                )}
    
    
             
                <div
                    ref={loadMoreRef}
                    className="min-h-16 py-6 text-center"
                >
    
                    {isFetchingNextPage && (
                        <p className="text-gray-600">
                            Loading more products...
                        </p>
                    )}
    
                    {!hasNextPage && !isPending && (
                        <p className="text-gray-500">
                            No more products
                        </p>
                    )}
    
                </div>
    
            </div>
    
        </div> </>
    )};
export default Products;