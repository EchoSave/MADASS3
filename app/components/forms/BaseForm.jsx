import React from "react";
import { Formik} from "formik";

const BaseForm = ({ initialValues, validationSchema, onSubmit, children }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
        {(formik) => children(formik)}
    </Formik>
  );
};

export default BaseForm;
