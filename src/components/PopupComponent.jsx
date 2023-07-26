import { Link } from "react-router-dom";

function PopupComponent() {
  //   const $popup = document.getElementsByClassName("add-popup");
  //   console.log("$popup[0]", $popup[0]);

  //   $popup.className -= " inactive";

  return (
    <div className="add-popup-container">
      <div className="add-popup">
        <Link>
          <img src="../../images/add.png" alt="add icon" />
          invite your people
        </Link>
        <Link>
          <img src="../../images/add.png" alt="add icon" />
          Add picture/video
        </Link>
        <Link>
          <img src="../../images/add.png" alt="add icon" />
          Create an event
        </Link>
        <Link>
          <img src="../../images/add.png" alt="add icon" />
          Create a project
        </Link>
      </div>
      <div className="tip"></div>
    </div>
  );
}

export default PopupComponent;
