import { StyleSheet, View } from "react-native";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useRouter } from "expo-router";
import { Button, Input, Text } from "@/shared/components";
import { Control, useForm } from "react-hook-form";
import Colors from "@/shared/constants/Colors";
import { useColorScheme } from "@/shared/hooks/useColorScheme";
import { AuthFormValues, loginService } from "@/modules/auth";
import { useAuth } from "@/modules/auth";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

const Login = () => {
  const colorScheme = useColorScheme();
  const { loginAction } = useAuth();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { isValidating, isSubmitting, isDirty },
  } = useForm<Omit<AuthFormValues, "username">>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const disabled = isValidating || isSubmitting || !isDirty;

  const loginHandler = async (data: Omit<AuthFormValues, "username">) => {
    try {
      const response = await loginService(data);
      await loginAction(response.data.user, response.data.token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Welcome back to{"\n"}Free Pies</Text>
      <Text style={styles.h2}>Join us and enjoy great discounts</Text>
      <View>
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
          title="Sign In"
          onPress={handleSubmit(loginHandler)}
          style={{ marginTop: 40, paddingVertical: 20, borderRadius: 10 }}
          disabled={disabled}
        />
      </View>

      <View style={styles.linksContainer}>
        <Link
          href="/forgot-password"
          style={{ ...styles.link, color: "#0C1A30" }}
        >
          Forgot Password?
        </Link>
        <Link
          href="/register"
          style={{ ...styles.link, color: Colors[colorScheme!].primary }}
        >
          Sign Up
        </Link>
      </View>
    </View>
  );
};

export default Login;

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
    justifyContent: "space-between",
    alignItems: "flex-end",
    flex: 1,
    marginBottom: 40,
    marginHorizontal: "auto",
    width: "100%",
    alignSelf: "center",
  },
  link: {
    fontSize: 14,
    fontWeight: "500",
  },
});
