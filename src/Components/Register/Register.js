import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import axios from "axios";
//import './Register.css'

function Register() {
  const [cookies, setCookies] = useCookies([]);

  const navigate = useNavigate();
  useEffect(() => {
    const verifyUser = async () => {
      if (cookies.jwt) {
        navigate("/home");
      } else {
        navigate("/register");
      }
    };
    // verifyUser();
  }, [cookies, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const generateError = (err) =>
    toast.error(err, {
      position: "top-center",
    });

  const onSubmit = async (values) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}register`,
        {
          ...values,
        },
        {
          withCredentials: true,
        }
      );

      console.log(data);

      if (data) {
        if (data.errors) {
          const { fullName, email, password } = data.errors;
          if (fullName) generateError(fullName);
          else if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          navigate("/home");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="page" id="login">
      <div className="container">
        <div class="row logo_style"> 
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Sign Up</h2>
          <div>
            <label htmlFor="username">Full Name</label>
            <input
              type="text"
              name="fullName"
              {...register("fullName", {
                required: "Full Name is required",
                maxLength: {
                  value: 10,
                  message: "Name cannot exceed more than 10 characters",
                },
              })}
            />
            {errors.fullName && (
              <p style={{ color: "red" }}>{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Enter valid email",
                },
              })}
            />
            {errors.email && (
              <p style={{ color: "red" }}>{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 4,
                  message: "Password must be more than 4 characters",
                },
                maxLength: {
                  value: 8,
                  message: "Password cannot exceed more than 8 characters",
                },
              })}
            />
            {errors.password && (
              <p style={{ color: "red" }}>{errors.password.message}</p>
            )}
          </div>
          <div style={{ display: "flow-root", padding: "20" }}>
            <input
              style={{ display: "flow-root", padding: "20" }}
              type="checkbox"
            />{" "}
            Yes, Brilliant Prep can email me with promotions and news.
            (optional)
            <br />
            <br />
            By signing up, I agree to Brilliant Prep's Terms of Use & Privacy
            Policy, and the Terms of Use & Privacy Policy of the learning
            platform.
          </div>

          <button type="submit">Sign up</button>
          <span>
            Already have an account ? <Link to="/">Login</Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Register;
