import { View, Text } from "react-native";
import React from "react";
import { useProducts } from "../server";
import { ProductListing } from "./product-listing";

export const FeaturedProducts = () => {
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
  return <ProductListing products={products} title="Featured Products" />;
};
