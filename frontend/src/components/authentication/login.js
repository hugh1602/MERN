import React, { useState } from "react";
import * as bootstrap from "bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";

const NotificationOption = { animation: true, autohide: true, delay: 4000 };
const showSuccess = () => {
  var toastElList = [].slice.call(document.querySelectorAll(".successLogin"));
  var toastList = toastElList.map(function (toastEl) {
    // Creates an array of toasts (it only initializes them)
    return new bootstrap.Toast(toastEl, NotificationOption); // No need for options; use the default options
  });
  toastList.forEach((toast) => toast.show());
  console.log(toastList); // Testing to see if it works
};

const showFatal = () => {
  var toastElList = [].slice.call(document.querySelectorAll(".errorLogin"));
  var toastList = toastElList.map(function (toastEl) {
    // Creates an array of toasts (it only initializes them)
    return new bootstrap.Toast(toastEl, NotificationOption); // No need for options; use the default options
  });
  toastList.forEach((toast) => toast.show());
  console.log(toastList); // Testing to see if it works
};

const showErrorToast = () => {
  var toastElList = [].slice.call(document.querySelectorAll(".fatalLogin"));
  var toastList = toastElList.map(function (toastEl) {
    // Creates an array of toasts (it only initializes them)
    return new bootstrap.Toast(toastEl, NotificationOption); // No need for options; use the default options
  });
  toastList.forEach((toast) => toast.show());
  console.log(toastList); // Testing to see if it works
};

const Login = () => {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [isshown, setisshown] = useState(false);
  const [Loading, setLoading] = useState(false);
  const history = useHistory();

  const togglePassword = () => {
    setisshown((isshown) => !isshown);
  };
  const loginhandler = async () => {
    setLoading(true);
    if (!email || !password) {
      showErrorToast();
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: { "Content-type": "application/json" },
      };

      const { data } = await axios.post(
        "/api/user/login",
        {
          email,
          password,
        },
        config
      );
      showSuccess();
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      showFatal();
      setLoading(false);
    }
  };
  const forgotpass = () => {};

  return (
    <form
      className="mb-3 needs-validation StanderdizedBox"
      noValidate
      style={{ width: "90%", height: "55%" }}
    >
      <label>Email Address</label>
      <div className="form-floating">
        <input
          type="email"
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          onChange={(e) => setemail(e.target.value)}
          required
        ></input>
        <label htmlFor="floatingInput">example@mail.com</label>
      </div>
      <br></br>
      <label>Password</label>
      <div className="input-group">
        <input
          type={isshown ? "text" : "password"}
          className="form-control"
          id="floatingInput"
          placeholder=""
          onChange={(e) => setpassword(e.target.value)}
          required
        ></input>
        <button
          className="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
          checked={isshown}
          onClick={togglePassword}
        >
          ShowPassword
        </button>
      </div>
      <br></br>
      <div className="col text-center">
        <button
          type="button"
          className="btn btn-primary ButtonSize StanderdizedBox"
          onClick={loginhandler}
        >
          {" "}
          {Loading ? (
            <span
              className="spinner-grow spinner-grow-sm"
              role="status"
              aria-hidden="true"
            ></span>
          ) : (
            "Login"
          )}
        </button>
      </div>
      <div className="col text-center">
        <button
          type="button"
          className="btn btn-success ButtonSize StanderdizedBox"
          onClick={() => {
            setemail("Guest@hotmail.com");
            setpassword("1106");
          }}
        >
          Guest User
        </button>
      </div>
      <div className="col text-center">
        <button
          type="button"
          className="btn ButtonSize StanderdizedBox"
          style={{ color: "grey" }}
          onClick={forgotpass}
        >
          Forgot Password?
        </button>
      </div>
    </form>
  );
};

export default Login;
