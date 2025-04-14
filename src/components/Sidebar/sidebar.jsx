import React, { useState } from "react";
import "./sidebar.css";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true); // State to manage sidebar open/close

  const toggleSidebar = () => setIsOpen(!isOpen); // Function to toggle sidebar state

  // Primary navigation items
  const primaryItems = [
    {
      name: "Home",
      icon: "https://cdn-icons-png.flaticon.com/128/1946/1946436.png",
      link: "/all",
    },
    {
      name: "Shorts",
      icon: "https://img.icons8.com/?size=24&id=ajczeHCWXbyR&format=png",
      link: "/shorts",
    },
    {
      name: "Subscriptions",
      icon: "https://cdn-icons-png.flaticon.com/128/2989/2989849.png",
      link: "/subscriptions",
    },
  ];

  // Explore section items
  const exploreItems = [
    {
      name: "Trending",
      icon: "https://cdn-icons-png.flaticon.com/128/2550/2550418.png",
      link: "/trending",
    },
    {
      name: "Music",
      icon: "https://cdn-icons-png.flaticon.com/128/461/461146.png",
      link: "/music",
    },
    {
      name: "Gaming",
      icon: "https://cdn-icons-png.flaticon.com/128/4363/4363277.png",
      link: "/gaming",
    },
    {
      name: "News",
      icon: "https://cdn-icons-png.flaticon.com/128/81/81460.png",
      link: "/news",
    },
    {
      name: "Sports",
      icon: "https://cdn-icons-png.flaticon.com/128/795/795323.png",
      link: "/sports",
    },
  ];

  // Library section items
  const libraryItems = [
    {
      name: "History",
      icon: "https://cdn-icons-png.flaticon.com/128/3503/3503786.png",
      link: "/history",
    },
    {
      name: "Playlists",
      icon: "https://cdn-icons-png.flaticon.com/128/9297/9297069.png",
      link: "/playlists",
    },
    {
      name: "Your videos",
      icon: "https://cdn-icons-png.flaticon.com/128/2991/2991195.png",
      link: "/your-videos",
    },
    {
      name: "Your courses",
      icon: "https://cdn-icons-png.flaticon.com/128/9720/9720911.png",
      link: "/your-courses",
    },
    {
      name: "Watch Later",
      icon: "https://cdn-icons-png.flaticon.com/128/833/833602.png",
      link: "/watch-later",
    },
    {
      name: "Liked videos",
      icon: "https://cdn-icons-png.flaticon.com/128/739/739231.png",
      link: "/liked-videos",
    },
  ];

  return (
    <div className="app-container">
      {/* Sidebar wrapper */}
      <div
        className={`sidebar ${isOpen ? "open" : "closed"} ${
          !isOpen ? "sidebarEscape" : ""
        }`}
      >
        {/* Sidebar header: Menu button and YouTube logo */}
        <button className="menu-button" onClick={toggleSidebar}>
          <img
            src="https://cdn-icons-png.flaticon.com/128/7710/7710488.png"
            alt="menu"
            className="image1"
          />
          <a href="/home">
            <div className="homepage-youtube-logo">
              <img
                src="https://cdn-icons-png.flaticon.com/128/1384/1384060.png"
                alt="YouTube Logo"
                className="image2"
              />
              <h2>YouTube</h2>
              <sup>IN</sup>
            </div>
          </a>
        </button>

        {/* Sidebar content (scrollable) */}
        <div className="sidebar-content">
          {/* Primary navigation section */}
          <div className="menu-section">
            {primaryItems.map((item, index) => (
              <a href={item.link} key={index} className="menu-item">
                <img src={item.icon} alt={item.name} className="menu-icon" />
                {isOpen && <span>{item.name}</span>}
              </a>
            ))}
          </div>

          {/* Library section */}
          <div className="menu-section">
            <hr />
            <span className="section-title">
              <pre>{`You >`}</pre>
            </span>
            {libraryItems.map((item, index) => (
              <a href={item.link} key={index} className="menu-item">
                <img src={item.icon} alt={item.name} className="menu-icon" />
                {isOpen && <span>{item.name}</span>}
              </a>
            ))}
          </div>

          {/* Explore section */}
          <div className="menu-section">
            <hr />
            <span className="section-title">Explore</span>
            {exploreItems.map((item, index) => (
              <a href={item.link} key={index} className="menu-item">
                <img src={item.icon} alt={item.name} className="menu-icon" />
                {isOpen && <span>{item.name}</span>}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
