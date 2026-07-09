import { useFormik } from "formik";
import * as yup from "yup";
const SignInForm = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = (values) => console.log(JSON.stringify(values, null, 4));
  
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email field is required"),
    password: yup.string().required("Password field is required"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema
  })
  return (
    <form onSubmit={formik.handleSubmit}>
      <div style={{ padding: 20 }}>
        <label htmlFor="email" style={{ display: "block" }}>
          email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        {formik.touched.email && formik.errors.email && (
          <div style={{ color: "red" }}>{formik.errors.email}</div>
        )}
        <label htmlFor="password" style={{ display: "block" }}>
          password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        {formik.touched.password && formik.errors.password && (
          <div style={{ color: "red" }}>{formik.errors.password}</div>
        )}
        <button style={{ display: "block" }}>Submit</button>
      </div>
      <pre>{JSON.stringify(formik, null, 4)}</pre>
    </form>
  );
};

export default SignInForm;
