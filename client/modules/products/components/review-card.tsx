import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";
import { Review } from "../types";
import { ReviewRating } from "./review-rating";

export const ReviewCard = ({ review }: { review: Review }) => {
  return (
    <View key={review._id} style={styles.reviewCard}>
      <Avatar.Image size={50} source={{ uri: review.user?.avatar }} />
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 14, fontWeight: "500", marginBottom: 10 }}>
          {review.user?.username}
        </Text>
        <ReviewRating rating={review.rating} />
        <Text style={{ fontSize: 12, fontWeight: "400", lineHeight: 20 }}>
          {review.review}
        </Text>
      </View>
      <Text style={{ color: "#838589", fontSize: 12, fontWeight: "400" }}>
        {new Date(review.createdAt).toLocaleDateString()}{" "}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 15,
    gap: 15,
  },
});
