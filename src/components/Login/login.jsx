import { useNavigate } from "react-router-dom";
import AfterHeader from "../AfterHeader/afterheader";
import "./login.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Ensure Axios is imported

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      if (!email.trim() || !password.trim()) {
        alert("Please fill in all fields.");
        return;
      }

      // **Login Request**
      const response = await axios.post("http://localhost:4000/userLogin", {
        email,
        password,
      });

      // **Store Token & User Data**
      localStorage.setItem("profileName", email);
      localStorage.setItem("token", response.data.token);

      alert(response.data.message);
      navigate("/all"); // Redirect after login
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login failed, User doesn't exist, Please signup or register."
      );
      navigate("/register");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-info">
          <img
            src="https://cdn-icons-png.flaticon.com/128/300/300221.png"
            alt=""
          />
          <h1>Sign in</h1>
          <p>
            with your Google Account to continue to YouTube. This account will
            be available to other Google apps in the browser.
          </p>
        </div>
        <div className="login-details">
          <input
            type="text"
            placeholder="Email or phone"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h3>Forgot email?</h3>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <h3>Forgot password?</h3>
          <Link to="/register">
            <h3>New User? Register</h3>
          </Link>
          <p>
            Not your computer? Use Guest mode to sign in privately.
            <a href="https://support.google.com/chrome/answer/6130773?hl=en">
              Learn more about using Guest mode
            </a>
          </p>
          <div className="login-submit-button">
            <button onClick={handleClick}>Login</button>
          </div>
        </div>
      </div>

      <div className="login-page-help">
        <div className="language-select">
          <select>
            <option value="en">English (United States)</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>
        <div className="help-items">
          <p>Help</p>
          <p>Privacy</p>
          <p>Terms</p>
        </div>
      </div>

      <div className="props-handling">
        <AfterHeader name={email} />
      </div>
    </div>
  );
}

export default Login;
