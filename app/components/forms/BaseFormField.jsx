// BaseFormField.jsx
import { useField } from "formik";
import React from "react";
import { Text } from "react-native";
import CustomInput from "../CustomInput";

const BaseFormField = ({ label, ...props }) => {
  const [field, meta] = useField(props.name);

  return (
    <>
      <CustomInput
        label={label}
        value={field.value}
        onChangeText={field.onChange(field.name)}
        onBlur={field.onBlur(field.name)}
        {...props}
      />

      {meta.touched && meta.error && (
        <Text style={{ color: "red", marginBottom: 8 }}>{meta.error}</Text>
      )}
    </>
  );
};

export default BaseFormField;
