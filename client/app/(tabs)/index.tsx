import {
  BestSellerProducts,
  FeaturedProducts,
  NewArrivalsProducts,
  ProductCard,
  TopRatedProducts,
} from "@/modules/products";
import { useProducts } from "@/modules/products/server";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";

const adds = [
  "@/assets/images/ad.png",
  "@/assets/images/ad.png",
  "@/assets/images/ad.png",
];
export default function TabOneScreen() {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <ScrollView
      nestedScrollEnabled
      // style={styles.scrollView}
      style={{
        backgroundColor: "#FAFAFA",
      }}
      horizontal={false}
      directionalLockEnabled={true}
      showsHorizontalScrollIndicator={false}
      automaticallyAdjustContentInsets={false}
    >
      {/* <View style={styles.container}> */}
      <View>
        <FlatList
          horizontal={true}
          data={adds}
          renderItem={({ item }) => (
            <Image
              style={styles.image}
              source={require("@/assets/images/ad.png")}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          style={{
            width: "100%",
            backgroundColor: "#fff",
            marginVertical: 25,
          }}
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
            gap: 25,
            padding: 15,
          }}
        />
      </View>
      <View
        style={{
          width: "100%",

          // padding: 10,
          alignItems: "center",
          justifyContent: "center",
          gap: 35,
          marginVertical: 25,
          paddingVertical: 15,
        }}
      >
        <FeaturedProducts />
        <BestSellerProducts />
        <NewArrivalsProducts />
        <TopRatedProducts />
      </View>
      {/* {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))} */}
      {/* </View> */}
    </ScrollView>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    overflow: "hidden",
  },
  scrollView: {
    // backgroundColor: "pink",
    // marginHorizontal: 20,
  },
  image: {
    // width: "100%",
    // height: 100,
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
});
