import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    username: "",
    password: "",
  });
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  const handleValidation = () => {
    const { password, username } = value;
    if (password === "" || username === "") {
      alert("Username and Password are required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username, password } = value;
      try {
        const { data } = await axios.post("https://db-mysql.vercel.app/login", {
          username,
          password,
        });
        if (data.message === "Invalid username or password") {
          alert("Invalid username or password");
        } else {
          localStorage.setItem("user", JSON.stringify(data.user));
          navigate("/profile");
        }
        alert("Login successful")
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
      </div>
    </>
  );
}

export default Login;
