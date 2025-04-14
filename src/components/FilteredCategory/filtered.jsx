import React, { useMemo, Suspense } from "react";
import { Link, useLocation } from "react-router-dom";
import "./filtered.css";
import Sidebar from "../Sidebar/sidebar";

function Filtered() {
  const location = useLocation(); // Hook to access the current route location

  // Memoize filtered videos from location state to prevent unnecessary re-renders
  const filteredVideos = useMemo(() => location.state?.data || [], [location]);

  console.log("Filtered Videos:", filteredVideos);
  console.log("Location State:", location.state);

  return (
    <div className="filtered-page">
      <Sidebar />

      <div className="filtered-content">
        <div className="filtered-main-container">
          {filteredVideos.length > 0 ? (
            filteredVideos.map((video) => (
              <Link to={`/all/${video.id}`} key={video.id}>
                <div className="filtered-card1">
                  <img src={video.thumbnail} alt={video.title} />
                  <div className="filter-card-info">
                    <img
                      src={video.videoOwnerLogo}
                      alt={video.channelName}
                      className="channel-logo"
                    />
                    <div className="info-container">
                      <h3>{video.title}</h3>
                      <p>{video.channelName}</p>
                      <p>
                        {video.views} | {video.posted}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>No matching videos found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Filtered;
