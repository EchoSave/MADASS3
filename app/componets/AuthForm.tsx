import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
//import "bootstrap/dist/css/bootstrap.min.css";
import { TextInput, View } from "react-native";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Invalid password").required("Required"),
});

const SignupSchema = Yup.object().shape({
  FullName: Yup.string()
    .min(1, "At Least one Character")
    .max(50, "Can we Shorten your name please")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Invalid password").required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
});

export default function AuthForm() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Formik
        initialValues={{
          email: "",
          password: "",
          FullName: "",
          confirmPassword: "",
        }}
        //validationSchema={SignupSchema}
        onSubmit={async (values, { setSubmitting, setStatus }) => {
          console.log("Submitted values:", values);
          const success = await SignupSchema.validate(values);
          if (!success) {
            setStatus({ success: false, message: "Validation failed" });
          }
          setSubmitting(false);
        }}
        enableReinitialize={true}
        validationSchema={SignupSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <View style={{ width: "80%" }}>
            <TextInput
              placeholder="Full Name"
              //name="FullName"
              value={values.FullName}
              onChangeText={handleChange("FullName")}
              //onBlur={handleBlur("FullName")}
            />
            <ErrorMessage name="FullName" component="div" />
            <TextInput
              placeholder="Email"
              //name="email"
              value={values.email}
              onChangeText={handleChange("email")}
              //onBlur={handleBlur("email")}
            />
            <ErrorMessage name="email" component="div" />
            <TextInput
              placeholder="Password"
              //name="password"
              secureTextEntry
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
            />
            <ErrorMessage name="password" component="div" />
            <TextInput
              placeholder="Confirm Password"
              //name="confirmPassword"
              secureTextEntry
              value={values.confirmPassword}
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
            />
            <ErrorMessage name="confirmPassword" component="div" />
          </View>
        )}
      </Formik>
    </View>
  );
}
