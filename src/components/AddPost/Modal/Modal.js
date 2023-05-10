import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";

function Example() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [cookies, setCookie] = useCookies(["token"]);

  const userData = jwtDecode(cookies.token);

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const addPostFunc = (e) => {
    e.preventDefault();
    axios.post("http://16.16.4.187/Posts/add", {
      body: content,
      title: title,
      userId: localStorage.getItem("userId"),
      author: userData.user.name,
    });
    handleClose();
  };
  return (
    <>
      <Button className="addBtn" onClick={handleShow}>
        Add Post
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addPostFunc} className="addForm p-0">
            <div className="mb-3 w-100">
              <input
                onChange={(e) => setTitle(e.target.value)}
                className="form-control"
                placeholder="Post Title"
                name="postContent"
                id=""
                rows="3"
              ></input>
            </div>
            <div className="mb-3 w-100">
              <textarea
                onChange={(e) => setContent(e.target.value)}
                className="form-control"
                placeholder="Post Content"
                name="postContent"
                id=""
                rows="3"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-success">
              Add Post
            </button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
