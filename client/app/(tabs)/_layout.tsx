import React, { useState } from "react";
import {
  Octicons,
  Ionicons,
  SimpleLineIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  Link,
  Tabs,
  useLocalSearchParams,
  useRouter,
  useSegments,
} from "expo-router";
import { StyleSheet, View, Pressable } from "react-native";
import { useFonts, DMSans_700Bold } from "@expo-google-fonts/dm-sans";

import Colors from "@/shared/constants/Colors";
import { useColorScheme } from "@/shared/hooks/useColorScheme";
import { useClientOnlyValue } from "@/shared/hooks/useClientOnlyValue";
import { CustomModal, Text } from "@/shared/components";
import { AuthModal } from "@/modules/auth";
import { useAuth } from "@/modules/auth";
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Octicons>["name"];
  color: string;
}) {
  return <Octicons size={28} style={{ marginBottom: -3 }} {...props} />;
}
const HeaderTitle = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  return (
    <Pressable
      onPress={() => {
        router.push("/");
      }}
    >
      <Text
        style={{
          color: Colors[colorScheme!].primary,
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        Free Pies
      </Text>
    </Pressable>
  );
};
const HeaderRight = ({
  setModalVisible,
}: {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  console.log("router");
  const { isAuthenticated } = useAuth();
  return (
    <View style={styles.headerRightContainer}>
      <Pressable
        onPress={() => {
          if (isAuthenticated) {
            router.push("/notifications");
          } else {
            setModalVisible(true);
          }
        }}
      >
        <Ionicons name="notifications-outline" size={28} color="black" />
      </Pressable>
      <Pressable
        onPress={() => {
          if (isAuthenticated) {
            router.push("/cart");
          } else {
            setModalVisible(true);
          }
        }}
      >
        <Ionicons name="cart-outline" size={28} color="black" />
      </Pressable>
    </View>
  );
};

const ProductDetailsHeaderRight = ({
  setModalVisible,
}: {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  return (
    <View style={styles.headerRightContainer}>
      <Pressable onPress={() => console.warn("will share")}>
        <MaterialCommunityIcons name="share-outline" size={28} color="black" />
      </Pressable>
      <Pressable
        onPress={() => {
          if (isAuthenticated) {
            router.push("/cart");
          } else {
            setModalVisible(true);
          }
        }}
      >
        <Ionicons name="cart-outline" size={28} color="black" />
      </Pressable>
    </View>
  );
};

const ReviewsPageRight = () => {
  const params = useLocalSearchParams();

  console.log("params", params);
  return (
    <View
      style={{
        paddingRight: 10,
        marginTop: 5,
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
      }}
    >
      <Ionicons name="star" size={18} color="#FFC120" />
      <Text style={{ fontSize: 18 }}>{params?.rating ?? 0}</Text>
    </View>
  );
};
export default function TabLayout() {
  const { isAuthenticated } = useAuth();

  console.log("isAuthenticated", isAuthenticated);
  const colorScheme = useColorScheme();
  const segments = useSegments();
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    "Dm-Sans": DMSans_700Bold,
  });

  const loginOptions = isAuthenticated
    ? { href: null }
    : {
        tabBarButton: (props: BottomTabBarButtonProps) => {
          return (
            <Pressable
              {...props}
              onPress={() => {
                setModalVisible(true);
              }}
            />
          );
        },
      };
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "black",
          // Disable the static render of the header on web
          // to prevent a hydration error in React Navigation v6.
          headerShown: useClientOnlyValue(false, true),
          headerTitle: () => <HeaderTitle />,
          headerRight: () =>
            segments[1] === "(auth)" ? null : (
              <HeaderRight setModalVisible={setModalVisible} />
            ),
          tabBarStyle: {
            display: segments[1] === "(auth)" ? "none" : "flex",
          },
          headerStyle: {
            shadowColor: "rgba(0, 0, 0, 0.2)",
            // elevation: 10,
            shadowOpacity: 0.3,
            shadowRadius: 2,
            shadowOffset: {
              height: 2,
              width: 0,
            },
            height: 120,
          },
          headerTitleContainerStyle: {
            paddingBottom: 10,
            paddingTop: 10,
          },
          headerRightContainerStyle: {
            paddingBottom: 10,
            paddingTop: 10,
            paddingHorizontal: 5,
          },
        }}
        initialRouteName="index"
        backBehavior="history"
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          }}
        />

        <Tabs.Screen
          name="wishlist"
          options={{
            title: "Wishlist",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="heart" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="(authenticated)/orders"
          options={{
            title: "Orders",
            tabBarIcon: ({ color }) => (
              <Ionicons name="bag-outline" size={28} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="(authenticated)/profile"
          options={{
            title: "Profile",
            href: !isAuthenticated ? null : "/(authenticated)/profile",
            tabBarIcon: ({ color }) => (
              <SimpleLineIcons name="user" size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="(auth)"
          options={{
            title: "Login",
            tabBarIcon: ({ color }) => (
              <SimpleLineIcons name="user" size={28} color={color} />
            ),
            ...loginOptions,
            headerTitle: "",
            headerShadowVisible: true,
            headerLeft: () => (
              <Pressable onPress={() => router.back()}>
                <Ionicons
                  name="chevron-back"
                  size={28}
                  color={Colors[colorScheme!].secondary}
                />
              </Pressable>
            ),
          }}
        />
        <Tabs.Screen
          name="(authenticated)/notifications"
          options={{ href: null }}
        />
        <Tabs.Screen name="(authenticated)/cart" options={{ href: null }} />
        <Tabs.Screen
          name="products/[id]/index"
          options={{
            href: null,
            headerLeft: () => (
              <Pressable onPress={() => router.back()}>
                <Ionicons
                  name="chevron-back"
                  size={28}
                  color={Colors[colorScheme!].secondary}
                />
              </Pressable>
            ),
            headerLeftContainerStyle: {
              paddingLeft: 10,
            },
            headerTitle: "Product Details",
            headerRight: () => (
              <ProductDetailsHeaderRight setModalVisible={setModalVisible} />
            ),
          }}
        />
        <Tabs.Screen
          name="products/[id]/reviews"
          options={{
            href: null,
            headerLeft: () => (
              <Pressable onPress={() => router.back()}>
                <Ionicons
                  name="chevron-back"
                  size={28}
                  color={Colors[colorScheme!].secondary}
                />
              </Pressable>
            ),
            headerLeftContainerStyle: {
              paddingLeft: 10,
            },
            headerTitle: "Review Product",
            headerRight: () => <ReviewsPageRight />,
          }}
        />
        <Tabs.Screen name="sellers/[id]/index" options={{ href: null }} />
      </Tabs>
      <CustomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        modalTitle="Login Account"
      >
        <AuthModal closeModal={() => setModalVisible(false)} />
      </CustomModal>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    width: 80,
    // paddingVertical: 30,
  },
});
