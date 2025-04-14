import "./comedy.css";
import { Link } from "react-router-dom";

function Comedycard(props) {
  return (
    <div className="all-category-card">
      <Link to={`/all/${props.id}`}>
        <div className="all-image-container">
          <img src={props.thumbnail} alt="Thumbnail" />
          <p>{props.length}</p>
        </div>
        <div className="all-container">
          <div className="all-container1">
            <img src={props.logo} alt="Channel Logo" />
          </div>
          <div className="all-container2">
            <h3>{props.title}</h3>
            <h4>{props.channel}</h4>
            <h4>
              {props.views} | {props.posted}
            </h4>
          </div>
          <div className="all-container3">
            <img
              src="https://cdn-icons-png.flaticon.com/128/2311/2311524.png"
              alt="Options"
            />
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Comedycard;
