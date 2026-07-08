import { Stack } from "expo-router";
import React from "react";
export default function AuthLayout () {
  return (
    <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignIn" options={{ title: "Sign In"}}/>
        <Stack.Screen name="SignUp" options={{ title: "Sign Up"}}/>
    </Stack>

  ) 
}
