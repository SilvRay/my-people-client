import myaxios from "../myaxios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/auth.context";
import NavBar from "../components/NavBar";

function AddGroupPage() {
  const { user, refreshUser } = useContext(AuthContext);
  const [name, setGroupName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  const handleGroupName = (e) => setGroupName(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const reqBody = { name };

    myaxios
      .post("/api/groups", reqBody)
      .then((response) => {
        console.log("response", response);

        refreshUser();
        navigate(`/invite`);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="addGroup-page">
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <img
        className="profilePicture"
        src={user.profile_img}
        alt="profile img"
      />

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="groupName"
          value={name}
          onChange={handleGroupName}
          placeholder="Group name"
        />

        <button type="submit">Create your group</button>
      </form>

      <NavBar />
    </div>
  );
}

export default AddGroupPage;
