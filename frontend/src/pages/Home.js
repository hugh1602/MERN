import React from "react";
import { useHistory } from "react-router";
import { useEffect } from "react";
import Login from "../components/authentication/login";
import Signup from "../components/authentication/signup";

const Home = () => {
  const history = useHistory();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo) {
      history.push("/");
    }
  }, [history]);

  return (
    <div className="container-xl">
      <div className="justify-content-center card mb-3 TitleCard">
        <div className="card-body">
          <h1 className="card-title text-center FontType">Konvrse</h1>
        </div>
        <div className="card InfoCard">
          <br></br>
          <ul
            className="nav nav-pills nav-fill mb-3 "
            id="pills-tab"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
              <button
                className="nav-link rounded-pill active"
                id="pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-home"
                type="button"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
              >
                Login
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link rounded-pill"
                id="pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-profile"
                type="button"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
              >
                Sign up
              </button>
            </li>
          </ul>
          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
              tabIndex="0"
            >
              <Login></Login>
            </div>
            <div
              className="tab-pane fade"
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
              tabIndex="0"
            >
              <Signup></Signup>
            </div>
          </div>
        </div>
      </div>
      <div
        className="toast-container p-3 top-0 start-50 translate-middle-x"
        id="WarningToast"
      >
        <div className="toast warningToast">
          <div className="toast-header">
            <strong className="me-auto">Notification</strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
          <div className="toast-body prompt">
            Please select a profile picture to upload.
          </div>
        </div>
      </div>
      <div
        className="toast-container p-3 top-0 start-50 translate-middle-x"
        id="successToast"
      >
        <div className="toast successToast">
          <div className="toast-header">
            <strong className="me-auto">Success</strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
          <div className="toast-body prompt">Sign up successful!</div>
        </div>
      </div>
      <div
        className="toast-container p-3 top-0 start-50 translate-middle-x"
        id="fatalToast"
      >
        <div className="toast fatalToast">
          <div className="toast-header">
            <strong className="me-auto">Fatal Error</strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
          <div className="toast-body prompt">Sign up failed</div>
        </div>
      </div>
      <div
        className="toast-container p-3 top-0 start-50 translate-middle-x"
        id="ErrorToast"
      >
        <div className="toast errorToast">
          <div className="toast-header">
            <strong className="me-auto">Error</strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
          <div className="toast-body prompt">
            Please fill in all the required fields correctly.
          </div>
        </div>
      </div>
      <div
        className="toast-container p-3 top-0 start-50 translate-middle-x"
        id="successToast"
      >
        <div className="toast successLogin">
          <div className="toast-header">
            <strong className="me-auto">Success</strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
          <div className="toast-body prompt">Login successful!</div>
        </div>
      </div>
      <div
        className="toast-container p-3 top-0 start-50 translate-middle-x"
        id="successToast"
      >
        <div className="toast fatalLogin">
          <div className="toast-header">
            <strong className="me-auto">Fatal Error</strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
          <div className="toast-body prompt">Cannot Login</div>
        </div>
      </div>
      <div
        className="toast-container p-3 top-0 start-50 translate-middle-x"
        id="successToast"
      >
        <div className="toast errorLogin">
          <div className="toast-header">
            <strong className="me-auto">Error</strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
          <div className="toast-body prompt">Email/Password incorrect</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
