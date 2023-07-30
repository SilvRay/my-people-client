function FullscreenMedia({
  mediaList,
  onClose,
  setCurrIndex,
  currIndex,
  posts,
}) {
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

  return (
    <div className="fullscreen-modal" onClick={handleBackgroundClick}>
      <div className="modal">
        <button className="prevMedia" onClick={handlePrevMediaClick}>
          <img src="../../images/prev-media.png" alt="previous icon" />
        </button>

        {currMediaUrl.endsWith(".mp4") ? (
          <video src={currMediaUrl} controls></video>
        ) : (
          <img
            src={currMediaUrl}
            alt="fullscreen media"
            className="modal-media"
          />
        )}
        <button className="nextMedia" onClick={handleNextMediaClick}>
          <img src="../../images/next-media.png" alt="next icon" />
        </button>
      </div>
      <div className="com-container">
        {posts.map((post) => {
          return (
            <div key={post._id} className="comment">
              <img src={post.creator.profile_img} alt="profile picture" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FullscreenMedia;
