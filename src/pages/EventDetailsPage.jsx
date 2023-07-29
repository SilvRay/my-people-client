import { useState, useEffect } from "react";
import myaxios from "../myaxios";
import { useParams, useNavigate } from "react-router-dom";



function EventDetailsPage() {
    const [event, setEvent] = useState(null);
    const [kidsNb, setKidsNb] = useState(0);
    const [errorMessage, setErrorMessage] = useState(undefined);
    const { eventId } = useParams();
    const navigate = useNavigate();

    const handleKidsNb = (e) => setKidsNb(e.target.value);

    useEffect(() => {
        myaxios
              .get(`/api/events/${eventId}`)
              .then((response) => {
                const oneEvent = response.data;
                setEvent(oneEvent);
              })
              .catch((error) => console.log(error));
          
      }, []);

      const handleSubmit = (e) => {
        e.preventDefault();
        myaxios
          .post(`/api/events/${eventId}/participate"`, kidsNb)
          .then((response) => {
            console.log("response", response);
            navigate("/profile");
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
  
  if(!event) return "loading..."

  return (
    <>
      <div className="event-single-header">
            <div>
                <img src={`../../images/${event.type}.jpg`} alt="" />  
                <p>{event.creator} created the {event.createdAt}</p>
                <p>Date : {formatTime(event.date)}</p>
                <p>Place : {event.place}</p>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="number"
                        name="kidsNb"
                        value={kidsNb}
                        onChange={handleKidsNb}
                        placeholder="0"
                    />
                
                    <p>They will be there</p>
                    {event.participants.map((participant) => {
                        return (
                        <div key={event.participant._id} className="participant img">
                            <h1>{participant.name}</h1>
                        </div>
                    )})}
                            
                    <div className="btn-container">
                        <button type="submit">I will be there</button>
                    </div>
                </form>
            </div>
        </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </>
  );



}


export default EventDetailsPage;