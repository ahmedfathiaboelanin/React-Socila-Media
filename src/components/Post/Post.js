/* eslint-disable no-unused-vars */
import React from "react";
import "./Post.css";
import ProfileImg from "../profileImg/ProfileImg";
import { BiCommentDetail } from "react-icons/bi";
import axios from "axios";
import { AiFillEdit, AiFillDelete, AiFillLike } from "react-icons/ai";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

function Post({ data }) {
  const handelLikes = (e) => {
    e.target.classList.toggle("liked");
  };
  const [cookie] = useCookies("token");

  const deletePost = () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${cookie.token}`;
    axios
      .delete(`http://16.16.107.114/Posts/deletePost/${data._id}`)
      .then((res) => console.log(res.data));
  };
  const path = `/postPage/${data._id}`;
  return (
    <div className="post">
      <div className="post-header">
        <ProfileImg />
        <div className="">
          <p className="author m-0 p-0">
            {data.author ? data.author : "Author"}
          </p>
          <p className="date m-0 p-0">
            {data.createdAt ? data.createdAt.slice(0, 10) : "Unknown"}
          </p>
        </div>
        {data.userId === localStorage.getItem("userId") && (
          <div className="controls options">
            <AiFillDelete onClick={deletePost} className="mx-2 text-danger" />
          </div>
        )}
      </div>
      <div className="post-content">
        <h6 className="py-1">{data.title}</h6>
        {data.body}
      </div>
      <hr className="py-1 m-0" />
      <div className="w-100 likeCount d-flex justify-content-between">
        <div>{data.likes} Likes</div>
        <div>100 Comments</div>
      </div>
      <hr className="py-1 m-0" />
      <div className="post-foot">
        <button onClick={handelLikes} className="react">
          <AiFillLike />
        </button>
        <Link to={path} className="comment">
          <BiCommentDetail />
        </Link>
      </div>
    </div>
  );
}

export default Post;
