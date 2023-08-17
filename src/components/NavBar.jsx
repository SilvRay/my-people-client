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
          <img src="../../public/images/home-icon.png" alt="homepage icon" />
        </Link>
        <Link to="/notifications">
          <img src="../../public/images/notif.png" alt="notification icon" />
        </Link>
        <Link to="/search">
          <img src="../../public/images/search.png" alt="search icon" />
        </Link>
        <Link to="/profile?tab=medias">
          <img src="../../public/images/profile.png" alt="profile icon" />
        </Link>
        <button onClick={popupVisible ? handleClosePopup : handlePopupClick}>
          <img src="../../public/images/add.png" />
        </button>
      </div>
      <PopupComponent popupVisible={popupVisible} />
    </>
  );
}

export default NavBar;
