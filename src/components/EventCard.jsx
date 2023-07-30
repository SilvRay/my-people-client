import { Link } from "react-router-dom";

function EventCard({ events }) {
  return (
    <div className="events-container">
      {events.map((event) => {
        return (
          <div key={event._id} className="event-card">
            <h3>{event.type}</h3>
            <img src={`../../images/${event.type}.jpg`} alt="" />
            <Link to={`/events/${event._id}`}>See</Link>
          </div>
        );
      })}
    </div>
  );
}

export default EventCard;
