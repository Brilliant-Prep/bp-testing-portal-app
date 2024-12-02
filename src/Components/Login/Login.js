import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import './Login.css'; // Import your CSS file


function Login() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}login`,
        {
          ...values,
        },
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("token", data.token);
      localStorage.setItem("userid", data.user._id);
      localStorage.setItem("timeroptions", data.user.timeroptions);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("first_name", data.user.first_name);
      localStorage.setItem("last_name", data.user.last_name);
      if(data.user.role=='admin' || data.user.role=='subadmin') navigate("/dashboard");
      else  navigate("/resources");
      window.location.reload(true);
    } catch (error) {
      alert(error);
    }
  };

  // jwt validation

  const [cookies, setCookies] = useCookies([]);
  useEffect(() => {
    const verifyUser = async () => {
      if (cookies.jwt) {
        navigate("/home");
      } else {
        navigate("/");
      }
    };
    verifyUser();
  }, [cookies, navigate]);

  return (
    <div class="login-container">
        <div class="image-div"><img src="/images/login_Illustration.svg"/></div>
        <div class="form-div">
        <div class="form-container"> 
              <img src="/logo.png" alt="Brilliant Prep Logo" class="logo"/>
              <div class="form-header">Sign In</div>
              <a href="#" class="signup-link"><span>No account yet?</span> Sign up →</a>
               
              <form 
                 autoComplete="off" 
                 onSubmit={(e) => handleSubmit(e)}>
                <div class="inputBox">
                    <input
                    placeholder="Email Address"
                    id="uname"
                    type="email"
                    name="email"
                    onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}/>
                

                    <input
                    placeholder="Password"
                    id="pass"
                    type="password"
                    name="password"
                    onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
                
                </div>

                <div class="options">
                  <label><input type="checkbox" class="forgot_chkbox" /> Remember me</label>
                </div>

                <div class="login-btn">
                  <input type="submit" value="Sign In" />
                </div>

                <div class="forgotpassword">
                  <a href="#" class="forgot-link">Forgot Password?</a>
                </div>
              </form>
            </div>
        </div>
  </div>
  );
}

export default Login;
