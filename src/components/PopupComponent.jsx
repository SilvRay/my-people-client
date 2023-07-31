import { Link } from "react-router-dom";

function PopupComponent({ popupVisible }) {
  return (
    <div className={`add-popup-container ${popupVisible ? "" : "inactive"}`}>
      <div className="add-popup">
        <Link to="/invite">
          <img src="../../images/add.png" alt="add icon" />
          invite your people
        </Link>

        <label>
          <img src="../../images/add.png" alt="add icon" />
          Add pictures/videos
          <input type="file" capture="user" />
        </label>

        <Link to="/event/types">
          <img src="../../images/add.png" alt="add icon" />
          Create an event
        </Link>

        <Link to="/project/new">
          <img src="../../images/add.png" alt="add icon" />
          Create a project
        </Link>
      </div>

      <div className="tip"></div>
    </div>
  );
}

export default PopupComponent;
