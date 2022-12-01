import React, { useEffect, useState } from "react";
import {
  onSnapshot,
  collection,
  doc,
  updateDoc,
  where,
  query,
  arrayRemove,
} from "firebase/firestore";
import BasicModal from "./Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AiFillEye, AiFillDelete } from "react-icons/ai";
import PasswordModal from "./PasswordsModal";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { confirm } from "react-confirm-box";

export default function Home({ database }) {
  let auth = getAuth();

  let navigate = useNavigate();
  let userEmail = localStorage.getItem("userEmail");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [passwordOpen, setPasswordOpen] = useState(false);

  const [showPassword, setShowPassword] = useState({});
  const handlePasswordClose = () => setPasswordOpen(false);
  const collectionRef = collection(database, "userpasswords");
  const emailQuery = query(collectionRef, where("email", "==", userEmail));
  const [oldPasswords, setOldPasswords] = useState([]);

  const [passwordsArray, setPasswordsArray] = useState([]);
  const [passwordObject, setPasswordObject] = useState({});
  const user = passwordsArray[0]?.name;

  const getPasswords = () => {
    onSnapshot(emailQuery, (response) => {
      setPasswordsArray(
        response.docs.map((item) => {
          return { ...item.data(), id: item.id };
        })
      );
      const data = response.docs.map((item) => {
        return { ...item.data(), id: item.id };
      });
      setOldPasswords(data[0].passwordsArray);
    });
  };

  const getPasswordInputs = (event) => {
    const data = { [event.target.name]: event.target.value };
    setPasswordObject({ ...passwordObject, ...data });
  };

  const addPasswords = () => {
    const docToUpdate = doc(database, "userpasswords", passwordsArray[0].id);
    updateDoc(docToUpdate, {
      passwordsArray: [...oldPasswords, passwordObject],
    });
    toast.success("Your Password saved successfully");
    handleClose();
  };

  const openPasswordModal = (name, password) => {
    setShowPassword({
      name: name,
      password: password,
    });
    setPasswordOpen(true);
  };

  const logout = () => {
    signOut(auth).then(() => {
      localStorage.removeItem("userEmail");
      navigate("/");
    });
  };

  const deleteField = async (arrayId) => {
    const result = await confirm("Are you sure?");
    if (result) {
      const docToUpdate = doc(database, "userpasswords", passwordsArray[0].id);
      updateDoc(docToUpdate, {
        passwordsArray: arrayRemove(arrayId),
      });
      toast.error("Password deleted from the database");
      return;
    }
  };

  const gotoGen = () => {
    navigate("/gen");
  };

  useEffect(() => {
    onAuthStateChanged(auth, (response) => {
      if (response) {
        getPasswords();
      } else {
        navigate("/");
      }
    });
  }, []);

  return (
    <div className="home-main">
      <ToastContainer />
      <h1 className={"h1"}>MASTER SECURITY</h1>
      <button className="generatebutton" onClick={gotoGen}>
        Generator
      </button>
      <div onClick={logout} className="logout-button">
        <h2 className={"h2"}>Welcome, {user}</h2>

        <button className="input-btn add-password">Logout</button>
      </div>
      <div className="card-main">
        <button onClick={handleOpen} className="input-btn add-password">
          Add password
        </button>

        <div className="password-main">
          {passwordsArray.map((password) => {
            return (
              <div>
                {password.passwordsArray.map((password) => {
                  return (
                    <div className="password-data">
                      <p className="password-display">{password.name}</p>
                      <AiFillEye
                        size={30}
                        className="eye-icon"
                        onClick={() =>
                          openPasswordModal(password.name, password.password)
                        }
                      />
                      <AiFillDelete
                        size={24}
                        className="delete-icon"
                        onClick={() => deleteField(password)}
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <BasicModal
        open={open}
        handleClose={handleClose}
        getPasswordInputs={getPasswordInputs}
        addPasswords={addPasswords}
        handlePasswordClose={handlePasswordClose}
      />
      <PasswordModal
        open={passwordOpen}
        handleClose={handlePasswordClose}
        showPassword={showPassword}
        originalPassword={passwordsArray[0]?.password}
        handlePasswordClose={handlePasswordClose}
      />
    </div>
  );
}
