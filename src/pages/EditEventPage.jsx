import { useContext, useEffect, useState } from "react";
import myaxios from "../myaxios";
import { AuthContext } from "../context/auth.context";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";

function EditEventPage() {
  const [event, setEvent] = useState({});
  const [type, setType] = useState("");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [meal, setMeal] = useState("");
  const [games, setGames] = useState("");
  const [theme, setTheme] = useState("");
  const { user } = useContext(AuthContext);

  const [errorMessage, setErrorMessage] = useState("");

  const { eventId } = useParams();
  const navigate = useNavigate;

  // Fonction d'aide pour formater la date et l'heure pour l'élément input
  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const formattedDateTime = dateTime.toISOString().slice(0, 16); // Get the first 16 characters (YYYY-MM-DDTHH:mm)
    return formattedDateTime;
  };

  useEffect(() => {
    // Charger les détails de l'événement à partir de l'API lorsque le composant est monté
    myaxios
      .get(`/api/events/${eventId}`)
      .then((response) => {
        setEvent(response.data);
        setType(response.data.type);
        setPlace(response.data.place);

        // Extraire la date et l'heure à partir de la valeur de date récupérée depuis l'API
        const formattedDateTime = formatDateTime(response.data.date);
        console.log("formattedDateTime ===", formattedDateTime);
        const [formattedDate, formattedTime] = formattedDateTime.split("T");
        setDate(formattedDate);
        console.log("formattedTime", formattedTime);
        setTime(formattedTime);

        setMeal(response.data.meal || "");
        setGames(response.data.games || "");
        setTheme(response.data.theme || "");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  }, [eventId]);

  const handleSubmit = (e) => {
    e.preventDeafault();

    // Combiner la date et l'heure pour former un objet Date valide
    const combinedDateTime = new Date(`${date} ${time}`);

    const reqBody = { type, place, date: combinedDateTime, meal, games, theme };

    // Faire une requête PUT pour MAJ l'event
    myaxios
      .put(`/api/events/${eventId}`, reqBody)
      .then((response) => {
        setEvent(response.data);

        navigate("/profile?tab=events");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="editEvent">
      {errorMessage && <p className="error-message">{errorMessage}</p>}
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
          onChange={(e) => setPlace(e.target.value)}
        />
        <label>
          Date{" "}
          <input
            className="date"
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            className="time"
            type="time"
            name="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </label>
        {event.type === "Food Time" && (
          <input
            type="text"
            name="meal"
            value={meal}
            onChange={(e) => setMeal(e.target.value)}
          />
        )}
        {event.type === "Game Time" && (
          <input
            type="text"
            name="games"
            value={games}
            onChange={(e) => setGames(e.target.value)}
          />
        )}
        {event.type === "Real Talk" && (
          <input
            type="text"
            name="theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          />
        )}
        <button>Edit</button>
      </form>

      <NavBar />
    </div>
  );
}

export default EditEventPage;
