import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
// import { registerRoute } from "../utils/APIRouter";

function Register() {
  const navigate = useNavigate();
  const [value, setvalue] = useState({
    username: "",
    email: "",
    password: "",
    conformpassword: "",
  });
  const toastVeriable = {
    possition: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handelSubmit = async (event) => {
    event.preventDefault();
    if (handelValidation()) {
      const { email, username, password } = value;
      const { data } = await axios.post("https://db-mysql.vercel.app/register", {
        username,
        email,
        password,
      });
      alert("User created successfully");
    }
    navigate("/login")
  };

  const handelValidation = () => {
    const { password, conformpassword,username, email } = value;
    if (username=== "")
    {
        toast.error("Username is required.", toastVeriable);
        return false;
    }
    else if (password !== conformpassword) {
      toast.error(
        "Password and confirm password should be the same.",
        toastVeriable
      );
      return false;
    } 
     
    else if (email === "") {
      toast.error("Email is required.", toastVeriable);
      return false;
    }
    return true;
  };

  const handelChange = (event) => {
    setvalue({ ...value, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className="form-container">
        <form onSubmit={(event) => handelSubmit(event)} className="form">
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handelChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handelChange(e)}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={(e) => handelChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="conformpassword"
            onChange={(e) => handelChange(e)}
          />

          <button type="submit">Create User</button>

          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </>
  );
}

export default Register;