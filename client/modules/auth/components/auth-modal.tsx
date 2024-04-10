import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  useColorScheme,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import Colors from "@/shared/constants/Colors";
import { Button } from "@/shared/components";

export const AuthModal = ({ closeModal }: { closeModal: () => void }) => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: "https://reactnative.dev/img/tiny_logo.png",
        }}
      />
      <Text style={styles.header}>Join Free Pies</Text>
      <Text style={styles.content}>
        Sign up to get your favorite pies delivered to your doorsteps
      </Text>
      {/* <Button title="Login" onPress={() => {}} /> */}
      <Button
        title="Login"
        onPress={() => {
          router.push("/login");
          closeModal();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    paddingHorizontal: 15,
    paddingBottom: 20,
    textAlign: "center",
  },
  image: {
    flex: 1,
    width: 200,
    height: 200,
    backgroundColor: "#0553",
  },
  header: {
    fontSize: 16,
    fontWeight: "600",
  },
  content: {
    fontSize: 14,
    fontWeight: "400",
    color: "#838589",
    textAlign: "center",
  },
});
