/* eslint-disable no-unused-vars */
import React from 'react'
import './Nav.css'
import { Link } from 'react-router-dom'
import {
  CgProfile,
  CgSearch,
  CgBell,
  CgMail,
  CgMenuRightAlt,
  CgClose,
} from "react-icons/cg";
import logo from '../../Img/010.png'
import { useCookies } from "react-cookie";
import ListItem from "../ListItem/ListItem"
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";


function Nav() {
  const [Cookies, setCookies] = useCookies("token");
  
  const logoutFunc = () => {
    setCookies("token", "");
    window.localStorage.setItem("userId", "");
    window.location.assign("/");
  }
  const toggleNav = () => {
    document.getElementById("smNav").classList.toggle("hide");
  }
    return (
      <div className="nav">
        <div className="bigNav py-2 px-sm-5 px-2">
          <div className="navLogo">
            <Link to="/Home">
              <img src={logo} alt="Logo" />
            </Link>
          </div>
          <div className="searchArea">
            <>
              <input type="search" placeholder="Search" />
              <button className="text-black">
                <CgSearch />
              </button>
            </>
          </div>
          <div className="notifications">
            <div className="dropdown">
              <CgMail className="bell d-sm-flex d-none" />
              <CgBell className="bell d-sm-flex d-none" />
              <DropdownButton
                id="dropdown-basic-button"
                className=" d-sm-flex d-none"
                title={<CgProfile />}
              >
                <Dropdown.Item className="drop">
                  <Link className="LinkDrop" to="/Home">
                    Home
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link className="LinkDrop" to="/profile">
                    Account
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <button
                    onClick={logoutFunc}
                    className=" bg-danger LinkDrop out"
                    to="/"
                  >
                    Logout
                  </button>
                </Dropdown.Item>
              </DropdownButton>
              <CgMenuRightAlt
                onClick={toggleNav}
                className="bell d-flex d-sm-none"
              />
            </div>
          </div>
        </div>
        <div id="smNav" className="smNav d-flex d-sm-none">
          <CgClose className="close" onClick={toggleNav} />
          <Link to='/Home' className="smNavLinks">Home</Link>
          <Link to='/profile' className="smNavLinks">Account</Link>
          <Link to='/editProfile' className="smNavLinks">Edit</Link>
          <Link to='/UserPosts' className="smNavLinks">Posts</Link>
          <button
            onClick={logoutFunc}
            className="btn logoutBtn btn-lg btn-danger"
          >
            Log Out
          </button>
        </div>
      </div>
    );
}

export default Nav