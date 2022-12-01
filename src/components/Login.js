import React from "react";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirm } from "react-confirm-box";

export default function Login() {
  const [loginData, setLoginData] = useState({});
  const auth = getAuth();
  const onInput = (event) => {
    let data = { [event.target.name]: event.target.value };
    setLoginData({ ...loginData, ...data });
  };

  let navigate = useNavigate();
  const login = () => {
    signInWithEmailAndPassword(auth, loginData.email, loginData.password)
      .then((response) => {
        localStorage.setItem("userEmail", response.user.email);
        toast.success("Logged in successfully");
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      })
      .catch((error) => {
        toast.error(`${error}`);
      });
  };

  const forgetPassword = async () => {
    const result = await confirm("Are you sure?");
    if (result) {
      if (loginData.email === "") {
        toast.error("Enter Email in the input field");
      } else {
        await sendPasswordResetEmail(auth, loginData.email)
          .then(() => {
            toast.success("Password reset email sent");
          })
          .catch((error) => {
            toast.error(`${error}`);
          });
      }
    }
  };

  return (
    <div className="register-main">
      <ToastContainer />
      <h1 className={"h1"}>MASTER SECURITY</h1>

      <div className="card-main">
        <div className="inputs-container">
          <input
            placeholder="Enter your Email"
            className="input-fields"
            onChange={onInput}
            type="email"
            name="email"
          />
          <input
            placeholder="Enter your Password"
            className="input-fields"
            onChange={onInput}
            name="password"
            type={"password"}
          />
          <button className="input-btn" onClick={login}>
            Sign In
          </button>
          <Link style={{ color: "coral", fontSize: 15 }} to="/register">
            Don't have an account? click here
          </Link>
          <Link
            onClick={forgetPassword}
            style={{ color: "coral", fontSize: 15 }}
          >
            forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
}
