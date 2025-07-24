import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
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
        initialValues={{ name: "", email: "", contact_info: "", password: "" }}
        validationSchema={Yup.object({
          name: Yup.string().required("Required"),
          email: Yup.string().email("Invalid email").required("Required"),
          contact_info: Yup.string().required("Required"),
          password: Yup.string()
            .min(6, "Min 6 characters")
            .required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          toast.success("Account created!");
          console.log(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <Field
              name="name"
              type="text"
              placeholder="Name"
              className="w-full p-2 border rounded"
            />
            <ErrorMessage
              name="name"
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
              name="contact_info"
              type="text"
              placeholder="Contact Info"
              className="w-full p-2 border rounded"
            />
            <ErrorMessage
              name="contact_info"
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
