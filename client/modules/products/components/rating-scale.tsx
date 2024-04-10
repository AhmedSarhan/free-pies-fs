import { View, Text } from "react-native";
import React from "react";
import { Bar } from "react-native-progress";

export const RatingScale = ({
  ratingCount,
  reviewsCount,
}: {
  ratingCount: number;
  reviewsCount: number;
}) => {
  const progress = ratingCount / reviewsCount;
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        marginBottom: 10,
      }}
    >
      <Bar
        progress={progress}
        width={null}
        style={{ height: 6, flex: 1, borderColor: "none" }}
        color="#FFC120"
        unfilledColor="#EDEDED"
        borderColor="none"
        borderWidth={0}
      />
      <Text style={{ fontSize: 12, fontWeight: "500" }}>{ratingCount}</Text>
    </View>
  );
};
