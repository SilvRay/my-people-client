import { useState } from "react";
import { Link } from "react-router-dom";

function Events({ events, user }) {
  // Création d'un state pour filtrer les events à afficher
  const [allOrMyOrParticipateEvents, setAllOrMyOrParticipateEvents] =
    useState("all");

  // Créer une variable égale dans un 1er temps au state events
  let filteredOrNotEvents = events;

  // Si le state pour filtrer les events à afficher égale à "my"
  // filtrer les events pour n'avoir que ceux créés par le user connecté
  if (allOrMyOrParticipateEvents === "my") {
    filteredOrNotEvents = filteredOrNotEvents.filter((event) => {
      // console.log("event.creator:", event.creator);
      return event.creator === user._id;
    });
  }
  // Si le state pour filtrer les events à afficher égale à "participate"
  // filtrer les events pour n'avoir que ceux auxquels le user sera présents
  if (allOrMyOrParticipateEvents === "participate") {
    filteredOrNotEvents = filteredOrNotEvents.filter((event) => {
      // console.log("event.participants", event.participants);
      // console.log("user._id", user._id);
      event.participants.forEach((participant) => {
        return participant._id === user._id;
      });
    });
  }

  // Fonction pour formater l'heure au format HH:MM
  const formatTime = (date) => {
    const options = { hour: "2-digit", minute: "2-digit" };
    return new Date(date).toLocaleTimeString(undefined, options);
  };

  return (
    <>
      <div className="header-events">
        <img src="../../images/lightning.png" alt="lightning icon" />
        <h2>Events</h2>
      </div>

      <div className="filters">
        <span>
          <img
            src={`../../images/selected-${
              allOrMyOrParticipateEvents === "all" ? "true" : "false"
            }.png`}
            alt="selection button"
            onClick={() => setAllOrMyOrParticipateEvents("all")}
          />
          all events
        </span>
        <span>
          <img
            src={`../../images/selected-${
              allOrMyOrParticipateEvents === "my" ? "true" : "false"
            }.png`}
            alt="selection button"
            onClick={() => setAllOrMyOrParticipateEvents("my")}
          />
          my events
        </span>
        <span>
          <img
            src={`../../images/selected-${
              allOrMyOrParticipateEvents === "participate" ? "true" : "false"
            }.png`}
            alt="selection button"
            onClick={() => setAllOrMyOrParticipateEvents("participate")}
          />
          events I go
        </span>
      </div>

      <div className="events-container">
        {filteredOrNotEvents.map((event) => {
          return (
            <div key={event._id} className="event">
              <p>
                {new Date(event.date).toLocaleDateString()} at{" "}
                {formatTime(event.date)}
              </p>
              <div className="event-card">
                <h3
                  className={event.creator === user._id ? "mine" : "not-mine"}
                >
                  {event.type}
                </h3>
                <img src={`../../images/${event.type}.jpg`} alt="" />
                {event.creator === user._id ? (
                  <Link to={`/events/${event._id}/edit`}>Edit</Link>
                ) : (
                  <Link to={`/events/${event._id}`}>See</Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Events;
