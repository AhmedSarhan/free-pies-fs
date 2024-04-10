import { User } from "@/modules/auth";

export interface Product {
  name: string;
  price: number;
  image: string;
  description: string;
  _id: string;
  categories: string[];
  seller: User;
  stock: number;
  averageRating: number;
  numOfReviews: number;
  createdAt: string;
  updatedAt: string;
  reviews: Review[];
}


export interface Category {
  _id: string;
  name: string;
  description: string;
  products: Product[];
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  _id: string;
  review: string;
  rating: number;
  user: User;
  createdAt: string;
  updatedAt: string;
}