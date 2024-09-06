import "./form.css";
import { Formik, FormikHelpers } from "formik";
import { object, string } from "yup";
import { setLogin } from "../../state/authSlice";
import { useAppDispatch } from "../../state/hooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

interface RegisterFormValues {
  name: string;
  username: string;
  email: string;
  password: string;
  cnp: string;
  address: string;
  county: string;
  town: string;
  phoneNumber: string;
  [key: string]: string; //index signature for dynamic fields
}

interface LoginFormValues {
  username: string;
  password: string;
}

const registerSchema = object({
  name: string().required("Name is required."),
  username: string().required("Username is required."),
  email: string().email().required("Email is required."),
  password: string().required("Password is required."),
  cnp: string().required("CNP is required"),
  address: string().required("Address is required."),
  county: string().required("County is required."),
  town: string().required("Town is required."),
  phoneNumber: string().required("Phone number is required."),
});

const loginSchema = object({
  username: string().required("Username is required."),
  password: string().required("Password is required."),
});

const initialValuesRegister: RegisterFormValues = {
  name: "",
  username: "",
  email: "",
  password: "",
  cnp: "",
  address: "",
  county: "",
  town: "",
  phoneNumber: "",
};

const initialValuesLogin: LoginFormValues = {
  username: "",
  password: "",
};

const Form = () => {
  const [page, setPage] = useState("login");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLogin = page === "login";
  const isRegister = page === "register";

  const register = async (
    values: RegisterFormValues,
    onSubmitProps: FormikHelpers<RegisterFormValues>
  ) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }

    const savedUserResponse = await fetch(
      "http://localhost:3001/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );

    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) setPage("login");
  };

  const login = async (
    values: LoginFormValues,
    onSubmitProps: FormikHelpers<LoginFormValues>
  ) => {
    const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();

    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
          isAdmin: loggedIn.isAdmin,
        })
      );
      if (loggedIn.user.isAdmin) {
        navigate("/admin/home");
      } else {
        navigate("/home");
      }
    }
  };

  const handleFormSubmit = async (
    values: RegisterFormValues | LoginFormValues,
    onSubmitProps: FormikHelpers<RegisterFormValues | LoginFormValues>
  ) => {
    if (isLogin) {
      await login(
        values as LoginFormValues,
        onSubmitProps as FormikHelpers<LoginFormValues>
      );
    } else {
      await register(
        values as RegisterFormValues,
        onSubmitProps as FormikHelpers<RegisterFormValues>
      );
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({ values, handleChange, handleBlur, handleSubmit, resetForm }) => (
        <form onSubmit={handleSubmit}>
          <div id="form">
            {isRegister && (
              <div className="register">
                <input
                
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  id="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={(values as RegisterFormValues).name}
                  name="name"
                />

                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                  name="username"
                />

                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                />

                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={(values as RegisterFormValues).email}
                  name="email"
                />

                <input
                  type="text"
                  className="form-control"
                  id="cnp"
                  placeholder="CNP"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={(values as RegisterFormValues).cnp}
                  name="cnp"
                />

                <input
                  type="text"
                  className="form-control"
                  id="phoneNumber"
                  placeholder="Phone Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={(values as RegisterFormValues).phoneNumber}
                  name="phoneNumber"
                />

                <input
                  type="text"
                  className="form-control"
                  id="address"
                  placeholder="Address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={(values as RegisterFormValues).address}
                  name="address"
                />

                <input
                  type="text"
                  className="form-control"
                  id="county"
                  placeholder="County"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={(values as RegisterFormValues).county}
                  name="county"
                />

                <input
                  type="text"
                  className="form-control"
                  id="town"
                  placeholder="Town"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={(values as RegisterFormValues).town}
                  name="town"
                />
              </div>
            )}
            {isLogin && (
              <div className="login"
              >
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                  name="username"
                />

                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                />
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            {isLogin ? "LOGIN" : "REGISTER NOW"}
          </button>

          <p
            onClick={() => {
              setPage(isLogin ? "register" : "login");
              resetForm();
            }}
          >
            {isLogin
              ? "Don't have an account? Register here!"
              : "Already have an account? Login here."}
          </p>
        </form>
      )}
    </Formik>
  );
};

export default Form;
