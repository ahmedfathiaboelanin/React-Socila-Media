/* eslint-disable no-unused-vars */
import React from "react";
import "./EditProfile.css";
import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie"; // to fetch the cookies stored

function EditProfile() {
  const [cookie, setCookie] = useCookies("token");
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  function update() {
    axios.defaults.headers.common["Authorization"] = `Bearer ${cookie.token}`;
    axios
      .put("https://sw-team-14-isiu.onrender.com/Users/update", {
        name: newName,
        email: newEmail,
        password: newPassword,
        phone: newPhone,
      })
      .then((res) => console.log(res.data))
      .then(() => {
        alert("you will be log out to apply your updates");
        setCookie("token", "");
        localStorage.setItem("userId", "");
        window.location.assign("/");
      });
  }
  return (
    <div className="row edit m-0 p-0">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="updateForm col-md-4 col-sm-5 col-10"
      >
        <input
          className="form-control"
          placeholder="New Name (optional)"
          type="text"
          onChange={(e) => setNewName(e.target.value)}
        />
        <input
          className="form-control"
          placeholder="New Email (optional)"
          type="email"
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <input
          className="form-control"
          placeholder="New Phone (optional)"
          type="phone"
          onChange={(e) => setNewPhone(e.target.value)}
        />
        <input
          className="form-control"
          placeholder="New Password (optional)"
          type="password"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button className="btn-primary btn" onClick={update}>
          Edit
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
