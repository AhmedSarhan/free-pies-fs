import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import { Product } from "../types";
import { ProductCard } from "./product-card";

export const ProductListing = ({
  products,
  title,
}: {
  products: Product[] | undefined;
  title: string;
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{title}</Text>
        <Text style={styles.viewAllText}>View All</Text>
      </View>
      {products && (
        <FlatList
          horizontal={true}
          data={products}
          renderItem={({ item }) => <ProductCard product={item} />}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.productsContainer}
          nestedScrollEnabled
          pagingEnabled
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 300,
    width: "100%",
    backgroundColor: "#FAFAFA",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "500",
  },
  viewAllText: {
    fontSize: 14,
    color: "#007BFF",
    fontWeight: "500",
  },
  productsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // padding: 10,
  },
});
