import "./header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header-container">
      {" "}
      {/* Main header container */}
      <div className="input-search">
        {" "}
        {/* Search bar section */}
        <input type="text" placeholder="Search" />{" "}
        {/* Input field for search */}
        <button>
          {" "}
          {/* Search button */}
          <img
            src="https://cdn-icons-png.flaticon.com/128/151/151773.png"
            alt="Search Icon"
          />
        </button>
      </div>
      <div className="voice-input">
        {" "}
        {/* Voice search button section */}
        <button>
          <img
            src="https://cdn-icons-png.flaticon.com/128/7175/7175253.png"
            alt="Voice Search Icon"
          />
        </button>
      </div>
      <Link to="/login">
        {" "}
        {/* Link to login page */}
        <div className="sign-in">
          {" "}
          {/* Sign-in section */}
          <img
            src="https://cdn-icons-png.flaticon.com/128/2311/2311524.png"
            alt="Menu Icon"
          />
          <div className="sign-in-button">
            {" "}
            {/* Sign-in button with icon */}
            <img
              src="https://cdn-icons-png.flaticon.com/128/1144/1144760.png"
              alt="User Icon"
            />
            <p>Sign in</p> {/* Sign-in text */}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Header;
