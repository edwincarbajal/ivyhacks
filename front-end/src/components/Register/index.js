import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import fire from "../../firebase";
import "./register.css";

const RegisterForm = (props) => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const handleSignup = () => {
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
        }
      });
  };

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        setUser(user);
      } else {
        setUser("");
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  return (
    <div className="LoginForm">
      <label> Email </label>
      <input
        type="text"
        autoFocus
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <p>{emailError}</p>
      <label> Password </label>
      <input
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <p>{passwordError}</p>
      <input
        onClick={handleSignup}
        className="submit-btn"
        type="submit"
        value="Register"
      />
    </div>
  );
};

function Register(props) {
  return (
    <div className="register">
      <h1 className="title">Collab Notes - REGISTER</h1>
      <RegisterForm />
      <p className="prompt-create-user clickable">
        {" "}
        <Link className="link" to="/Login">
          Already Have an Account?
        </Link>
      </p>
    </div>
  );
}

export default Register;
