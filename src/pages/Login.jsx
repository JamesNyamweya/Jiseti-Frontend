import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import ModalWrapper from "../components/ModalWrapper";

export default function LoginForm({ onClose, onSwitch }) {
  return (
    <ModalWrapper
      title="Login to Jiseti"
      imagePath="src/assets/login.svg"
      onClose={onClose}
    >
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string().email("Invalid email").required("Required"),
          password: Yup.string().required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          toast.success("Logged in!");
          console.log(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
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
              Login
            </button>

            <p className="text-sm text-center mt-2">
              Don’t have an account?{" "}
              <span className="text-blue-600 cursor-pointer" onClick={onSwitch}>
                Sign up
              </span>
            </p>
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
}
