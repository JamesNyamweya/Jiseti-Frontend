import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import ModalWrapper from "../components/ModalWrapper";

export default function SignupForm({ onClose, onSwitch }) {
  return (
    <ModalWrapper
      title="Create Account"
      imagePath="src/assets/signup.svg"
      onClose={onClose}
    >
      <Formik
        initialValues={{ name: "", username: "", email: "", password: "" }}
        validationSchema={Yup.object({
          name: Yup.string().required("Required"),
          username: Yup.string().required("Required"),
          email: Yup.string().email("Invalid email").required("Required"),
          password: Yup.string()
            .min(6, "Min 6 characters")
            .required("Required"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const nameParts = values.name.trim().split(" ");
            const firstName = nameParts[0];
            const lastName = nameParts.slice(1).join(" ") || "_";

            const payload = {
              username: values.username,
              first_name: firstName,
              last_name: lastName,
              email: values.email,
              password: values.password,
            };

            const res = await axios.post(
              "https://jiseti-backend-nwg1.onrender.com/signup",
              payload
            );
            toast.success("Account created successfully!");
            console.log(res.data);

            onClose();
          } catch (error) {
            toast.error(
              error.response?.data?.message || "Signup failed. Try again."
            );
            console.error(error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <Field
              name="name"
              type="text"
              placeholder="Full Name"
              className="w-full p-2 border rounded"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-sm"
            />

            <Field
              name="username"
              type="text"
              placeholder="Username"
              className="w-full p-2 border rounded"
            />
            <ErrorMessage
              name="username"
              component="div"
              className="text-red-500 text-sm"
            />

            <Field
              name="email"
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm"
            />

            <Field
              name="password"
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 rounded"
            >
              Sign Up
            </button>

            <p className="text-sm text-center mt-2">
              Already have an account?{" "}
              <span className="text-blue-600 cursor-pointer" onClick={onSwitch}>
                Login
              </span>
            </p>
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
}
