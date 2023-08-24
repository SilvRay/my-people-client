import { useEffect, useState } from "react";
import myaxios from "../myaxios";
// import { useParams } from "react-router-dom";

function FullscreenMedia({
  mediaList,
  onClose,
  setCurrIndex,
  currIndex,
  mediaId,
}) {
  const [content, setContent] = useState("");
  const [comments, setComments] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleBackgroundClick = (event) => {
    // Vérifier si l'événement provient de la fenêtre modale ou de ses enfants
    if (event.target.className === "fullscreen-modal") {
      onClose();
    }
  };

  const handlePrevMediaClick = () => {
    setCurrIndex((prevIndex) => {
      // S'assurer que l'index ne devient pas négatif
      return prevIndex > 0 ? prevIndex - 1 : 0;
    });
  };

  const handleNextMediaClick = () => {
    setCurrIndex((prevIndex) => {
      // S'assurer que l'index ne dépasse pas la longueur de la liste des médias
      return prevIndex < mediaList.length - 1 ? prevIndex + 1 : prevIndex;
    });
  };

  // Récup le média actuellenment affiché en utilisant
  const currMediaUrl = mediaList[currIndex];

  useEffect(() => {
    myaxios
      .get(`/api/medias/${mediaId}/comments`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  }, [mediaId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("mediaId ===", mediaId);

    myaxios
      .post(`/api/medias/${mediaId}/comments`, { content: content })
      .then((response) => {
        console.log("response.data====", response.data);
        console.log("content ====", content);

        setContent("");
        // MAJ du state pour que le commentaire entré s'affiche directement dans les commentaires
        setComments(response.data.comments);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="fullscreen-modal" onClick={handleBackgroundClick}>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="modal">
        {mediaList.length > 1 && (
          <button className="prevMedia" onClick={handlePrevMediaClick}>
            <img
              src="/my-people-client/public/images/prev-media.png"
              alt="previous icon"
            />
          </button>
        )}

        {currMediaUrl.endsWith(".mp4") ? (
          <video src={currMediaUrl} controls></video>
        ) : (
          <img
            src={currMediaUrl}
            alt="fullscreen media"
            className="modal-media"
          />
        )}
        {mediaList.length > 1 && (
          <button className="nextMedia" onClick={handleNextMediaClick}>
            <img
              src="/my-people-client/images/next-media.png"
              alt="next icon"
            />
          </button>
        )}
      </div>

      <div className="com-container">
        {comments.map((comment) => {
          return (
            <div key={comment._id} className="comment">
              <img src={comment.userId.profileImg} alt="profile picture" />
              <p>{comment.content}</p>
            </div>
          );
        })}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Comment..."
        />
        <button>
          <img src="/my-people-client/images/send.png" />
        </button>
      </form>
    </div>
  );
}

export default FullscreenMedia;
