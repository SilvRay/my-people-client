import { useContext, useEffect, useState } from "react";
import myaxios from "../myaxios";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";

function FullscreenMedia({
  mediaList,
  onClose,
  setCurrIndex,
  currIndex,
  mediaId,
}) {
  const { refreshUser } = useContext(AuthContext);
  const [content, setContent] = useState("");
  const [comments, setComments] = useState([]);

  const navigate = useNavigate();

  const handleBackgroundClick = (event) => {
    // Vérifier si l'événement provient de la fenêtre modale ou de ses enfants
    if (event.target.className === "fullscreen-modal") {
      onClose();
    }
  };

  const handlePrevMediaClick = () => {
    setCurrIndex((prevIndex) => {
      // S'assurer que l'index ne devient pas négatif
      return prevIndex > 0 ? prevIndex - 1 : mediaList.length - 1;
    });
  };

  const handleNextMediaClick = () => {
    setCurrIndex((prevIndex) => {
      // S'assurer que l'index ne dépasse pas la longueur de la liste des médias
      return prevIndex < mediaList.length - 1 ? prevIndex + 1 : 0;
    });
  };

  const handleDeleteComClick = (commentId) => {
    myaxios
      .delete(`/api/medias/${mediaId}/comments/${commentId}`)
      .then((response) => {
        console.log("Comment deleted successfully.", response);
        setComments((prevComments) => {
          return prevComments.filter((comment) => comment._id !== commentId);
        });
        navigate("/home?tab=medias");
      })
      .catch((error) => console.log("The ERROR:", error));
  };

  // Récup le média actuellenment affiché en utilisant
  const currMediaUrl = mediaList[currIndex];

  useEffect(() => {
    myaxios
      .get(`/api/medias/${mediaId}/comments`)
      .then((response) => {
        setComments(response.data);
        refreshUser();
      })
      .catch((error) => {
        console.log("Error deleting comment", error);
      });
  }, [mediaId, refreshUser]);

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
        console.log("The ERROR:", error);
      });
  };

  return (
    <div className="fullscreen-modal" onClick={handleBackgroundClick}>
      <div className="modal">
        {mediaList.length > 1 && (
          <button className="prevMedia" onClick={handlePrevMediaClick}>
            <img
              src="/my-people-client/images/prev-media.png"
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
              <img
                className="profilePic"
                src={comment.userId.profileImg}
                alt="profile picture"
              />
              <p>{comment.content}</p>
              <img
                className="delete-icon"
                src="/my-people-client/images/delete.png"
                alt="trash can icon"
                onClick={() => handleDeleteComClick(comment._id)}
              />
            </div>
          );
        })}
      </div>

      <form onSubmit={handleSubmit}>
        <textarea
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Comment..."
        />
        <button>
          <img src="/my-people-client/images/send.png" alt="send icon" />
        </button>
      </form>
    </div>
  );
}

export default FullscreenMedia;
