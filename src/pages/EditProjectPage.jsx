import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";

function EditProjectPage() {
  const [errorMessage, setErrorMessage] = useState;
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {};

  return (
    <div className="editProject">
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <img
        className="profilePicture"
        src={user.profile_img}
        alt="profile picture"
      />

      <form>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button>Edit</button>
      </form>
    </div>
  );
}

export default EditProjectPage;
