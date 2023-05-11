import React from "react";
import ProfileImg from "../profileImg/ProfileImg";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
function Comment({ data }) {
  const date = data.date.slice(0, 10);
  const deleteComment = () => {
    console.log("deleted");
    axios.delete(
      `https://sw-team-14-isiu.onrender.com/Comments/deleteComment/${data._id}`
    );
  };
  return (
    <div className="comments">
      <div className="post-header">
        <ProfileImg />
        <div className="">
          <p className="author m-0 p-0">{data.uId.name}</p>
          <p className="date m-0 p-0">{date}</p>
        </div>
        {data.uId._id === localStorage.getItem("userId") && (
          <div className="controls options">
            <AiFillDelete
              onClick={deleteComment}
              className="mx-2 text-danger"
            />
          </div>
        )}
      </div>
      <p className="commentBody">{data.body}</p>
    </div>
  );
}

export default Comment;
