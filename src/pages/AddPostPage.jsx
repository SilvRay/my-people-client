import { useState, useEffect } from "react";
import myaxios from "../myaxios";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";

function AddPostPage() {
  const [legend, setLegend] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [mediasUrl, setMediasUrl] = useState([]);

  const [currIndex, setCurrIndex] = useState(0);

  const navigate = useNavigate();
  const { mediaId } = useParams();

  useEffect(() => {
    myaxios
      .get(`/api/medias/${mediaId}`)
      .then((response) => {
        setMediasUrl(response.data.medias);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  }, [mediaId]);

  console.log("medias Url content  on AddPostPage=", mediasUrl);

  const handlePrevMediaClick = () => {
    setCurrIndex((prevIndex) => {
      // S'assurer que l'index ne devient pas négatif
      return prevIndex > 0 ? prevIndex - 1 : mediasUrl.length - 1;
    });
  };

  const handleNextMediaClick = () => {
    setCurrIndex((prevIndex) => {
      // S'assurer que l'index ne dépasse pas la longueur de la liste des médias
      return prevIndex < mediasUrl.length - 1 ? prevIndex + 1 : 0;
    });
  };

  // RÃ©cup le mÃ©dia actuellenment affichÃ© en utilisant
  const currMediaUrl = mediasUrl[currIndex];

  const handleSubmit = (e) => {
    e.preventDefault();

    const reqBody = { legend };

    myaxios
      .put(`/api/medias/${mediaId}/legend`, reqBody)
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
      <main>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {/* Si plusieurs mÃ©dias sont disponibles, afficher une liste d'images avec des boutons de navigation */}
        {mediasUrl.length > 1 ? (
          <div className="nav-medias">
            <button className="prevMedia-btn" onClick={handlePrevMediaClick}>
              <img
                className="prevMedia"
                src="/my-people-client/images/prev-media.png"
                alt="previous icon"
              />
            </button>

            <img src={currMediaUrl} alt="media of the post" />

            <button className="nextMedia-btn" onClick={handleNextMediaClick}>
              <img
                className="nextMedia"
                src="/my-people-client/images/next-media.png"
                alt="next icon"
              />
            </button>
          </div>
        ) : (
          // Sinon, afficher simplement l'image unique
          <>
            <img src={mediasUrl[0]} alt="media of the post" />
          </>
        )}

        <form onSubmit={handleSubmit}>
          <textarea
            name="legend"
            value={legend}
            onChange={(e) => setLegend(e.target.value)}
            placeholder="Write your legend..."
          />
          <button>Post</button>
        </form>
      </main>
      <NavBar />
    </div>
  );
}

export default AddPostPage;
