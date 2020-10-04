import { Button, Form, Input } from "antd";
import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import fire from "../../firebase";

const LoginForm = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const handleLogin = (values) => {
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        }
      });
  };

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        clearInputs();
      } else {
        setUser("");
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  if (user) {
    return (
      <Redirect
        to={{
          pathname: "/dashboard",
          state: { user: user.email }, //pending
        }}
      />
    );
  }

  return (
      <div className="auth-container">
          <Form onFinish={(values) => handleLogin(values)}>
              <h1>Login to Recall</h1>
              <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: "Please provide email" }]}
              >
                  <Input type="email" />
              </Form.Item>
              <p>{emailError}</p>
              <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                      { required: true, message: "Please provide password" },
                  ]}
              >
                  <Input type="password" />
              </Form.Item>

                <p>{passwordError}</p>
              <Form.Item>
                <Button type="primary" htmlType="submit" size="large" shape="round">Login</Button>
              </Form.Item>
              <Link to="/register">Don't have an account?</Link>
          </Form>
      </div>
  );
};

function Login() {
  return (
    <div className="login">
      <LoginForm />
    </div>
  );
}

export default Login;
