import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { RatingScale, ReviewCard, ReviewRating } from "@/modules/products/";
import { useProductReviews } from "@/modules/products/server";
import { useLocalSearchParams } from "expo-router";
import { Divider } from "@/shared/components";

const Reviews = () => {
  const { id, rating } = useLocalSearchParams();
  const { data, error, isLoading } = useProductReviews(
    id as string | undefined
  );
  const { ratingsCount, reviews } = data || {};
  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  return (
    <ScrollView style={styles.pageContainer}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          marginVertical: 30,
          gap: 15,
        }}
      >
        <View
          style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{ flexDirection: "row", gap: 0, alignItems: "flex-end" }}
          >
            <Text style={{ fontSize: 30, fontWeight: "bold", color: "0C1A30" }}>
              {rating || 0}{" "}
            </Text>
            <Text style={{ fontSize: 14, fontWeight: "400", color: "#0C1A30" }}>
              / 5
            </Text>
          </View>
          <Text style={{ fontSize: 14, fontWeight: "400" }}>
            {reviews?.length} Reviews
          </Text>
        </View>
        <Divider
          dividerStyle={{
            tranform: [{ rotate: "90deg" }],
            height: "100%",
            width: 1,
          }}
        />
        <View style={{ flex: 1 }}>
          {reviews?.length &&
            Object.entries(ratingsCount || {})
              .reverse()
              .map(([rating, count]) => (
                <View
                  key={rating}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <ReviewRating rating={parseInt(rating)} />
                  <RatingScale
                    ratingCount={count}
                    reviewsCount={reviews?.length}
                  />
                </View>
              ))}
        </View>
      </View>
      <View style={{ gap: 20 }}>
        {reviews?.map((review) => (
          <ReviewCard key={review._id} review={review} />
        ))}
      </View>
    </ScrollView>
  );
};

export default Reviews;

const styles = StyleSheet.create({
  pageContainer: {
    padding: 25,
    flex: 1,
    backgroundColor: "white",
  },
});
