import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import NavBar from "../components/NavBar";
import myaxios from "../myaxios";
import { useNavigate } from "react-router-dom";

function AddProjectPage() {
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const handleNameInput = (e) => setTitle(e.target.value);
  const handleDescriptionTextarea = (e) => setDescription(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const reqBody = { title, description };

    myaxios
      .post("/api/projects", reqBody)
      .then((response) => {
        console.log("response.data ===", response.data);

        navigate("/profile?tab=projects");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="new-project">
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <img
        className="profile-pic"
        src={user.profile_img}
        alt="profile picture"
      />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={title}
          onChange={handleNameInput}
          placeholder="Name your project"
        />

        <textarea
          name="description"
          value={description}
          onChange={handleDescriptionTextarea}
          placeholder="Describe your project"
        />

        <button>Validate</button>
      </form>

      <NavBar />
    </div>
  );
}

export default AddProjectPage;
