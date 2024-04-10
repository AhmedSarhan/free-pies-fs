import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export const ReviewRating = ({ rating }: { rating: number }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 2,
        alignItems: "center",
        marginBottom: 10,
      }}
    >
      {Array.from({ length: rating }).map((_, i) => (
        <Ionicons name="star" size={16} color="#FFC120" />
      ))}
      {Array.from({ length: 5 - rating }).map((_, i) => (
        <Ionicons name="star-outline" size={16} color="#EDEDED" />
      ))}
    </View>
  );
};
