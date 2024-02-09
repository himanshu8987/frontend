import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
// import { loginRoute } from "../utils/APIRouter";

function Login() {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    username: "",
    password: "",
  });
  const toastVariables = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  const handleValidation = () => {
    const { password, username } = value;
    if (password === "" || username === "") {
      toast.error("Username and Password are required", toastVariables);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username, password } = value;
      try {
        const { data } = await axios.post("http://localhost:8000/login", {
          username,
          password,
        });
        if (data.message === "Invalid username or password") {
          toast.error(data.message, toastVariables);
        } else {
          localStorage.setItem("user", JSON.stringify(data.user));
          navigate("/profile");
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  const handleChange = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            placeholder="Username"
            name="username"
            min="3"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
          <button type="submit">Login User</button>

          <span>
            Don't have an account? <Link to="/">Register</Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </>
  );
}

export default Login;
