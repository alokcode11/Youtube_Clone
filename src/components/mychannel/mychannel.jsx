import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AfterHeader from "../AfterHeader/afterheader";
import Sidebar from "../Sidebar/sidebar";
import "./mychannel.css";

function Mychannel() {
  const [profileWord, setProfileWord] = useState("");
  const [username, setUsername] = useState("");
  const [userhandle, setUserhandle] = useState("");
  const [myvideo, setMyvideo] = useState([]);
  const [channelExists, setChannelExists] = useState(false); // State to check if channel data exists

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:4000/channelData");
        const result = await response.json();

        // Check if channel data is not empty
        if (result.length > 0) {
          const userInitial = result[result.length - 1]?.username[0] || "";
          const name = result[result.length - 1].username;
          const handle = result[result.length - 1].userhandle;
          setUsername(name);
          setUserhandle(handle);
          setProfileWord(userInitial);
          setChannelExists(true); // Set to true if data is available
        } else {
          setChannelExists(false); // Set to false if data is empty
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setChannelExists(false); // Handle error state as no channel
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await fetch("http://localhost:4000/videos");
        const data = await response.json();
        const filtered = data.filter((item) => item.id % 4 === 0);
        setMyvideo(filtered);
      } catch (error) {
        console.error("Error fetching video data:", error);
      }
    }
    fetchVideos();
  }, []);

  const hideVideo = (id) => {
    setMyvideo((prevVideos) =>
      prevVideos.map((video) =>
        video.id === id ? { ...video, hidden: true } : video
      )
    );
  };

  // If no channel exists, show a message
  if (!channelExists) {
    return (
      <div>
        <AfterHeader />
        <Sidebar />
        <div className="no-channel-message">
          <h2>No channel exists</h2>
          <a href="/create">Create Channel</a>
        </div>
      </div>
    );
  }

  // If channel data is available, render the channel details
  return (
    <div>
      <AfterHeader />
      <Sidebar />
      <div className="my-channel-container">
        <div className="my-channel-name">
          <div className="my-channel-name1">
            <p>{profileWord}</p>
          </div>
          <div className="my-channel-name2">
            <h1>{username}</h1>
            <div className="channel-info">
              <span>{userhandle}</span> - <span>12 subscribers</span> -{" "}
              <span>{myvideo.length} videos</span>
            </div>
            <p>
              More about this channel <strong>...more</strong>
            </p>
            <div className="my-channel-buttons">
              <button>Customise channel</button>
              <button>Manage videos</button>
            </div>
          </div>
        </div>
        <div className="my-channel-category">
          <span>Home</span>
          <span>Videos</span>
          <span>Shorts</span>
          <span>Playlists</span>
          <span>Posts</span>
          <span>
            <img src="" alt="" />
          </span>
        </div>
        <hr />
        <h2 className="for-you">For you</h2>
        <div className="my-channel-video-container">
          {myvideo.map(
            (data) =>
              !data.hidden && (
                <div key={data.id} className="my-channel-video-card">
                  <Link to={`/all/${data.id}`}>
                    <div className="my-channel-video">
                      <img src={data.thumbnail} alt="" />
                    </div>
                    <div className="my-channel-video-title">
                      <h2>{data.fullTitle}</h2>
                    </div>
                    <div className="my-channel-video-views">
                      <span>{data.views}</span> <span>|</span>
                      <span>{data.posted}</span>
                    </div>
                  </Link>
                  <button
                    className="delete-button"
                    onClick={() => hideVideo(data.id)}
                  >
                    Delete
                  </button>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
}

export default Mychannel;
