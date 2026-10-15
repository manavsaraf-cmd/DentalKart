import apiClient from "./Client";

export async function getProducts({
  limit = 10,
  skip = 0,
  search = "",
  category = "",
  sort = "",
  order = "",
} = {}) {
  let url = "/products";
  const params = { limit, skip }; //Object Literls - creating an object with values as obj with const and without const - Object Destructuring
  if (category) {
    url = `${url}/category/${category}`;
  } else if (search) {
    url = `${url}/search`;
    params.q = search;
  }

  if (sort) {
    params.sortBy = sort;
  }

  if (order) {
    params.order = order;
  }

  const response = await apiClient.get(url, {
    params,
  });

  return {
    ...response.data,
    products: response.data.products.map((item) => ({
      ...item,
      name: item.title,
      image: item.thumbnail,
    })),
  };
}

export async function getProductById(id) {
  const response = await apiClient.get(`/products/${id}`);

  const item = response.data;

  return {
    ...item,
    name: item.title,
    image: item.thumbnail,
  };
}
