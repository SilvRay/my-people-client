import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

function EventCard({ events }) {
  const { user } = useContext(AuthContext);

  return (
    <div className="events-container">
      {events.map((event) => {
        return (
          <div key={event._id} className="event-card">
            <h3 className="mine">{event.type}</h3>
            <img src={`/my-people-client/images/${event.type}.jpg`} alt="" />
            {event.creator === user._id ? (
              <Link to={`/events/${event._id}/edit`}>Edit</Link>
            ) : (
              <Link to={`/events/${event._id}`}>See</Link>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default EventCard;
