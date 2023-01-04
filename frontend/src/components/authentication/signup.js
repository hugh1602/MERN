import React, { useState } from "react";
import * as bootstrap from "bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";

const NotificationOption = { animation: true, autohide: true, delay: 4000 };
const showWarningToast = () => {
  var toastElList = [].slice.call(document.querySelectorAll(".warningToast"));
  var toastList = toastElList.map(function (toastEl) {
    // Creates an array of toasts (it only initializes them)
    return new bootstrap.Toast(toastEl, NotificationOption); // No need for options; use the default options
  });
  toastList.forEach((toast) => toast.show());
  console.log(toastList); // Testing to see if it works
};

const showErrorToast = () => {
  var toastElList = [].slice.call(document.querySelectorAll(".errorToast"));
  var toastList = toastElList.map(function (toastEl) {
    return new bootstrap.Toast(toastEl, NotificationOption);
  });
  toastList.forEach((toast) => toast.show());
  console.log(toastList);
};

const showSuccess = () => {
  var toastElList = [].slice.call(document.querySelectorAll(".successToast"));
  var toastList = toastElList.map(function (toastEl) {
    // Creates an array of toasts (it only initializes them)
    return new bootstrap.Toast(toastEl, NotificationOption); // No need for options; use the default options
  });
  toastList.forEach((toast) => toast.show());
  console.log(toastList); // Testing to see if it works
};

const showFatal = () => {
  var toastElList = [].slice.call(document.querySelectorAll(".fatalToast"));
  var toastList = toastElList.map(function (toastEl) {
    // Creates an array of toasts (it only initializes them)
    return new bootstrap.Toast(toastEl, NotificationOption); // No need for options; use the default options
  });
  toastList.forEach((toast) => toast.show());
  console.log(toastList); // Testing to see if it works
};

const Signup = () => {
  const [email, setemail] = useState();
  const [name, setname] = useState();
  const [password, setpassword] = useState();
  const [confirmpassword, setconfirmpassword] = useState();
  const [pic, setpic] = useState();
  const [Loading, setLoading] = useState(false);
  const [imagedata, setimagedata] = useState([]);
  const history = useHistory();

  const postdetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      setLoading(false);
      showWarningToast();
      return console.log("Empty pic");
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "MERN project");
      data.append("cloud_name", "dxg3ppjqx");
      fetch("https://api.cloudinary.com/v1_1/dxg3ppjqx/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setpic(data.url.toString());
          setimagedata(data);
          setLoading(false);
          console.log(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          console.log("pic load error");
        });
    } else {
      return setLoading(false), console.log("pic empty");
    }
  };

  const [isshown, setisshown] = useState(false);
  const [isconfirmshown, setconfirmisshown] = useState(false);
  const togglePassword = () => {
    setisshown((isshown) => !isshown);
  };
  const toggleConfirmPassword = () => {
    setconfirmisshown((isconfirmshown) => !isconfirmshown);
  };

  const submithandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmpassword || !pic) {
      showErrorToast();
      setLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      showErrorToast();
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: { "Content-type": "application/json" },
      };

      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
          pic,
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
      <label>Name</label>
      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          id="floatingInput"
          placeholder="First Last"
          onChange={(e) => setname(e.target.value)}
          required
        ></input>
        <label htmlFor="floatingInput">Firstname Lastname</label>
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
      <label>Confirm Password</label>
      <div className="input-group">
        <input
          type={isconfirmshown ? "text" : "password"}
          className="form-control"
          id="floatingInput"
          placeholder=""
          onChange={(e) => setconfirmpassword(e.target.value)}
          required
        ></input>
        <button
          className="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
          checked={isconfirmshown}
          onClick={toggleConfirmPassword}
        >
          Show Password
        </button>
      </div>
      <br></br>
      <div className="mb-3">
        <label htmlFor="formFile" className="form-label">
          Upload Profile Picture
        </label>
        <input
          className="form-control"
          type="file"
          id="formFile"
          accept="image/*"
          onChange={(e) => postdetails(e.target.files[0])}
        ></input>
      </div>
      <br></br>
      <div className="col text-center">
        <button
          type="button"
          id="signup"
          className="btn btn-primary ButtonSize StanderdizedBox"
          onClick={submithandler}
        >
          {" "}
          {Loading ? (
            <span
              className="spinner-grow spinner-grow-sm"
              role="status"
              aria-hidden="true"
            ></span>
          ) : (
            "Sign Up"
          )}
        </button>
      </div>
    </form>
  );
};

export default Signup;
