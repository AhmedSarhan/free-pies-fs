import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useController, Control } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";

export const Input = (
  props: TextInput["props"] & {
    name: string;
    control: Control<any>;
    label: string;
    containerStyles?: Partial<View["props"]["style"]>;
  }
) => {
  const { name, control, label, style, ...rest } = props;
  const propsStyle = style || ({} as Partial<TextInput["props"]["style"]>);
  const propsContainerStyle =
    props.containerStyles || ({} as Partial<View["props"]["style"]>);
  const { field, fieldState } = useController({
    name,
    control,
    defaultValue: "",
  });
  const [showPassword, setShowPassword] = useState(props.secureTextEntry);

  // Function to toggle the password visibility state
  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <View
      style={{
        ...styles.container,
        ...propsContainerStyle,
      }}
    >
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          {...rest}
          value={field.value}
          onChangeText={field.onChange}
          style={{
            ...styles.input,
            ...propsStyle,
          }}
          secureTextEntry={showPassword}
        />
        {props.secureTextEntry && (
          <Ionicons
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={24}
            color="#aaa"
            style={styles.icon}
            onPress={toggleShowPassword}
          />
        )}
      </View>
      {
        // Display error message if there is an error
        fieldState.error && (
          <Text style={{ color: "red", marginTop: 5 }}>
            {fieldState.error.message}
          </Text>
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#0C1A30",
    marginBottom: 10,
  },
  inputContainer: {
    // height: 40,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
  },
  icon: {
    marginLeft: 10,
  },
});
