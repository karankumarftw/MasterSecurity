import React from "react";
import { useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register({ database }) {
  const [registerData, setRegisterData] = useState({});
  const collectionRef = collection(database, "userpasswords");
  const auth = getAuth();
  let navigate = useNavigate();

  const onInput = (event) => {
    let data = { [event.target.name]: event.target.value };
    setRegisterData({ ...registerData, ...data });
  };

  const register = () => {
    createUserWithEmailAndPassword(
      auth,
      registerData.email,
      registerData.password
    )
      .then((response) => {
        sessionStorage.setItem("userEmail", response.user.email);
        addDoc(collectionRef, {
          name: registerData.name,
          email: registerData.email,
          password: registerData.password,
          passwordsArray: [],
        })
          .then(() => {
            toast.success("Registered successfully");
            setTimeout(() => {
              navigate("/");
            }, 2000);
          })
          .catch((err) => {
            toast.error("Something went please check the inputs");
          });
      })
      .catch((error) => {
        toast.error(`${error}`);
      });
  };
  return (
    <div className="register-main">
      <ToastContainer />
      <h1 className={"h1"}>Register</h1>

      <div className="card-main">
        <div className="inputs-container">
          <input
            placeholder="Enter your Name"
            className="input-fields"
            onChange={onInput}
            type="name"
            name="name"
          />
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

          <button className="input-btn" onClick={register}>
            Sign Up
          </button>
          <Link style={{ color: "coral" }} to="/">
            Already Registered?
          </Link>
        </div>
      </div>
    </div>
  );
}
