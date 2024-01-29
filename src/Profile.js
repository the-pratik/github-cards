import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProfileBackground from "./images/ProfileHeader.jpg";
import toggleTheme from "./helpers/ToggleTheme";
import ProfileSkeleton from "./skeletons/ProfileSkeleton";

function Profile() {
  let { id } = useParams();
  const [profileData, setProfileData] = useState({});
  const [profileLoading, setProfileLoading] = useState(false);

  useEffect(() => {
    setProfileLoading(true);
    fetchProfileInformation(id);
    const userState = JSON.parse(window.localStorage.getItem("state"));
    toggleTheme(userState?.checked);
  }, []);

  const fetchProfileInformation = async (id) => {
    let err = "";
    const resp = await axios
      .get(`https://api.github.com/users/${id}`)
      .catch(function (error) {
        err = error.toJSON();
      });

    if (err.code === "ERR_BAD_REQUEST") {
      toast.error("Invalid Username", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      setProfileData(resp.data);
      setProfileLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      {profileLoading ? (
        <ProfileSkeleton />
      ) : (
        <div className="card-body">
          <img
            className="card-background"
            src={ProfileBackground}
            alt="Profile Header"
          />

          <div style={{ display: "flex", gap: 20, marginTop: "5px" }}>
            <img
              className="profile-image"
              src={profileData.avatar_url}
              alt="Profile Header"
            />

            <div>
              <h4 className="card-title">{profileData.name}</h4>
              <span className="card-text">
                User since{" "}
                <span style={{ color: "darkgreen" }}>
                  {profileData?.created_at?.slice(0, 10)}
                </span>
              </span>
              <p className="small-text">@{profileData.login}</p>
            </div>
          </div>

          <div className="m-3 profile">
            <p className="card-text">{profileData?.bio}</p>

            <div className="row">
              <div className="column">
                <div className="flex">
                  <i className="fa fa-regular fa-users"></i>
                  <span className="large-text">
                    <a
                      style={{ textDecoration: "none", color: "grey" }}
                      target="_blank"
                      rel="noreferrer"
                      href={`${profileData.html_url}?tab=followers`}
                    >
                      {profileData.followers}
                    </a>
                  </span>
                  <span className="small-text">followers</span>
                </div>
              </div>
              <div className="column">
                <div className="flex">
                  <i className="fa fa-regular fa-user-plus"></i>
                  <span className="large-text">
                    <a
                      style={{ textDecoration: "none", color: "grey" }}
                      target="_blank"
                      rel="noreferrer"
                      href={`${profileData.html_url}?tab=following`}
                    >
                      {profileData.following}
                    </a>
                  </span>
                  <span className="small-text">following</span>
                </div>
              </div>
              <div className="column">
                <div className="flex">
                  <i className="fa fa-regular fa-folder-open"></i>
                  <span className="large-text">
                    <a
                      style={{ textDecoration: "none", color: "grey" }}
                      target="_blank"
                      rel="noreferrer"
                      href={`${profileData.html_url}?tab=repositories`}
                    >
                      {profileData.public_repos}
                    </a>
                  </span>
                  <span className="small-text">repos</span>
                </div>
              </div>
              <div className="column">
                <div className="flex">
                  <i className="fa fa-solid fa-paperclip"></i>
                  <span className="large-text">
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={profileData.blog}
                      className="btn btn-dark"
                    >
                      Personal Blog
                    </a>
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-3" style={{ textAlign: "center" }}>
              <p className="small-text">
                {profileData.company
                  ? `Works at 🏦 ${profileData.company}`
                  : ""}
              </p>
              <p className="small-text">
                {profileData.company
                  ? `Lives in 🏠 ${profileData.location}`
                  : ""}
              </p>
              <span className="large-text">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={profileData.html_url}
                  className="btn btn-dark"
                >
                  <i className="fa fa-brands fa-github"></i> GitHub Profile
                </a>
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="footer">
        Crafted with 💗 by{" "}
        <span className="small-text" style={{ color: "#fff" }}>
          Pratik Deshpande
        </span>
      </div>
    </>
  );
}

export default Profile;
