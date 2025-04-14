import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const navigate = useNavigate();

  const handleRegistration = async () => {
    try {
      const userRegistration = {
        firstname,
        lastname,
        email,
        password: password.toString(), // Ensure password is a string
      };

      // Register User
      const response = await axios.post(
        "http://localhost:4000/saveUserInformation",
        userRegistration
      );

      if (response.status === 201) {
        alert("User registered successfully. Redirecting to login...");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error registering user:", error.response?.data || error);
      alert(error.response?.data?.message || "Failed to register user.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-info">
          <img
            src="https://cdn-icons-png.flaticon.com/128/300/300221.png"
            alt="Registration Icon"
          />
          <h1>Register</h1>
          <p>Register to continue to the platform.</p>
        </div>
        <div className="login-details1">
          <div className="login-details-name">
            <input
              type="text"
              placeholder="Firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="login-submit-button1">
            <button onClick={handleRegistration}>Register</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
