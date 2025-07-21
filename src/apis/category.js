import httpInstance from "@/utils/http";

export function getCategoryAPI(id) {
  return httpInstance({
    url: '/category',
    params:{
        id
    }
  });
}

export const getCategoryFilterAPI = (id) => {
  return httpInstance({
    url: '/category/sub/filter',
    params: {
        id
    }
  });
}