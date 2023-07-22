function FullscreenMedia(props) {
  return (
    <div className="fullscreen-modal">
      <div className="modal">
        <button className="prevMedia"></button>
        {props.mediaUrl.endsWith(".mp4") ? (
          <video src={props.mediaUrl} controls></video>
        ) : (
          <img
            src={props.mediaUrl}
            alt="fullscreen media"
            className="modal-media"
          />
        )}
        <button className="nextMedia"></button>
      </div>
    </div>
  );
}

export default FullscreenMedia;
