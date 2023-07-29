import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import myaxios from "../myaxios";
import NavBar from "../components/NavBar";

function InvitationPage() {
  const [email, setEmail] = useState("");
  const { user } = useContext(AuthContext);

  const handleEmailInput = (e) => setEmail(e.target.value);

  const sendInvitations = () => {
    // Créer un tab avec l'adresse email saisi par le user
    const invitedUsers = [email];

    // Vérifier que l'email n'est pas vide
    if (invitedUsers[0] === "") {
      alert("Please enter a valid email address");
      return;
    }

    // Préparer le payload JSON pour L'API Brevo
    const payload = {
      sender: {
        email: user.email,
        name: user.username,
      },
      subject: "Invitation to join our group",
      messageVersions: [
        {
          to: invitedUsers,
          htmlContent:
            "<!DOCTYPE html><html><body><h1>Welcome to our group!</h1><p>You are invited to join our group.</p></body></html>",
          subject: "Invitation to join our group",
        },
      ],
    };

    // Appeler l'API Brevo pour envoyer les invitations par email
    myaxios
      .post("https://api.brevo.com/v3/smtp/email", payload, {
        headers: {
          accept: "application/json",
          "api-key":
            "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",
          "content-type": "application/json",
        },
      })
      .then((response) => {
        console.log("Invitations sent successfully:", response.data);
        alert(`Invitations sent successfully : ${response.data}`);
      })
      .catch((error) => {
        console.error("Failed to send invitations:", error);
        alert(`Failed to send invitations : ${error.response.data.message}`);
      });
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
          <button>Validate</button>
        </div>

        <div className="list-container">
          <h4>List of people to invite</h4>
        </div>
        <button className="invitation-btn" onClick={sendInvitations}>
          Send invitations
        </button>
      </form>

      <NavBar />
    </div>
  );
}

export default InvitationPage;
