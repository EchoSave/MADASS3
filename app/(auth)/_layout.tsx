import { Redirect, Stack, usePathname } from "expo-router";
import { useAuth } from "../context/AuthContext";

export default function AuthLayout() {
  const { user, initializing } = useAuth();
  const pathname = usePathname();

  const isOnEmployeeForm = pathname === "/auth/employee-form";

  if (initializing) {
    return null;
  }

  if (user && !isOnEmployeeForm) {
    return <Redirect href="/tabs/employee-page" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
      <Stack.Screen name="employee-form" />
    </Stack>
  );
}