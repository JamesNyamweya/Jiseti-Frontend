import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import ModalWrapper from "../components/ModalWrapper";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../features/authSlice";

export default function LoginForm({ onClose, onSwitch }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (values, setSubmitting) => {
    try {
      const response = await axios.post(
        "https://jiseti-backend-nwg1.onrender.com/login",
        values
      );

      const { access_token, user } = response.data;

      dispatch(loginSuccess({ access_token, user }));
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Login successful!");

      // Close modal and navigate
      onClose?.();
      navigate(user.role === "admin" ? "/admin" : "/user_dash");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

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
          handleLogin(values, setSubmitting);
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
              className="w-full hover:cursor-pointer bg-blue-600 text-white py-2 rounded"
            >
              {isSubmitting ? "Logging in..." : "Login"}
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
