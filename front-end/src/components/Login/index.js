import React, {useState, useEffect} from 'react';
import { Link, Redirect } from 'react-router-dom';
import fire from '../../firebase';
import "./login.css";

const LoginForm = () => {

const[user, setUser] = useState('');
const[email, setEmail] = useState('');
const[password, setPassword] = useState('');

const[emailError, setEmailError] = useState('');
const[passwordError, setPasswordError] = useState('');

const [loggedIn, setLoggedIn] = useState(false);

const clearInputs = () => {
  setEmail('');
  setPassword('');
};

const clearErrors = () => {
  setEmailError('');
  setPasswordError('');
};

const handleLogin = () => {
  clearErrors();
  fire
  .auth()
  .signInWithEmailAndPassword(email,password)
  .catch(err => {
    switch(err.code) {
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
    if(user) {
      setUser(user);
      clearInputs();
    } else {
      setUser('');
    }
  })
};

useEffect(() => {
  authListener();
}, []);

if(user) {
  return (
    <Redirect to={{
    pathname: "/dashboard",
    state: {user: user.email} //pending
  }}/>
  )
}

        return (
          <div className = "LoginForm">
            <label> Email </label>
            <input
              type = "text"
              autoFocus
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p>{emailError}</p>
            <label> Password </label>
            <input
              type = "password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p>{passwordError}</p>
            <input onClick = {handleLogin} className="submit-btn" type="submit" value="Login" />
            </div>
        );
};

function Login() {

  return (
    <div className = "login">
      <h1 className = "title">Collab Notes - LOGIN</h1>
      <LoginForm />
      <p className="prompt-create-user clickable"> <Link className = "link" to='/Register'>Don't Have an Account?</Link></p>
    </div>
  );
}

export default Login;
