import { useState } from "react";
import myaxios from "../myaxios";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";

function AddPostPage() {
  const [legend, setLegend] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  // Extraire la valeur de mediasUrl à partir des paramètres de recherche
  const searchParams = new URLSearchParams(location.search);
  const mediasUrl = searchParams.get("mediasUrl");

  const uploadImage = (files) => {
    return myaxios
      .post("/api/upload", files)
      .then((res) => {
        console.log("res.data ===", res.data);
        return res.data;
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const reqBody = { legend, mediasUrl };

    myaxios
      .post("/api/medias", reqBody)
      .then((response) => {
        console.log("The post created ===", response.data);

        navigate("/home?tab=medias");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="addPostPage">
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        {mediasUrl && (
          <>
            <img src={mediasUrl} alt="media of the post" />
          </>
        )}
        <textarea
          name="legend"
          value={legend}
          onChange={(e) => setLegend(e.target.value)}
          placeholder="Write your legend..."
        />
        <button>Post</button>
      </form>

      <NavBar />
    </div>
  );
}

export default AddPostPage;
