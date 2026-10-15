import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import Productcard from "../component/common/Productcard";
import { getProducts } from "../api/product";

function Products() {
  const loadMoreRef = useRef(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "";
  const order = searchParams.get("order") || "";

  const [searchinput, setSearchInput] = useState(search);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  useEffect(() => {
    const trimmedSearch = searchinput.trim();

    const timerid = setTimeout(() => {
      if (trimmedSearch === search) {
        return;
      }

      setSearchParams(
        (previousParams) => {
          const nextParams = new URLSearchParams(previousParams);

          if (trimmedSearch) {
            nextParams.set("search", trimmedSearch);
          } else {
            nextParams.delete("search");
          }

          return nextParams;
        },
        { replace: true }
      );
    }, 500);

    return () => {
      clearTimeout(timerid);
    };
  }, [searchinput, search, setSearchParams]);

  // Infinite query
  const {
    data,
    isPending,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["products", search, category, sort, order],

    queryFn: ({ pageParam }) =>
      getProducts({
        limit: 10,
        skip: pageParam,
        search,
        category,
        sort,
        order,
      }),

    initialPageParam: 0,

    getNextPageParam: (lastPage) => {
      const nextpage = lastPage.skip + lastPage.limit;

      return nextpage < lastPage.total ? nextpage : undefined;
    },
  });

  
  useEffect(() => {
    const element = loadMoreRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const firstentry = entries[0];

        if (firstentry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        rootMargin: "200px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const products = data?.pages.flatMap((page) => page.products) ?? [];

 
  function updateFilter(name, value) {
    setSearchParams((previousParams) => {
      const nextParams = new URLSearchParams(previousParams);

      if (value) {
        nextParams.set(name, value);
      } else {
        nextParams.delete(name);
      }

      return nextParams;
    });
  }

  
  function handleCategoryChange(event) {
    const value = event.target.value;

    setSearchInput("");

    setSearchParams((previousParams) => {
      const nextParams = new URLSearchParams(previousParams);

      if (value) {
        nextParams.set("category", value);
      } else {
        nextParams.delete("category");
      }

      nextParams.delete("search");

      return nextParams;
    });
  }

  function handleSortChange(event) {
    const sortValue = event.target.value;

    setSearchParams((previousParams) => {
      const nextParams = new URLSearchParams(previousParams);

      if (!sortValue) {
        nextParams.delete("sort");
        nextParams.delete("order");
      } else {
        const [field, direction] = sortValue.split("-");

        nextParams.set("sort", field);
        nextParams.set("order", direction);
      }

      return nextParams;
    });
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 rounded-xl bg-white p-5 shadow-sm md:flex-row">
          <input
            type="text"
            placeholder={
              category
                ? "Clear category to search all products..."
                : "Search products..."
            }
            value={searchinput}
            onChange={(event) => setSearchInput(event.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />

          <select
            value={category}
            onChange={handleCategoryChange}
            className="rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            <option value="">All Categories</option>
            <option value="fragrances">Fragrances</option>
            <option value="groceries">Groceries</option>
            <option value="furniture">Furniture</option>
          </select>

          <select
            value={sort && order ? `${sort}-${order}` : ""}
            onChange={handleSortChange}
            className="rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            <option value="">Sort By</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="title-asc">Name: A to Z</option>
            <option value="title-desc">Name: Z to A</option>
          </select>

          <button
            type="button"
            onClick={() => {
              setSearchInput("");
              setSearchParams({});
            }}
            className="rounded-lg border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Clear Filters
          </button>
        </div>

       
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>

          {!isPending && !isError && (
            <p className="text-sm text-gray-500">
              {products.length} products loaded
            </p>
          )}
        </div>

       
        {isPending && (
          <p className="py-10 text-center text-gray-600">Loading products...</p>
        )}

        
        {isError && (
          <p className="py-10 text-center text-red-600">
            Error: {error.message}
          </p>
        )}

       
        {!isPending &&
          !isError &&
          (products.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((item) => (
                <Productcard key={item.id} product={item} />
              ))}
            </div>
          ) : (
            <p className="py-10 text-center text-gray-500">
              No products found.
            </p>
          ))}

        
        <div ref={loadMoreRef} className="min-h-16 py-6 text-center">
          {isFetchingNextPage && (
            <p className="text-gray-600">Loading more products...</p>
          )}

          {!isPending && !isError && !hasNextPage && products.length > 0 && (
            <p className="text-gray-500">No more products</p>
          )}
        </div>
      </div>
    </main>
  );
}

export default Products;
