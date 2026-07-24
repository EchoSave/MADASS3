import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import CustomButton from "../components/CustomButton";

import { router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../config/firebase";
import BaseForm from "../components/forms/BaseForm";
import BaseFormField from "../components/forms/BaseFormField";
import { signupSchema } from "../validation/signupSchema";

export default function SignUp() {
  const [isLoading, setIsisLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSignUp = async (values: {
    email: string;
    password: string;
  }) => {
    setAuthError(null);
    setIsisLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      router.replace("/(auth)/employee-form");
    } catch (error: any) {
      setAuthError(mapSignUpError(error.code));
    } finally {
      setIsisLoading(false);
    }
  };

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
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Sign up to start managing employee information
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <BaseForm
            initialValues={initialValues}
            validationSchema={signupSchema}
            onSubmit={handleSignUp}
          >
            {(formik?: any) => (
              <>
                <BaseFormField
                  name="fullName"
                  label="Full Name"
                  placeholder="Antony Taylor"
                />

                <BaseFormField
                  name="email"
                  label="Email Address"
                  placeholder="antony@sait.ca"
                  keyboardType="email-address"
                />

                <BaseFormField
                  name="password"
                  label="Password"
                  placeholder="Enter secure password"
                  secureTextEntry
                />

                <BaseFormField
                  name="confirmPassword"
                  label="Confirm Password"
                  placeholder="Re-enter your password"
                  secureTextEntry
                />

                {authError && (
                  <Text style={styles.errorText}>{authError}</Text>
                )}

                <CustomButton
                  title={isLoading ? "Creating Account..." : "Sign Up"}
                  variant="primary"
                  onPress={formik.handleSubmit}
                  disabled={isLoading}
                />

                {/* Link to Sign In */}
                <View style={styles.signInContainer}>
                  <Text style={styles.signInText}>Already have an account? </Text>
                  <Pressable onPress={() => router.push("/(auth)/sign-in")}>
                    <Text style={styles.signInLink}>Sign In</Text>
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

// Map Firebase error codes to user-friendly messages
function mapSignUpError(code: string): string {
  switch (code) {
    case "auth/email-already-in-use":
      return "Registered email already exists. Please use a different email.";
    case "auth/invalid-email":
      return "Invalid email address.";
    case "auth/weak-password":
      return "Password is too weak. Please use at least 6 characters.";
    case "auth/network-request-failed":
      return "Network request failed. Please check your internet connection.";
    default:
      return "Sign up failed. Please try again.";
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
    paddingTop: 40,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 28,
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
  footer: {
    width: "100%",
    marginTop: 16,
  },
  errorText: {
    color: "#dc2626", 
    fontSize: 14, 
    marginTop: 8, 
    marginBottom: 4 
  },
  signInContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  signInText: {
    color: "#64748b",
    fontSize: 14,
  },
  signInLink: {
    color: "#0284c7",
    fontWeight: "600",
    fontSize: 14,
  },
});

