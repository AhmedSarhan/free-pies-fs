import { useQuery } from '@tanstack/react-query';
import { Axios } from "@/shared/api";
import { Category, Product, Review } from "./types";


export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await Axios.get('/products');
      return data?.products as Product[];
    }
  });
};

export const useProduct = (id: string | undefined) => {
  return useQuery({
    queryKey: ['products', id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await Axios.get(`/products/${id}`);
      return data?.product as Product;
    }
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await Axios.get('/categories');
      return data?.categories as Category[];
    }
  });
};


export const useProductReviews = (id: string | undefined) => {
  return useQuery({
    queryKey: ['products', id, 'reviews'],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await Axios.get(`reviews/product/${id}`);
      return data?.reviews as Review[];
    },
    select: (data) => {
      const ratingsCount = {} as Record<number, number>;
      data.forEach((review) => {
        if (!ratingsCount[review.rating]) {
          ratingsCount[review.rating] = 0;
        }
        ratingsCount[review.rating] += 1;
      });
      return {
        reviews: data,
        ratingsCount,
      };
    }
  });
};