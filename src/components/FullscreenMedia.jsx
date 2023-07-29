function FullscreenMedia({ mediaUrl, onClose }) {
  return (
    <div className="fullscreen-modal">
      <div className="modal">
        <button className="prevMedia"></button>
        {mediaUrl.endsWith(".mp4") ? (
          <video src={mediaUrl} controls></video>
        ) : (
          <img src={mediaUrl} alt="fullscreen media" className="modal-media" />
        )}
        <button className="nextMedia"></button>
      </div>
    </div>
  );
}

export default FullscreenMedia;
