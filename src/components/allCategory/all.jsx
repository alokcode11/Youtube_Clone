import { useState, useEffect } from "react";
import "./all.css";
import Allcard from "./allcard"; // Fixed path for the Allcard component
import Sidebar from "../Sidebar/sidebar";
import AfterHeader from "../AfterHeader/afterheader";
import Navbar from "../Navbar/navbar";

function All() {
  const [videoData, setVideoData] = useState([]); // State to store video data

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:4000/videos"); // Fetch video data from backend
        const data = await response.json();
        setVideoData(data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching video data:", error); // Handle fetch errors
      }
    }
    fetchData();
  }, []); // Empty dependency array ensures this effect runs once on mount

  return (
    <>
      <AfterHeader /> {/* Header component */}
      <Sidebar /> {/* Sidebar navigation */}
      <Navbar /> {/* Navbar component */}
      <div className="all-category">
        {" "}
        {/* Container for video cards */}
        {videoData.map((data) => (
          <Allcard
            key={data.id} // Unique key for React rendering
            id={data.id}
            title={data.title}
            channel={data.channelName}
            length={data.videoLength}
            thumbnail={data.thumbnail}
            logo={data.videoOwnerLogo}
            views={data.views}
            posted={data.posted}
          />
        ))}
      </div>
    </>
  );
}

export default All;
