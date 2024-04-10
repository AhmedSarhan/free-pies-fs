import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import React from "react";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { Avatar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

import { useProduct, useProducts } from "@/modules/products/server";
import { Button, Divider } from "@/shared/components";
import { FeaturedProducts, ReviewCard } from "@/modules/products";

const ProductDetails = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { data: product, isLoading } = useProduct(id as string | undefined);
  // console.log("product", product, product?.seller);
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Product not found</Text>
      </View>
    );
  }

  const stockColor =
    product?.stock > 10
      ? "#3A9B7A"
      : product?.stock > 0
      ? "#D97904"
      : "#C75050";
  const stockBgColor =
    product?.stock > 10
      ? "#EEFAF6"
      : product?.stock > 0
      ? "rgba(250, 130, 49, 0.3)"
      : "rgba(232, 65, 24, 0.3)";
  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: product.image }} />
        <Text style={styles.imagesNum}>1/5 photos</Text>
      </View>
      <View style={{ padding: 20 }}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>EGP {product.price}</Text>
        <View style={styles.productDetails}>
          <View style={styles.ratingsViewsContainer}>
            <View
              style={{ flexDirection: "row", gap: 2, alignItems: "center" }}
            >
              <Ionicons name="star" size={14} color="#FFC120" />
              <Text style={{ fontSize: 14 }}>{product.averageRating}</Text>
            </View>
            <Text style={{ fontSize: 14 }}>
              {product.numOfReviews}{" "}
              {product.numOfReviews > 1 ? "reviews" : "review"}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: stockBgColor,
              paddingHorizontal: 15,
              paddingVertical: 5,
              borderRadius: 35,
            }}
          >
            <Text
              style={{ color: stockColor, fontSize: 12, fontWeight: "500" }}
            >
              Stock: {product.stock}
            </Text>
          </View>
        </View>
      </View>
      <Divider
        dividerStyle={{
          marginVertical: 30,
          width: "85%",
          alignSelf: "center",
        }}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 20,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
          <Avatar.Image size={45} source={{ uri: product.seller.avatar }} />
          <View>
            <Text style={{ fontSize: 14, fontWeight: "500", marginBottom: 5 }}>
              {product.seller.username}
            </Text>
            <Text style={{ fontSize: 12, fontWeight: "400", color: "#838589" }}>
              Official Seller
            </Text>
          </View>
        </View>
        <Link href={`/(tabs)/seller/${product.seller._id}`}>
          <Ionicons name="chevron-forward" size={20} color="#0C1A30" />
        </Link>
      </View>
      <Divider
        dividerStyle={{
          marginVertical: 30,
          width: "85%",
          alignSelf: "center",
        }}
      />
      <View style={{ paddingHorizontal: 20 }}>
        <Text
          style={{
            ...styles.title,
            marginBottom: 15,
          }}
        >
          Product Description:
        </Text>
        <Text
          style={{ ...styles.description, marginBottom: 10, lineHeight: 22 }}
        >
          {product.description} Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Soluta temporibus doloribus, expedita animi natus
          impedit earum veniam. Esse, culpa dolore! Nisi optio soluta aliquam
          blanditiis placeat voluptatum officia iste ipsum?
          {"\n\n"}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
          quisquam molestiae ratione, sapiente maiores minus cumque deleniti,
          similique laboriosam deserunt recusandae. Magnam, quis laudantium
          corporis numquam ipsa dolore voluptates temporibus!
        </Text>
      </View>
      <Divider
        dividerStyle={{
          marginVertical: 30,
          width: "85%",
          alignSelf: "center",
        }}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 25,
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            ...styles.title,
          }}
        >
          Reviews ({product.numOfReviews})
        </Text>
        <View
          style={{
            flexDirection: "row",
            gap: 4,
            alignItems: "center",
            paddingHorizontal: 20,
          }}
        >
          <Ionicons name="star" size={15} color="#FFC120" />
          <Text style={{ fontSize: 14 }}>{product.averageRating}</Text>
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: 20,
        }}
      >
        {product.reviews?.map((review) => (
          <ReviewCard key={review._id} review={review} />
        ))}
        <Button
          title="See All Reviews"
          onPress={() => {
            console.log("router id", product);
            router.push(
              `/products/${product._id}/reviews?rating=${product.averageRating}`
            );
          }}
          style={{
            backgroundColor: "transparent",
            borderColor: "#0C1A30",
            borderWidth: 1,
            marginVertical: 15,
            paddingHorizontal: 10,
            paddingVertical: 15,
            borderRadius: 10,
          }}
          titleStyles={{ color: "#0C1A30" }}
        />
      </View>

      <View style={{ paddingHorizontal: 10, backgroundColor: "#fafafa " }}>
        <FeaturedProducts />
      </View>
      <View
        style={{
          width: "100%",
          marginVertical: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 15,
          backgroundColor: "#FAFAFA",
          paddingHorizontal: 20,
        }}
      >
        <Button
          title={
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                paddingHorizontal: 15,

                // gap: 5,
              }}
            >
              <Text style={{ color: "white" }}>Add to Wishlist</Text>
              <Ionicons name="heart" size={20} color="#fff" style={{}} />
            </View>
          }
          onPress={() => {
            console.log("Add to Cart");
          }}
          style={{
            backgroundColor: "#FE3A30",
            paddingVertical: 15,
            borderRadius: 10,
            flex: 1,
          }}
          titleStyles={{ color: "#fff" }}
        />
        <Button
          title="Add to Cart"
          onPress={() => {
            console.log("Add to Cart");
          }}
          style={{
            paddingVertical: 15,
            flex: 1,
          }}
          titleStyles={{ color: "#fff" }}
        />
      </View>
    </ScrollView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageContainer: {
    backgroundColor: "#fafafa",
    marginBottom: 25,
    padding: 20,
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  imagesNum: {
    color: "#0C1A30",
    fontSize: 14,
    marginTop: 25,
    alignSelf: "flex-start",
    justifyContent: "flex-end",
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 10,
    alignSelf: "center",
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#0C1A30",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0C1A30",
  },
  description: {
    fontSize: 14,
    fontWeight: "400",
    color: "#0C1A30",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FE3A30",
    marginBottom: 10,
  },
  productDetails: {
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
