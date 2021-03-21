import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    error: '',
    success: false
  })

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
  const handleGoogleSignIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        const { displayName, email } = result.user;
        const signedInUser = { name: displayName, email, isSignedIn: true };
        setLoggedInUser(signedInUser);
        history.replace(from);
      })
      .catch((error) => {
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  const handleFacebookSignIn = () => {
    var fbProvider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        const { displayName, email } = result.user;
        const signedInUser = { name: displayName, email, isSignedIn: true };
        setLoggedInUser(signedInUser);
        history.replace(from);
      })
      .catch((error) => {
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  const handleBlur = (event) => {
    let isFieldValid = true;
    if (event.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
    }

    if (event.target.name === 'password') {
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
      setLoggedInUser(newUserInfo);
      console.log(user);
    }
  }

  const handleSubmit = (event) => {
    // console.log(user.email, user.password);
    if (user.email && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(res => {
          // console.log(res);
          const newUserInfo = { ...user };
          newUserInfo.success = true;
          newUserInfo.error = '';
          setUser(newUserInfo);
          const { displayName, email } = res.user;
          const signedInUser = { name: displayName, email, isSignedIn: true };
          setLoggedInUser(signedInUser);
          history.replace(from);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
        });
    }
    event.preventDefault();
  }
  return (
    <div className="login-page">
      <h3>this is login page</h3>
      <form className="login-form" onSubmit={handleSubmit}>
        <input type="text" name="name" onBlur={handleBlur} placeholder="Enter your name" required />
        <br />
        <input type="email" name="email" onBlur={handleBlur} placeholder="Enter your email" required />
        <br />
        <input type="password" name="password" onBlur={handleBlur} placeholder="Enter password" required />
        <br />
        <input type="password" name="password" onBlur={handleBlur} placeholder="Confirm password" required />
        <br />
        <input type="submit" value="Create an account" />
        <p>Already have an account? <Link to='/login'>Login</Link></p>
      </form>
      <p style={{ color: 'red' }}>{user.error}</p>
      {
        user.success && <p style={{ color: 'green' }}>New user created Successfully</p>
      }
      <button className="btn btn-primary mt-4" onClick={handleGoogleSignIn}>Sign in with Google</button> <br />
      <button className="btn btn-primary mt-4" onClick={handleFacebookSignIn}>Sign in with Facebook</button>
    </div>
  );
};

export default Login;