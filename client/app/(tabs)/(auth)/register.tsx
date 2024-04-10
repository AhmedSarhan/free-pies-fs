import { StyleSheet, View } from "react-native";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useRouter } from "expo-router";
import { Button, Input, Text } from "@/shared/components";
import { useForm } from "react-hook-form";
import axios from "axios";
import Colors from "@/shared/constants/Colors";
import { useColorScheme } from "@/shared/hooks/useColorScheme";
import { AuthFormValues, registerService } from "@/modules/auth";
import { useAuth } from "@/modules/auth";

const schema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

const Register = () => {
  const colorScheme = useColorScheme();
  const { loginAction } = useAuth();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { isValidating, isSubmitting, isDirty },
  } = useForm<AuthFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
    mode: "onBlur",
    reValidateMode: "onBlur",
  });
  const disabled = isValidating || isSubmitting || !isDirty;

  const registerHander = async (data: AuthFormValues) => {
    try {
      const response = await registerService(data);
      await loginAction(response.data.user, response.data.token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Register to{"\n"}Free Pies</Text>
      <Text style={styles.h2}>Join us and enjoy great discounts</Text>
      <View>
        <Input
          containerStyles={styles.inputView}
          name="username"
          label="Username"
          control={control}
        />
        <Input
          containerStyles={styles.inputView}
          name="email"
          label="Email"
          control={control}
          inputMode="email"
        />
        <Input
          containerStyles={styles.inputView}
          name="password"
          secureTextEntry={true}
          label="Password"
          control={control}
        />
        <Button
          title="Sign Up"
          onPress={handleSubmit(registerHander)}
          style={{ marginTop: 40, paddingVertical: 20, borderRadius: 10 }}
          disabled={disabled}
        />
      </View>

      <View style={styles.linksContainer}>
        <Link href="/login" style={{ ...styles.link, color: "#0C1A30" }}>
          Have an account?{" "}
          <Text style={{ color: Colors[colorScheme!].primary }}>Login</Text>
        </Link>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 72,
    paddingHorizontal: 24,
    paddingBottom: 10,
  },
  h1: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#0C1A30",
  },
  h2: {
    fontSize: 14,
    color: "#838589",
    marginTop: 20,
    marginBottom: 50,
  },
  inputView: {
    marginBottom: 30,
  },
  linksContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
    width: "100%",
  },
  link: {
    fontSize: 14,
    fontWeight: "500",
  },
});
