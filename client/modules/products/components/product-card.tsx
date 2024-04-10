import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import { Product } from "@/modules/products";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";

export const ProductCard = ({ product }: { product: Product }) => {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => {
        router.push(`/(tabs)/products/${product._id}`);
      }}
      style={styles.container}
    >
      <Image style={styles.image} source={{ uri: product.image }} />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>EGP {product.price}</Text>
      <View style={styles.actionsContainer}>
        <View style={styles.ratingsViewsContainer}>
          <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
            <Ionicons name="star" size={14} color="#FFC120" />
            <Text>{product.averageRating}</Text>
          </View>
          <Text>
            {product.numOfReviews}{" "}
            {product.numOfReviews > 1 ? "reviews" : "review"}
          </Text>
        </View>

        <Pressable>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={14}
            color="black"
          />
        </Pressable>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    margin: 10,
    gap: 10,
    backgroundColor: "white",
    shadowColor: "rgba(0, 0, 0, 0.4)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.84,
    borderRadius: 10,
    elevation: 5,
  },
  image: {
    width: 150,
    height: 100,
    alignSelf: "center",
  },
  productName: {
    fontSize: 14,
    fontWeight: "500",
  },
  productPrice: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#FE3A30",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ratingsViewsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
  },
});
