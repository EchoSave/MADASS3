import { Redirect, Stack, usePathname } from "expo-router";
import { useAuth } from "../context/AuthContext";

export default function AuthLayout() {
  const { user, initializing } = useAuth();
  const pathname = usePathname();

  if (initializing) return null;

  const isOnEmployeeForm = pathname === "/employee-form";

  if (user && !isOnEmployeeForm) {
    return <Redirect href="/employee-page" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
      <Stack.Screen name="employee-form" />
    </Stack>
  );
}