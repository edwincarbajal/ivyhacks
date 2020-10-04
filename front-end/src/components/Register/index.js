import { Form, Input, Button } from "antd";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import fire from "../../firebase";

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

    const handleSignup = (values) => {
        clearErrors();
        fire.auth()
            .createUserWithEmailAndPassword(values.email, values.password)
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
        <Form onFinish={(values) => handleSignup(values)}>
            <h1>Sign up for Recall</h1>
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
                rules={[{ required: true, message: "Please provide password" }]}
            >
                <Input type="password" />
            </Form.Item>

            <p>{passwordError}</p>
            <Form.Item>
                <Button type="primary" htmlType="submit" size="large" shape="round">Sign Up</Button>
            </Form.Item>
            <Link to="/login">Already have an account?</Link>
        </Form>
    );
};

function Register(props) {
    return (
        <div className="auth-container">
            <RegisterForm />
        </div>
    );
}

export default Register;
