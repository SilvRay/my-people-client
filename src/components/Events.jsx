import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Events({ events, user }) {
  const [selectedAllEvents, setSelectedAllEvents] = useState(true);
  const [selectedMyEvents, setSelectedMyEvents] = useState(false);
  const [selectedEventsIGo, setSelectedEventsIGo] = useState(false);
  const [updatedEvents, setUpdatedEvents] = useState([]);

  useEffect(() => {
    // MAJ des events quand la prop events change
    setUpdatedEvents(events);
  }, [events]);

  // Fonctions qui permet de sélectionner les filtres
  const selectedFilterAllEvents = () => {
    setSelectedAllEvents(true);
    // Désactiver les autres filtres sélectionnés
    setSelectedMyEvents(false);
    setSelectedEventsIGo(false);
  };

  const selectedFilterMyEvents = () => {
    setSelectedMyEvents(true);
    // Désactiver les autres filtres sélectionnés
    setSelectedAllEvents(false);
    setSelectedEventsIGo(false);
  };

  const selectedFilterEventsIGo = () => {
    setSelectedEventsIGo(true);
    // Désactiver les autres filtres sélectionnés
    setSelectedAllEvents(false);
    setSelectedMyEvents(false);
  };

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
            src={`../../images/selected-${selectedAllEvents}.png`}
            alt="selection button"
            onClick={selectedFilterAllEvents}
          />
          all events
        </span>
        <span>
          <img
            src={`../../images/selected-${selectedMyEvents}.png`}
            alt="selection button"
            onClick={selectedFilterMyEvents}
          />
          my events
        </span>
        <span>
          <img
            src={`../../images/selected-${selectedEventsIGo}.png`}
            alt="selection button"
            onClick={selectedFilterEventsIGo}
          />
          events I go
        </span>
      </div>

      <div className="events-container">
        {updatedEvents.map((event) => {
          if (
            selectedAllEvents ||
            (selectedMyEvents && event.creator === user._id) ||
            (selectedEventsIGo && event.participants.includes(user._id))
          ) {
            return (
              <div key={event._id} className="event">
                <p>
                  {new Date(event.date).toLocaleDateString()} at{" "}
                  {formatTime(event.date)}
                </p>
                <div className="event-card">
                  <h3>{event.type}</h3>
                  <img src={`../../images/${event.type}.jpg`} alt="" />
                  <Link to="/events/:eventId">See</Link>
                </div>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </>
  );
}

export default Events;
