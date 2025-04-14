import { useEffect, useState } from "react";
import "./videoPlayer.css";
import { Link } from "react-router-dom";
import axios from "axios";

function VideoDisplayer(props) {
  const [filtered, setFiltered] = useState([]);
  const [comment, setComment] = useState("");
  const [filteredVideo, setFilteredVideo] = useState([]);
  const [showComment, setShowComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState("");

  const ids = props.id;

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:4000/videos");
      const data = await response.json();
      const filteredProduct = data.filter((item) => item.id % 2 === 0);
      setFiltered(filteredProduct);
      const commentFiltered = data.filter((item) => item.id === ids);
      setFilteredVideo(commentFiltered);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function getComments() {
      const response = await fetch("http://localhost:4000/commentsData");
      const commentData = await response.json();
      const createdComment =
        commentData[commentData.length - 1].commentData.comments;
      setShowComment(createdComment[createdComment.length - 1]);
    }
    getComments();
  }, []);

  const handleComment = async () => {
    if (!filteredVideo.length) {
      alert("No video selected.");
      return;
    }

    if (!comment.trim()) {
      alert("Comment cannot be empty.");
      return;
    }

    const currentComment = {
      personEmail: "@user",
      personLogo: filteredVideo[0]?.comments?.[0]?.personLogo || "",
      personComment: comment,
      commentLike: "0",
      commentDislikes: "0",
    };

    filteredVideo[0].comments.push(currentComment);
    const commentData = filteredVideo[0];
    window.location.reload();
    try {
      await axios.post("http://localhost:4000/saveComment", { commentData });
      alert("Comment added successfully");
      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Failed to add comment");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedComment(showComment.personComment);
  };

  const handleSaveEdit = async () => {
    showComment.personComment = editedComment;
    setIsEditing(false);
  };

  const handleDelete = async () => {
    setShowComment("");
  };

  return (
    <div className="video-displayer-container">
      <div className="video-displayer">
        <iframe
          src={props.url}
          width="900"
          height="480"
          allow="autoplay"
          frameBorder="0"
        ></iframe>
      </div>

      <div className="video-title">
        <h1>{props.title}</h1>
      </div>

      <div className="channel-display-container">
        <div className="channel-display-container1">
          <div className="channel-display-logo">
            <img src={props.logo} alt="" />
          </div>
          <div className="channel-display-name">
            <p>{props.channel}</p>
            <p>1.7M subscribers</p>
          </div>
          <div className="subscribe-button">
            <button>Subscribe</button>
          </div>
        </div>
      </div>

      <div className="video-displayer-description">
        <span>{props.views} views</span>
        <span>{props.posted}</span>
        <p>{props.description}</p>
        <p>...more</p>
      </div>

      <div className="video-displayer-comments">
        <p>{props.commentsCount}</p>
      </div>

      <div className="video-displayer-add-comment">
        <span>
          <img src={props.logo} alt="" />
        </span>
        <input
          type="text"
          placeholder="Add a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="add-comment-buttons">
          <button>Cancel</button>
          <button onClick={handleComment}>Comment</button>
        </div>
      </div>

      {showComment && showComment.personComment && (
        <div className="video-comments-cards">
          <div className="comment-logo">
            <img src={showComment.personLogo} alt="Commenter" />
          </div>
          <div className="comment-info">
            <div className="comment-person">
              <p>{showComment.personEmail}</p>
              <p>Just now</p>
            </div>
            <div className="main-comment">
              {isEditing ? (
                <input
                  type="text"
                  value={editedComment}
                  onChange={(e) => setEditedComment(e.target.value)}
                />
              ) : (
                <p>{showComment.personComment}</p>
              )}
            </div>
            <div className="comments-likes">
              <img
                src="https://cdn-icons-png.flaticon.com/128/126/126473.png"
                alt="Like"
              />
              <span>{showComment.commentLike}</span>
              <img
                src="https://cdn-icons-png.flaticon.com/128/126/126504.png"
                alt="Dislike"
              />
              <span>{showComment.commentDislikes}</span>
            </div>
            <div className="comment-actions">
              {isEditing ? (
                <button onClick={handleSaveEdit}>Save</button>
              ) : (
                <button onClick={handleEdit}>Edit</button>
              )}
              <button onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}

      <div className="video-suggestion-container">
        {filtered.map((item) => (
          <Link to={`/all/${item.id}`} key={item.id}>
            <div className="suggestion-card">
              <div className="suggestion-logo">
                <img src={item.thumbnail} alt="" />
              </div>
              <div className="suggestion-info">
                <h4>{item.fullTitle}</h4>
                <p>{item.channelName}</p>
                <p>
                  {item.views} • {item.posted}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default VideoDisplayer;
