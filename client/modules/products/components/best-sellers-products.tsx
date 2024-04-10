import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";
import { Product } from "../types";
import { ProductCard } from "./product-card";
import { ProductListing } from "./product-listing";
import { useProducts } from "../server";

export const BestSellerProducts = () => {
  const { data: products, isLoading, error } = useProducts();
  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }
  return <ProductListing products={products} title="Best Sellers" />;
};
