import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AfterHeader from "../AfterHeader/afterheader";
import VideoDisplayer from "./VideoDisplayer";
import "./videoPlayer.css";

function Videoplayer() {
  const { id } = useParams();
  const [filtered, setFiltered] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editableComments, setEditableComments] = useState({});

  // Toggle sidebar function
  const toggleEscapeSidebar = () => {
    setIsOpen((prev) => {
      console.log("Toggling Sidebar:", !prev); // Debugging
      return !prev;
    });
  };

  const handleEditComment = (videoIndex, commentIndex) => {
    setEditableComments((prev) => ({
      ...prev,
      [`${videoIndex}-${commentIndex}`]: true,
    }));
  };

  const handleCommentChange = (event, videoIndex, commentIndex) => {
    const updatedText = event.target.value;
    setFiltered((prevFiltered) => {
      const updatedData = [...prevFiltered];
      updatedData[videoIndex].comments[commentIndex].personComment =
        updatedText;
      return updatedData;
    });
  };

  const handleSaveComment = (videoIndex, commentIndex) => {
    setEditableComments((prev) => ({
      ...prev,
      [`${videoIndex}-${commentIndex}`]: false,
    }));
    // Optionally, make an API call here to persist changes to the backend.
  };

  const handleDeleteComment = (videoIndex, commentIndex) => {
    setFiltered((prevFiltered) => {
      const updatedData = [...prevFiltered];
      if (updatedData[videoIndex]?.comments) {
        updatedData[videoIndex].comments = updatedData[
          videoIndex
        ].comments.filter((_, index) => index !== commentIndex);
      }
      return updatedData;
    });
  };

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:4000/videos");
      const data = await response.json();
      const filteredProduct = data.filter((item) => item.id === parseInt(id));
      setFiltered(filteredProduct);
    }
    fetchData();
  }, [id]);

  return (
    <div>
      {filtered.map((item) => (
        <AfterHeader title={item.fullTitle} key={item.id} />
      ))}

      <div className="app-container">
        {/* Sidebar with toggle button */}
        <div className={`sidebarEscape ${isOpen ? "open" : "closed"}`}>
          <button className="menu-button" onClick={toggleEscapeSidebar}>
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
        </div>
      </div>

      {filtered.map((item) => (
        <VideoDisplayer
          key={item.id}
          id={item.id}
          url={item.videoUrl}
          title={item.fullTitle}
          logo={item.videoOwnerLogo}
          channel={item.channelName}
          likes={item.likes}
          dislikes={item.dislike}
          views={item.views}
          posted={item.posted}
          description={item.description}
          commentsCount={item.commentsCount}
        />
      ))}

      {filtered.map((item, videoIndex) =>
        item.comments?.map((comment, commentIndex) => (
          <div className="video-comments-cards" key={commentIndex}>
            <div className="comment-logo">
              <img src={comment.personLogo || ""} alt="Commenter Logo" />
            </div>
            <div className="comment-info">
              <div className="comment-person">
                <p>{comment.personEmail}</p>
                <p>{comment.commentTime}</p>
              </div>
              <div className="main-comment">
                {editableComments[`${videoIndex}-${commentIndex}`] ? (
                  <textarea
                    value={comment.personComment}
                    onChange={(e) =>
                      handleCommentChange(e, videoIndex, commentIndex)
                    }
                  />
                ) : (
                  <p>{comment.personComment}</p>
                )}
              </div>
              <div className="comments-likes">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/126/126473.png"
                  alt="Like"
                />
                <span>{comment.commentLike}</span>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/126/126504.png"
                  alt="Dislike"
                />
                <span>{comment.commentDislikes}</span>
              </div>
            </div>
            <div className="comments-edit-button">
              {editableComments[`${videoIndex}-${commentIndex}`] ? (
                <button
                  onClick={() => handleSaveComment(videoIndex, commentIndex)}
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => handleEditComment(videoIndex, commentIndex)}
                >
                  Edit
                </button>
              )}
              <button
                className="delete-btn"
                onClick={() => handleDeleteComment(videoIndex, commentIndex)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Videoplayer;
