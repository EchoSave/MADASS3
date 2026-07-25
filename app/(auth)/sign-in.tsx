import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CustomButton from "../components/CustomButton";

import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../config/firebase";
import BaseForm from "../components/forms/BaseForm";
import BaseFormField from "../components/forms/BaseFormField";
import { loginSchema } from "../validation/loginSchema";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSignIn = async (values: { email: string; password: string }) => {
    setAuthError(null);
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      router.replace("/(tabs)/profile")
    } catch (error: any) {
      setAuthError(mapAuthError(error.code));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Sign In</Text>
          <Text style={styles.subtitle}>
            Access your employee account securely
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <BaseForm
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={handleSignIn}
          >
            {(formik?: any) => (
              <>
                <BaseFormField
                  name="email"
                  label="Email Address"
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                <BaseFormField
                  name="password"
                  label="Password"
                  placeholder="Enter your password"
                  secureTextEntry
                  autoCapitalize="none"
                />
                
                {/* Auth error message */}
                {authError && (
                  <Text style={styles.errorText}>{authError}</Text>
                )}
                
                {/* Forgot password */}
                <View style={styles.forgotContainer}>
                  <Pressable onPress={() => alert("Forgot password pressed!")}>
                    <Text style={styles.forgotText}>Forgot your password?</Text>
                  </Pressable>
                </View>

                {/* Sign In button triggers Formik validation */}
                <CustomButton
                  title="Sign In"
                  variant="primary"
                  onPress={formik.handleSubmit}
                  disabled={isLoading}
                />

                {/* Link to Sign Up */}
                <View style={styles.signUpContainer}>
                  <Text style={styles.signUpText}>Do not have an account? </Text>
                  <Pressable onPress={() => router.push("/(auth)/sign-up")}>
                    <Text style={styles.signUpLink}>Sign Up</Text>
                  </Pressable>
                </View>
              </>
            )}
          </BaseForm>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function mapAuthError (code: string) {
  switch(code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Email or password invalid";
    case "auth/invalid-email":
      return "Invalid email";
    case "auth/too-many-requests":
      return "You tried many times. Please try again later!";
    case "auth/network-request-failed":
      return "Error network connection. Please reconnect your network!";
    default:
      return "Failled login. Please try again!";
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#64748b",
  },
  form: {
    width: "100%",
  },
  forgotContainer: {
    alignItems: "flex-end",
    marginTop: 4,
    marginBottom: 24,
  },
  forgotText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0284c7",
    textDecorationLine: "underline",
  },
  footer: {
    width: "100%",
    marginTop: 8,
  },
  errorText: {
    color: "#dc2626", 
    fontSize: 14, 
    marginTop: 8, 
    marginBottom: 4 
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  signUpText: {
    color: "#64748b",
    fontSize: 14,
  },
  signUpLink: {
    color: "#0284c7",
    fontWeight: "600",
    fontSize: 14,
  },
});
