/* eslint-disable no-unused-vars */
import React from "react";
import "./PostPage.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Post from "../Post/Post";
import { Navigate, useParams } from "react-router-dom";
import { AiOutlineSend } from "react-icons/ai";
import Comment from "../Comment/Comment";
import { useCookies } from "react-cookie";

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [cookie] = useCookies("token");
  useEffect(() => {
    axios
      .get(`http://16.16.4.187/Posts/getPostById/${id}`)
      .then((res) => setPost(res.data));
  });
  const addComment = () => {
    if (comment !== "") {
      axios.defaults.headers.common["Authorization"] = `Bearer ${cookie.token}`;
      axios
        .post("http://16.16.4.187/Comments/addComment", {
          body: comment,
          postId: id,
          uId: localStorage.getItem("userId"),
        })
        .then((res) => console.log(res.data));
    }
  };
  useEffect(() => {
    axios
      .get(`http://16.16.4.187/Comments/postComment/${id}`)
      .then((res) => setComments(res.data));
  });
  return (
    <>
      {!cookie.token && <Navigate to="/" />}
      <div className="postPage col-9">
        <Post key={post._id} data={post} />
        <div className="commentArea">
          <div className="input">
            <input
              onChange={(e) => setComment(e.target.value)}
              className=""
              placeholder="Comment"
              type="text"
            />
            <button onClick={addComment}>
              <AiOutlineSend />
            </button>
          </div>
          {comments.map((comment) => {
            return <Comment key={comment._id} data={comment} />;
          })}
        </div>
      </div>
    </>
  );
}

export default PostPage;
