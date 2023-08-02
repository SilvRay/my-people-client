import myaxios from "../myaxios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import NavBar from "../components/NavBar";
import { useSearchParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function AddEventPage() {
  let [searchParams] = useSearchParams();
  const event = searchParams.get("event");
  const { user } = useContext(AuthContext);

  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [food, setFood] = useState("");
  const [game, setGame] = useState("");
  const [trip, setTrip] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  const handlePlace = (e) => setPlace(e.target.value);
  const handleDate = (e) => setDate(e.target.value);
  const handleTime = (e) => setTime(e.target.value);
  const handleFood = (e) => setFood(e.target.value);
  const handleGame = (e) => setGame(e.target.value);
  const handleTrip = (e) => setTrip(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const reqBody = { type, place, date, time, food, game, trip };

    myaxios
      .post("/api/events", reqBody)
      .then((response) => {
        console.log("response", response);
        navigate("/profile");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  let type = "";

  switch (event) {
    case "food":
      type = "Food Time";
      break;
    case "movie":
      type = "Movie Time";
      break;
    case "game":
      type = "Game Time";
      break;
    case "trip":
      type = "Trip Time";
      break;
    case "talk":
      type = "Real Talk";
      break;
  }

  return (
    <div className="addEvent">
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <h2>{user.username}</h2>
      <img
        src={user.profile_img}
        alt="profile picture"
        className="profilePicture"
      />

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="place"
          value={place}
          onChange={handlePlace}
          placeholder="Place"
        />
        <label>
          Date
          <input
            className="date"
            type="date"
            name="date"
            value={date}
            onChange={handleDate}
          />
          <input
            className="time"
            type="time"
            name="time"
            value={time}
            onChange={handleTime}
          />
        </label>
        {event === "food" && (
          <input
            type="text"
            name="food"
            value={food}
            onChange={handleFood}
            placeholder="What are we eating ?"
          />
        )}
        {event === "game" && (
          <input
            type="text"
            name="game"
            value={game}
            onChange={handleGame}
            placeholder="What are we playing ?"
          />
        )}
        {event === "trip" && (
          <input
            type="text"
            name="trip"
            value={trip}
            onChange={handleTrip}
            placeholder="Where are we going ?"
          />
        )}
        <div className="btn-container">
          <button type="submit">Create</button>
        </div>
      </form>
      <NavBar />
    </div>
  );
}

export default AddEventPage;
