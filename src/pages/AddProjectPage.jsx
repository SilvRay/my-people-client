import myaxios from "../myaxios";
import { useState } from "react";
import { useNavigate } from "react-router";
import NavBar from "../components/NavBar";


function AddProjectPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  const handleTitle = (e) => setTitle(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const reqBody = { title, description };

    myaxios
      .post("/api/projects", reqBody)
      .then((response) => {
        console.log("response", response);
        navigate("/profile");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };



  return (
    <>
            <div className="signupPage">
      <div>
        <img src="#" alt="profile img" />
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleTitle}
          placeholder="Name your project"
        />
        <input
          type="text"
          name="description"
          value={description}
          onChange={handleDescription}
          placeholder="Describe your project"
        />
        <div className="btn-container">
          <button type="submit">Create</button>
        </div>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
    <NavBar/>
    </>

  );
}

export default AddProjectPage;
