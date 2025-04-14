import { useState, useEffect } from "react";
import "./afterheader.css";
import { Link, useNavigate } from "react-router-dom";
import Filtered from "../FilteredCategory/filtered";

function AfterHeader(props) {
  // Retrieve stored profile name from localStorage or default to an empty string
  const storedName = localStorage.getItem("profileName") || "";
  // Use prop name if available, otherwise fallback to storedName
  const displayName = props.name || storedName;
  // Get the first letter of the display name for profile icon
  const initialLetter = displayName ? displayName[0].toUpperCase() : "";
  // Create a shortened channel name with a max of 5 characters
  const channelName = displayName.slice(0, 5) || "Guest";
  // Generate a channel handle with a unique suffix
  const channelHandle = `@${displayName.slice(0, 7) || "guest"}8717`;

  // State to store video data fetched from API
  const [videoData, setVideoData] = useState([]);
  // State to store search input value
  const [searchTerm, setSearchTerm] = useState("");
  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Fetch video data on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:4000/videos");
        const data = await response.json();
        setVideoData(data);
      } catch (error) {
        console.error("Error fetching video data:", error);
      }
    }
    fetchData();
  }, []);

  // Function to filter videos based on search input and navigate to the filtered page
  const handleFilter = () => {
    if (searchTerm === " ") {
      alert("Please input something to search");
    } else {
      alert("If search bar is empty all videos will be showed");
      const filteredData = videoData.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      console.log("Filtered Data Sent:", filteredData);
      navigate("/filtered", { state: { data: filteredData } });
    }
  };

  return (
    <div className="header-container-area">
      {/* Search Input Section */}
      <div className="input-search">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleFilter}>
          <img
            src="https://cdn-icons-png.flaticon.com/128/151/151773.png"
            alt="Search Icon"
          />
        </button>
      </div>

      {/* Voice Search Button */}
      <div className="voice-input">
        <button>
          <img
            src="https://cdn-icons-png.flaticon.com/128/7175/7175253.png"
            alt="Voice Icon"
          />
        </button>
      </div>

      {/* User Profile and Actions Section */}
      <div className="sign-in-area">
        <Link to="/create">
          <div className="create-in-button">
            <span>+</span>
            <p>Create</p>
          </div>
        </Link>
        {/* Notification Icon */}
        <img
          src="https://cdn-icons-png.flaticon.com/128/1827/1827347.png"
          alt="Notification Icon"
          className="notification-icon"
        />

        {/* Profile Dropdown Menu */}
        <div className="after-login-profile">
          <div className="dropdown">
            <span className="after-login-profile-photo">{initialLetter}</span>
            <div className="dropdown-content">
              {/* User Channel Information */}
              <div className="channel-name">
                <div className="channel-profile">
                  <span className="channel-profile-photo">{initialLetter}</span>
                </div>
                <div className="channel-info">
                  <h2>{channelName}</h2>
                  <h3>{channelHandle}</h3>
                  <a href="/mychannel">View your channel</a>
                </div>
              </div>
              <hr />
              {/* Account Options */}
              <div className="channel-profiles">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/104/104093.png"
                  alt="Google Account"
                />
                <p>Google Account</p>
              </div>
              <div className="channel-profiles">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/17219/17219146.png"
                  alt="Switch Account"
                />
                <p>Switch Account</p>
              </div>
              <div className="channel-profiles">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/992/992680.png"
                  alt="Sign Out"
                />
                <p>Sign out</p>
              </div>
              <hr />
              {/* Additional Settings */}
              <div className="channel-profiles">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/15078/15078497.png"
                  alt="YouTube Studio"
                />
                <p>YouTube Studio</p>
              </div>
              <div className="channel-profiles">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/5719/5719055.png"
                  alt="Purchases"
                />
                <p>Purchases and memberships</p>
              </div>
              <hr />
              <div className="channel-profiles">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/3329/3329048.png"
                  alt="Data"
                />
                <p>Your data in YouTube</p>
              </div>
              <div className="channel-profiles">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/12897/12897950.png"
                  alt="Restricted Mode"
                />
                <p>Restricted Mode: Off</p>
              </div>
              <div className="channel-profiles">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/1011/1011322.png"
                  alt="Location"
                />
                <p>Location: India</p>
              </div>
              <div className="channel-profiles">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/159/159602.png"
                  alt="Shortcuts"
                />
                <p>Keyboard shortcuts</p>
              </div>
              <hr />
              {/* General Settings */}
              <div className="channel-profiles">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/503/503849.png"
                  alt="Settings"
                />
                <p>Settings</p>
              </div>
              <hr />
              <div className="channel-profiles">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/18/18436.png"
                  alt="Help"
                />
                <p>Help</p>
              </div>
              <div className="channel-profiles">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/1628/1628666.png"
                  alt="Feedback"
                />
                <p>Send feedback</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden Filtered Component to Render Filtered Data */}
      <div className="hidden-container">
        <Filtered data={videoData} />
      </div>
    </div>
  );
}

export default AfterHeader;
