/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./Home.css";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import AddPost from "../AddPost/AddPost";
import Post from "../Post/Post";
import axios from "axios";
import Side from "../Side/Side";
import { useCookies } from "react-cookie";

function Home() {
  const [Cookies] = useCookies("token");
  const [post, setPost] = useState([]);
  const [friend, setFriend] = useState([]);

  useEffect(() => {
    axios
      .get("https://node-js-back-end.onrender.com/Posts")
      .then((res) => setPost(res.data));
  });
  useEffect(() => {
    axios
      .get(`https://node-js-back-end.onrender.com/Users`)
      .then((res) => setFriend(res.data.slice(0, 7)));
  });
  return (
    <>
      <Side title="Links" dir="right" arr={friend} />
      <Side title="Contact" dir="left" arr={friend} />
      {!Cookies.token && <Navigate to="/" />}
      <div className="home col-sm-5 col-11">
        <AddPost />
        {post.map((post) => {
          return <Post key={post._id} data={post} />;
        })}
      </div>
    </>
  );
}

export default Home;
