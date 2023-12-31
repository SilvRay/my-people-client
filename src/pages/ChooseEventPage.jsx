import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function ChooseEventPage() {
  const { user } = useContext(AuthContext);

  return (
    <div className="choose-event">
      <main>
        <h2>{user.username}</h2>
        <img
          className="profilePicture"
          src={user.profileImg}
          alt="profile picture"
        />

        <h1>Choose your activity</h1>
        <div className="selection selection1">
          <Link to="/event/new/?event=food">
            {/* <img
              src="/my-people-client/images/pexels-askar-abayev-5638814.jpg"
              alt="FoodTime"
            /> */}
            <h3>Food Time</h3>
          </Link>
        </div>
        <div className="selection selection2">
          <Link to="/event/new/?event=game">
            {/* <img
              src="/my-people-client/images/istockphoto-928430372-612x612.jpg"
              alt="Game Time"
            /> */}
            <h3>Game Time</h3>
          </Link>
        </div>
        <div className="selection selection3">
          <Link to="/event/new/?event=trip">
            {/* <img
              src="/my-people-client/images/pexels-yan-krukau-5792901.jpg"
              alt="Trip"
            /> */}
            <h3>Trip Time</h3>
          </Link>
        </div>
        <div className="selection selection4">
          <Link to="/event/new/?event=movie">
            {" "}
            {/* <img
              src="/my-people-client/images/pexels-tamuka-xulu-12982997.jpg"
              alt="Movie"
            /> */}
            <h3>Movie Time</h3>
          </Link>
        </div>
        <div className="selection selection5">
          <Link to="/event/new/?event=talk">
            {" "}
            {/* <img src="/my-people-client/images/talk.jpg" alt="Talk" /> */}
            <h3>Real Talk</h3>
          </Link>
        </div>
      </main>

      <NavBar />
    </div>
  );
}

export default ChooseEventPage;
