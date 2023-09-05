import { useState, useEffect, useContext } from "react";
import myaxios from "../myaxios";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { AuthContext } from "../context/auth.context";

function EventDetailsPage() {
  const { user } = useContext(AuthContext);
  const [event, setEvent] = useState(null);
  const [kidsNb, setKidsNb] = useState(0);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { eventId } = useParams();
  const navigate = useNavigate();

  const handleKidsNb = (e) => setKidsNb(e.target.value);

  let participation = false;

  useEffect(() => {
    myaxios
      .get(`/api/events/${eventId}`)
      .then((response) => {
        const oneEvent = response.data;
        setEvent(oneEvent);
      })
      .catch((error) => console.log(error));
  }, [eventId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    participation = !participation;
    console.log("participation =", participation);
    myaxios
      .put(`/api/events/${eventId}/participate`, { kidsNb, participation })
      .then((response) => {
        console.log("response", response);
        navigate("/home?tab=events");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  // Fonction pour formater l'heure au format HH:MM
  const formatTime = (date) => {
    const options = { hour: "2-digit", minute: "2-digit" };
    return new Date(date).toLocaleTimeString(undefined, options);
  };

  if (!event) return "loading...";

  if (event.participants.some((e) => (e._id = user._id))) {
    participation = true;
  }

  console.log("participation before submit =", participation);
  return (
    <>
      <div className="details-page">
        <main>
          <div className="event-details-header">
            <div>
              <img src={`/my-people-client/images/${event.type}.jpg`} alt="" />
            </div>

            <div>
              <h1>{event.type}</h1>

              <p className="eventcreation">
                <strong>{event.creator.username}</strong> event
              </p>

              <p>
                {" "}
                <strong> Date : </strong>
                <span className="eventHeaderText">
                  {new Date(event.date).toLocaleDateString()} at{" "}
                  {formatTime(event.date)}
                </span>
              </p>

              <p>
                <strong>Place : </strong>
                <span className="eventHeaderText">{event.place}</span>
              </p>
            </div>
          </div>

          <div className="participation-form">
            <form onSubmit={handleSubmit}>
              <div className="formText">
                <p>
                  {" "}
                  I will bring{" "}
                  <input
                    type="number"
                    name="kidsNb"
                    min="0"
                    value={kidsNb}
                    onChange={handleKidsNb}
                    placeholder="0"
                  />{" "}
                  kids
                </p>

                <p>They will be there</p>

                {event.participants.map((participant) => {
                  return (
                    <div key={participant._id} className="participant img">
                      {console.log("participant.name ==", participant.name)}
                      <p>{participant.name}</p>
                    </div>
                  );
                })}
              </div>

              <div className="btn-container">
                {!participation ? (
                  <button type="submit">I will be there</button>
                ) : (
                  <button type="submit">I am not coming anymore</button>
                )}
              </div>
            </form>
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </main>
        <NavBar />
      </div>
    </>
  );
}

export default EventDetailsPage;
