import apiClient from "./Client";

export async function getProducts({limit =10 , skip =0 , search= "", category= "" , sort="" , order=""} = {}){

    let url = "/products"
    const params= { limit , skip }
    if(category){
        url =`${url}/category/${category}`
       

    }
    else if(search){
        url = `${url}/search`
        params.q = search
    }

    if (sort) {
        params.sortBy = sort;
    }

    if (order) {
        params.order = order;
    }


    const response = await apiClient.get(url , {
        params
    } )

    return  {
        ...response.data,
        products: response.data.products.map((item) => ({
            ...item,
            name: item.title,
            image: item.thumbnail
        }))
    };
}

