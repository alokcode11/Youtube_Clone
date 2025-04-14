import "./all.css";
import { Link } from "react-router-dom";

function Allcard(props) {
  return (
    <div className="all-category-card">
      {" "}
      {/* Container for each video card */}
      <Link to={`/all/${props.id}`}>
        {" "}
        {/* Link to navigate to video details */}
        <div className="all-image-container">
          {" "}
          {/* Thumbnail container */}
          <img src={props.thumbnail} alt="Thumbnail" /> {/* Video thumbnail */}
          <p>{props.length}</p> {/* Video length */}
        </div>
        <div className="all-container">
          {" "}
          {/* Main content container */}
          <div className="all-container1">
            {" "}
            {/* Channel logo container */}
            <img src={props.logo} alt="Channel Logo" /> {/* Channel logo */}
          </div>
          <div className="all-container2">
            {" "}
            {/* Video details container */}
            <h3>{props.title}</h3> {/* Video title */}
            <h4>{props.channel}</h4> {/* Channel name */}
            <h4>
              {props.views} | {props.posted} {/* Views count and posted time */}
            </h4>
          </div>
          <div className="all-container3">
            {" "}
            {/* Options icon container */}
            <img
              src="https://cdn-icons-png.flaticon.com/128/2311/2311524.png"
              alt="Options"
            />{" "}
            {/* Options menu icon */}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Allcard;
