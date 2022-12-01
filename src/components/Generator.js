import { useState } from "react";
import { AiFillCopy } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import copy from "copy-to-clipboard";
import { useNavigate } from "react-router-dom";

export default function Generator() {
  const [displayPassword, setDisplayPassword] = useState(null);
  let navigate = useNavigate();

  const createPass = () => {
    const generate = () => {
      var pass = "";
      var str =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
        "abcdefghijklmnopqrstuvwxyz0123456789@#$";

      for (let i = 10; i >= 0; i--) {
        var char = Math.floor(Math.random() * str.length + 1);

        pass += str.charAt(char);
      }

      return pass;
    };
    var gpassworded = generate();
    setDisplayPassword(gpassworded);
  };

  return (
    <div className="register-main">
      <ToastContainer />
      <h1 className={"h1"}>Generate a Strong Password Here...</h1>
      <div className="card-main">
        <div className="inputs-container">
          <button className="input-btn" onClick={createPass}>
            Generate
          </button>
          <input
            placeholder={
              displayPassword
                ? displayPassword
                : "Your Password will be displayed here"
            }
            className="input-fields input"
            type="email"
            name="email"
          />
          <div className="copy">
            <AiFillCopy
              onClick={() => {
                copy(displayPassword);
                toast.success("Password Copied successfully");
                setTimeout(() => {
                  navigate("/home");
                }, 2000);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
