import { Redirect, Stack, usePathname } from "expo-router";
import { useAuth } from "../context/AuthContext";

export default function AuthLayout() {
  const { user, initializing } = useAuth();
  const pathname = usePathname();

  if (initializing) {
    return null;
  }

  // Allow index + auth screens
  const isAuthScreen = ["/", "/sign-in", "/sign-up", "/employee-form"].includes(
    pathname,
  );

  // Only redirect logged-in users AWAY from auth screens
  if (user && isAuthScreen) {
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
