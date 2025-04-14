import "./beforeLogin.css";
import Header from "../Header/header";
import Sidebar from "../Sidebar/sidebar";
function BeforeLogin() {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="before-login">
        <div className="before-login-container">
          <h2>Try searching to get started</h2>
          <p>
            Start watching videos to help us build a feed of videos you'll love.
          </p>
        </div>
      </div>
    </>
  );
}
export default BeforeLogin;
