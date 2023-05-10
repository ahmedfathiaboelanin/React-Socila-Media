/* eslint-disable no-unused-vars */
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useCookies } from "react-cookie";
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Profile from './components/Profile/Profile'
import Nav from './components/Nav/Nav';
import EditProfile from './components/profileImg/EditProfile/EditProfile';
import UserPosts from './components/UserPosts/UserPosts';
import PostPage from './components/PostPage/PostPage';

function App() {
  const [Cookies] = useCookies("token");
  return (
    <div className="App">
      <BrowserRouter>
        {Cookies.token && <Nav />}
        <div className="content row justify-content-center">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/editProfile" element={<EditProfile/>} />
            <Route path="/UserPosts" element={<UserPosts/>} />
            <Route path="/postPage/:id" element={<PostPage/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
