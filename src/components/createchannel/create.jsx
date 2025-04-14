import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import userContext from "../../utils/useContext";
import "./create.css";
import axios from "axios";

function Create() {
  // State to manage image preview
  const [preview, setPreview] = useState(null);
  // State to store user name input
  const [name, setName] = useState("");
  // State to store user handle input
  const [handle, setHandle] = useState("");
  // Hook for navigation
  const navigate = useNavigate();
  // Access user context
  const data = useContext(userContext);

  // Function to handle image upload and set preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      data.profile = file; // Store file in context
      setPreview(URL.createObjectURL(file)); // Create and set preview URL
    }
  };

  // Function to create a channel and send data to backend
  const createdChannel = async () => {
    const userData = {
      username: name, // Store username
      userhandle: handle, // Store user handle
    };
    try {
      // Send user data to backend
      await axios.post("http://localhost:4000/saveChannelData", userData);
    } catch (error) {
      console.log("Error creating channel", error); // Log error if request fails
      alert("Failed to create channel"); // Show alert on failure
    }
    navigate("/all"); // Redirect to the 'all' page after creation
    alert("Channel created successfully"); // Show success message
  };

  return (
    <div className="create-channel">
      {" "}
      {/* Main container */}
      <div className="create-channel-container">
        {" "}
        {/* Content container */}
        <h2>How you'll appear</h2> {/* Heading */}
        <div className="image-upload-section">
          {" "}
          {/* Section for image upload */}
          <div className="image-preview">
            {" "}
            {/* Display selected image or placeholder */}
            {preview ? (
              <img
                src={preview}
                alt="Selected"
                style={{ borderRadius: "50%", width: "120px", height: "120px" }}
              />
            ) : (
              <div className="placeholder-circle">
                {" "}
                {/* Default placeholder */}
                <img
                  src="https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
                  alt=""
                />
              </div>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange} // Handle file selection
            className="upload-btn"
          />
        </div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          className="input-field"
          onChange={(e) => setName(e.target.value)} // Update name state
        />
        <input
          type="text"
          placeholder="Handle"
          value={handle}
          className="input-field"
          onChange={(e) => setHandle(e.target.value)} // Update handle state
        />
        <div className="button-section">
          {" "}
          {/* Section for action buttons */}
          <button className="create-btn" onClick={createdChannel}>
            Create Channel
          </button>
          <button className="cancel-btn" onClick={() => navigate(-1)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Create;
