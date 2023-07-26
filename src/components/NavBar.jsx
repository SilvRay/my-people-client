import { Link } from "react-router-dom";
import PopupComponent from "./PopupComponent";

function NavBar() {
  return (
    <>
      <div className="navbar">
        <Link to="/home?tab=medias">
          <img src="../../images/home-icon.png" alt="homepage icon" />
        </Link>
        <Link to="/notifications">
          <img src="../../images/notif.png" alt="notification icon" />
        </Link>
        <Link to="/search">
          <img src="../../images/search.png" alt="search icon" />
        </Link>
        <Link to="/profile?tab=medias">
          <img src="../../images/profile.png" alt="profile icon" />
        </Link>
        <button>
          <img src="../../images/add.png" />
        </button>
      </div>
      <PopupComponent />
    </>
  );
}

export default NavBar;
