import { useState } from "react";
import NavBar from "../components/NavBar";

function InvitationPage() {
  const [email, setEmail] = useState("");
  const [emailsList, setEmailsList] = useState([]); // State pour stocker la liste des e-mails

  const handleEmailInput = (e) => setEmail(e.target.value);

  const handleAllEmails = () => {
    // Ajouter l'e-mail à la liste existante
    setEmailsList([...emailsList, email]);
    // Réinitialiser l'entrée e-mail après l'ajout
    setEmail("");
  };

  const handleCancelEmail = (index) => {
    const updatedEmailsList = [...emailsList];
    // Supprimer l'e-mail du tableau
    updatedEmailsList.splice(index, 1);
    // Mettre à jour la liste des e-mails
    setEmailsList(updatedEmailsList);
  };

  return (
    <div className="invitationPage">
      <img
        className="profilePic"
        src="../../images/profile.png"
        alt="profile picture"
      />
      <form>
        <div className="invitation">
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleEmailInput}
          />
          <a onClick={handleAllEmails}>Validate</a>
        </div>

        <div className="list-container">
          <h4>List of people to invite</h4>
          {emailsList.map((email, index) => (
            <section key={index}>
              <img
                src="../../images/cancel.png"
                alt="a cross"
                onClick={() => handleCancelEmail(index)}
              />
              <p>{email}</p>
            </section>
          ))}
        </div>
        <button className="invitation-btn">Send invitations</button>
      </form>

      <NavBar />
    </div>
  );
}

export default InvitationPage;
