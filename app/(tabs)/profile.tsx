import { router } from "expo-router";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { auth } from "../../config/firebase";
import { useAuth } from "../../context/AuthContext";
import CustomButton from "../components/CustomButton";

export default function ProfileScreen() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSignOut = () => {
    // Alert.alert(title, msg, [buttons]) is built-in API React Native
    Alert.alert(
      "Sign Out", // title
      "Are you sure that you want to sign out?", // msg
      [ // [buttons]
        { text: "Cancel", style: "cancel" }, 
        {
          text: "Sign Out",
          style: "destructive",
          onPress: async () => {
            setLoading(true);
            try {
              await signOut(auth);
              router.replace("/(auth)/sign-in");
            } catch (error) {
              Alert.alert("Error", "Failed to sign out. Please try again.");
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Signed in as</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <CustomButton
        title={loading ? "Signing out..." : "Sign Out"}
        variant="primary"
        onPress={handleSignOut}
        disabled={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  card: {
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    padding: 20,
    marginBottom: 32,
  },
  label: {
    fontSize: 13,
    color: "#64748b",
    marginBottom: 4,
  },
  email: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0f172a",
  },
});