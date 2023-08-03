import { useState } from "react";
import myaxios from "../myaxios";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";

function AddPostPage() {
  const [legend, setLegend] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [currIndex, setCurrIndex] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  // Extraire la valeur de mediasUrl à partir des paramètres de recherche
  const searchParams = new URLSearchParams(location.search);
  const mediasUrl = searchParams.getAll("mediasUrl"); //Utilisez getAll pour obtenir tous les paramètres 'mediasUrl' sous forme de tableau

  console.log("medias Url content =", mediasUrl);

  const handlePrevMediaClick = () => {
    setCurrIndex((prevIndex) => {
      // S'assurer que l'index ne devient pas négatif
      return prevIndex > 0 ? prevIndex - 1 : 0;
    });
  };

  const handleNextMediaClick = () => {
    setCurrIndex((prevIndex) => {
      // S'assurer que l'index ne dépasse pas la longueur de la liste des médias
      return prevIndex < mediasUrl.length - 1 ? prevIndex + 1 : prevIndex;
    });
  };

  // Récup le média actuellenment affiché en utilisant
  const currMediaUrl = mediasUrl[currIndex];

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
        {/* Si plusieurs médias sont disponibles, afficher une liste d'images avec des boutons de navigation */}
        {mediasUrl.length > 1 ? (
          <>
            <button className="prevMedia" onClick={handlePrevMediaClick}>
              <img src="../../images/prev-media.png" alt="previous icon" />
            </button>
            <img src={currMediaUrl} alt="media of the post" />
            <button className="nextMedia" onClick={handleNextMediaClick}>
              <img src="../../images/next-media.png" alt="next icon" />
            </button>
          </>
        ) : (
          // Sinon, afficher simplement l'image unique
          <>
            <img src={mediasUrl[0]} alt="media of the post" />
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
