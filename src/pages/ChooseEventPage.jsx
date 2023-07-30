import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

function ChooseEventPage() {
  return (
    <>
      <div className="choose-event">
        <h1>Choose your activity</h1>
        <div>
          <Link to="/event/new/?event=food">
            <img src="../../images/pexels-askar-abayev-5638814.jpg" alt="FoodTime" />
          </Link>
        </div>
        <div>
          <Link to="/event/new/?event=game">
            <img src="../../images/istockphoto-928430372-612x612.jpg" alt="Game Time" />
          </Link>
        </div>
        <div>
          <Link to="/event/new/?event=trip">
            <img src="../../images/pexels-yan-krukau-5792901.jpg" alt="Trip" />
          </Link>
        </div>
        <div>
          <Link to="/event/new/?event=movie">
            {" "}
            <img src="../../images/pexels-tamuka-xulu-12982997.jpg" alt="Movie" />
          </Link>
        </div>
        <div>
          <Link to="/event/new/?event=talk">
            {" "}
            <img src="istockphoto-1277186147-612x612.jpg" alt="Talk" />
          </Link>
        </div>
      </div>
      <NavBar />
    </>
  );
}

export default ChooseEventPage;
