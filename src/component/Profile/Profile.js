import React, { useState } from "react";
import axios from "axios";
import "./Profile.css";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [age, setAge] = useState("");
  const [dob, setDob] = useState("");
  const [contact, setContact] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleDobChange = (event) => {
    setDob(event.target.value);
  };

  const handleContactChange = (event) => {
    setContact(event.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { id } = JSON.parse(localStorage.getItem("user"));
      const response = await axios.post(`http://localhost:8000/profile/${id}`, {
        age,
        dob,
        contact,
      });
      console.log(response.data);
      setShowModal(false);
    } catch (error) {
      console.error("Error saving profile data:", error);
    }
  };

  const handleSubmit2 = async (event) => {
    event.preventDefault();
    try {
      const { id } = JSON.parse(localStorage.getItem("user"));
      const response = await axios.put(
        `http://localhost:8000/profile/${id}/edit`,
        {
          age,
          dob,
          contact,
        }
      );
      console.log(response.data);
      alert("Successfully saved");
      setShowModal(false);
    } catch (error) {
      console.error("Error saving profile data:", error);
    }
  };

  const handleEditClick = () => {
    const profileData = JSON.parse(localStorage.getItem("profileData"));
    if (profileData) {
      setAge(profileData.age);
      setDob(profileData.dob);
      setContact(profileData.contact);
    }
    setShowModal(true);
  };

  const name = JSON.parse(localStorage.getItem("user")).username;

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h3 className="name">{name} Please fill all details</h3>
        <input
          type="text"
          placeholder="Age"
          value={age}
          onChange={handleAgeChange}
        />
        <input
          type="date"
          placeholder="Date of Birth"
          value={dob}
          onChange={handleDobChange}
        />
        <input
          type="text"
          placeholder="Contact"
          value={contact}
          onChange={handleContactChange}
        />
        <div className="button-container">
          <button type="submit" className="submit">
            Submit
          </button>
          <button type="button" className="edit" onClick={handleEditClick}>
            EDIT
          </button>
        </div>
        <button type="button" className="logout" onClick={handleLogout}>
          Logout
        </button>
      </form>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit2}>
              <input
                type="text"
                placeholder="Age"
                value={age}
                onChange={handleAgeChange}
              />
              <input
                type="date"
                placeholder="Date of Birth"
                value={dob}
                onChange={handleDobChange}
              />
              <input
                type="text"
                placeholder="Contact"
                value={contact}
                onChange={handleContactChange}
              />
              <button type="submit" className="submit">
                Save
              </button>
            </form>
          </div>
          <ToastContainer />
        </div>
      )}
    </div>
  );
}

export default Profile;
