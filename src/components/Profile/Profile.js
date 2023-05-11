/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Link, Navigate } from "react-router-dom"; //{Link} => instead of using <a> to avoid refresh {Navigate} => to redirect user to specific page
import { useCookies } from 'react-cookie'; // to fetch the cookies stored
import jwtDecode from "jwt-decode"; // lib to decode the token stored in cookies
import "./Profile.css" //css file
import profile from "../../Img/undraw_Male_avatar_re_y880.png"

function Component({data}) {
  return (
    <section className="row">
      <div className="container col-10 py-5">
        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                <img
                  alt="profile"
                  src={profile}
                  className="rounded-circle img-fluid Img"
                />
                <h5 className="my-0">{data.name}</h5>
                <p className="text-muted mb-1">{data.email}</p>
              </div>
            </div>
            <div className="card mb-4 mb-lg-0">
              <div className="card-body p-0">
                <ul className="list-group list-group-flush rounded-3">
                  <li className="list-group-item d-flex justify-content-start gap-2 align-items-center p-3">
                    <Link to="/UserPosts"> Posts</Link>
                    <Link to="">Friends</Link>
                    <Link to="/editProfile">Edit</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Name</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{data.name}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Gender</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{data.gender}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Username</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{data.username}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Phone</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{data.phone}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Age</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{data.age}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Birth date</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{data.birthday.slice(0, 10)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Profile() {
  const [cookie, setCookie] = useCookies("token")

  const data = jwtDecode(cookie.token);

  return (
    <>
      {/* redirect to login page if there is no token stored in cookie */}
      {cookie.token === "" && <Navigate to="/" />}
      
      <div className="profile col-12 p-0 text-center">
        {/* component with data passed as props */}
        <Component data={data.user} />
      </div>
    </>
  );
}

export default Profile
