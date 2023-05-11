import React from "react";
import "./UserPosts.css";
import Post from "../Post/Post";
import axios from "axios";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Modal from "../AddPost/Modal/Modal";
import { AiOutlineSearch } from "react-icons/ai";

function UserPosts() {
  const [cookie] = useCookies("token");
  const [posts, setPosts] = useState([]);
  axios.defaults.headers.common["Authorization"] = `Bearer ${cookie.token}`;
  useEffect(() => {
    axios
      .get("http://16.16.107.114/Posts/getUserPosts")
      .then((res) => setPosts(res.data));
  }, [posts]);
  const [search, setSearch] = useState("");
  const searchPosts = () => {
    axios.get("http://16.16.107.114/Posts/getUserPosts");
  };
  return (
    <div className="userPosts p-3 row justify-content-center gap-3">
      <div className="col-sm-8 col-10">
        <div className="head">
          <div className="my-3 controlArea bg-light">
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              className="form-control"
              placeholder="filter with Post Content"
            />
            <button className="searchBtn">
              <AiOutlineSearch />
            </button>
          </div>
          <Modal />
        </div>
        {posts
          .filter((post) =>
            post.body.toLowerCase().includes(search.toLowerCase())
          )
          .map((post) => {
            return (
              <div key={post._id} className="my-2">
                <Post data={post} />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default UserPosts;
