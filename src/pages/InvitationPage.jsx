import { useContext, useState } from "react";
import NavBar from "../components/NavBar";
import { AuthContext } from "../context/auth.context";
import myaxios from "../myaxios";
import { useNavigate } from "react-router-dom";

function InvitationPage() {
  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [emailsList, setEmailsList] = useState([]); // State pour stocker la liste des e-mails

  const navigate = useNavigate();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    myaxios
      .put(`api/group`, { emailsList })
      .then((response) => {
        console.log("response", response);
        navigate("/home?tab=events");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="invitationPage">
      <main>
        <h2>{user.username}</h2>
        <img
          className="profilePic"
          src={user.profileImg}
          alt="profile picture"
        />
        <form onSubmit={handleSubmit}>
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
              <div key={index}>
                <img
                  src="/my-people-client/images/cancel.png"
                  alt="a cross"
                  onClick={() => handleCancelEmail(index)}
                />
                <p>{email}</p>
              </div>
            ))}
          </div>
          <button className="invitation-btn">Send invitations</button>
        </form>
      </main>

      <NavBar />
    </div>
  );
}

export default InvitationPage;
