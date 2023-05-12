/* eslint-disable no-unused-vars */
import React from "react";
import "./Login.css";
import { useState } from "react";
import userImage from "../../Img/undraw_Male_avatar_re_y880.png";
import axios from "axios";
import { useCookies } from "react-cookie";

function Login() {
  // Cookies
  const [Cookies, setCookies] = useCookies("token");

  // state to switch between login and sign up Forms
  const [login, setLogIn] = useState(true);

  // switch to login form
  const changetoin = () => {
    setLogIn(true);
  };

  // switch to sign up form
  const changetoup = () => {
    setLogIn(false);
  };
  const [username1, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // state to handel errors
  const [error, setError] = useState("");

  // function to check if the user exists in db
  const loginfunc = async () => {
    await axios
      .post("https://node-js-back-end.onrender.com/Users/login", {
        username: username1,
        password: password,
      })
      .then((res) => {
        if (res.data.token) {
          setCookies("token", res.data.token);
          window.localStorage.setItem("userId", res.data.id);
          window.location.assign("/Home");
        } else {
          setError(res.data.message);
        }
      })
      .catch((err) => console.log({ err: err }));
  };
  // function to add user to db
  const signupfunc = () => {
    if (username1 !== "" && password !== "") {
      axios
        .post("https://node-js-back-end.onrender.com/Users/add", {
          username: username1,
          password: password,
        })
        .then((res) => {
          if (res.data.message) {
            setError(res.data.message);
          } else {
            setLogIn(true);
          }
        });
    } else {
      setError("username or password can't be empty");
    }
  };
  // function to handel error and display it
  const err = () => {
    if (error) {
      return <p className="alert alert-danger text-center">{error}</p>;
    }
  };

  return (
    <>
      {/* navigate to Home page if the user is logged in */}
      {Cookies.token && window.location.assign("/Home")}
      <div className="container login">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-4 col-10 container">
            {/* check which form to be displayed form */}
            {login ? (
              <Form
                type="Login"
                next="Don't have Account ?"
                change={changetoup}
                func={loginfunc}
                dataToHandel={{ setUsername, setPassword }}
              />
            ) : (
              <Form
                type="Sign Up"
                next="Already have Account"
                change={changetoin}
                func={signupfunc}
                dataToHandel={{ setUsername, setPassword }}
              />
            )}

            {/* display the error if exists */}
            {err()}
          </div>
        </div>
      </div>
    </>
  );
}

// Form component
function Form(props) {
  const handelSubmit = (e) => {
    e.preventDefault(); // stop the refresh after sending data
  };
  return (
    <form onSubmit={handelSubmit} className="container loginForm">
      <img src={userImage} className="img-fluid" alt="LoginPhoto" />
      <input
        type="text"
        className="form-control"
        id="username"
        aria-describedby="helpId"
        placeholder="User Name"
        onChange={(e) => {
          props.dataToHandel.setUsername(e.target.value);
        }}
      />
      <input
        type="password"
        className="form-control"
        id="password"
        aria-describedby="helpId"
        placeholder="Password"
        onChange={(e) => {
          props.dataToHandel.setPassword(e.target.value);
        }}
      />
      <input
        value={props.type}
        type="button"
        onClick={props.func}
        className="btn btn-primary"
      />
      <button type="button" onClick={props.change} className="btn btn-success">
        {props.next}
      </button>
    </form>
  );
}

export default Login;
