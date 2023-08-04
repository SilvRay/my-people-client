import myaxios from "../myaxios";
import { useState } from "react";
import { useNavigate } from "react-router";

function AddGroupPage() {
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
        navigate(`/invite`);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="signupPage">
      <div>
        <img src="#" alt="profile img" />  
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="groupName"
          value={name}
          onChange={handleGroupName}
          placeholder="Group name"
        />
        <div className="btn-container">
          <button type="submit">Create your group</button>
        </div>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default AddGroupPage;
