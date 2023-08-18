import { Link } from "react-router-dom";
import PopupComponent from "./PopupComponent";
import { useState } from "react";

function NavBar() {
  const [popupVisible, setPopupVisible] = useState(false);

  const handlePopupClick = () => {
    // MAJ du state pour rendre la popup visible
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    // MAJ du state pour rendre la popup invisible
    setPopupVisible(false);
  };
  return (
    <>
      <div className="navbar">
        <Link to="/home?tab=medias">
          <img src="/images/home-icon.png" alt="homepage icon" />
        </Link>
        <Link to="/notifications">
          <img src="/images/notif.png" alt="notification icon" />
        </Link>
        <Link to="/search">
          <img src="/images/search.png" alt="search icon" />
        </Link>
        <Link to="/profile?tab=medias">
          <img src="/images/profile.png" alt="profile icon" />
        </Link>
        <button onClick={popupVisible ? handleClosePopup : handlePopupClick}>
          <img src="/images/add.png" />
        </button>
      </div>
      <PopupComponent popupVisible={popupVisible} />
    </>
  );
}

export default NavBar;
