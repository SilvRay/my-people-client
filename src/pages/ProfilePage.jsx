import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

function ProfilePage() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [user, setUser] = useState(null);

  const { user, logoutUser } = useContext(AuthContext);
  // const navigate = useNavigate();

  return (
    <div className="profile">
      <div className="head">
        <img
          src="../../images/logout.png"
          alt="logout icon"
          onClick={logoutUser}
        />
        <h2>{user.username}</h2>
        <img src={user.profile_img} alt="profile picture" />
        <Link to="/profile/edit">Edit your profile</Link>
      </div>

      <div className="tabs-container">
        <Link to="/profile?tab=medias">
          <img src="../../images/grid-icon.png" alt="medias-icon" />
        </Link>
        <Link to="/profile?tab=events">
          <img src="../../images/event-icon.png" alt="events-icon" />
        </Link>
        <Link to="/profile?tab=projects">
          <img src="../../images/project-icon.png" alt="projects-icon" />
        </Link>
      </div>
    </div>
  );
}

export default ProfilePage;
