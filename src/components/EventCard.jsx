import { Link } from "react-router-dom";

function EventCard({ events }) {
  <div className="events-container">
    {events.map((event) => {
      <div key={event._id} className="event-card">
        <h3>{event.type}</h3>
        <img src={`../../images/${event.type}.jpg`} alt="" />
        <Link to="/events/:eventId">See</Link>
      </div>;
    })}
  </div>;
}

export default EventCard;
