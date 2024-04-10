import { Text, Pressable, PressableProps, StyleSheet } from "react-native";
import React from "react";
import Colors from "@/shared/constants/Colors";
import { useColorScheme } from "@/shared/hooks/useColorScheme";

export const Button = (
  props: PressableProps & {
    title: string | React.ReactNode;
    titleStyles?: any;
  }
) => {
  const colorScheme = useColorScheme();
  return (
    <Pressable
      style={{
        backgroundColor: props.disabled
          ? Colors[colorScheme!].disabled
          : Colors[colorScheme!].primary,
        ...styles.button,
        ...(props.style as any),
      }}
      onPress={props.onPress}
      disabled={props.disabled}
    >
      {typeof props.title === "string" ? (
        <Text
          style={{
            ...styles.buttonContent,
            ...(props.titleStyles as any),
          }}
        >
          {props.title}
        </Text>
      ) : (
        props.title
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonContent: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});
