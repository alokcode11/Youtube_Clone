import "./navbar.css";

function Navbar() {
  return (
    <div className="navbar-container">
      {" "}
      {/* Wrapper for the navbar */}
      <div className="navbar">
        {" "}
        {/* Main navbar section */}
        <a href="all">All Categories</a>{" "}
        {/* Navigation link to "All Categories" */}
        <a href="comedy">Comedy Clubs</a>{" "}
        {/* Navigation link to "Comedy Clubs" */}
        <a href="science">Science Fiction</a>{" "}
        {/* Navigation link to "Science Fiction" */}
        <a href="movies">Movies</a> {/* Navigation link to "Movies" */}
        <a href="gaming">Gaming</a> {/* Navigation link to "Gaming" */}
        <a href="villains">Villains</a> {/* Navigation link to "Villains" */}
        <a href="webdevelopment">Web Development</a>{" "}
        {/* Navigation link to "Web Development" */}
        <a href="cs">Computer Science</a>{" "}
        {/* Navigation link to "Computer Science" */}
        <a href="#">View More</a> {/* Placeholder for additional categories */}
      </div>
    </div>
  );
}

export default Navbar;
