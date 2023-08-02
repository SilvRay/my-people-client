import { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import myaxios from "../myaxios";

import NavBar from "../components/NavBar";
import ProjectCard from "../components/ProjectCard";
import FullscreenMedia from "../components/FullscreenMedia";
import EventCard from "../components/EventCard";
import PostMosaic from "../components/PostMosaic";

function ProfilePage() {
  const { user, logoutUser } = useContext(AuthContext);
  let [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");

  console.log("user ===", user);

  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState([]);
  const [projects, setProjects] = useState([]);

  const [showFullscreenMedia, setShowFullscreenMedia] = useState(false);
  const [currIndex, setCurrIndex] = useState(0);
  const [mediaList, setMediaList] = useState([]);
  const [mediaId, setMediaId] = useState("");

  // fonction qui sera appelée quand le user clique sur l'image pour afficher en plein écran
  const handleMediaClick = (mediaList, mediaIndex, postId) => {
    // Passer l'ensemble des médias du post
    // Pour que le component 'FullscreenMedia' ait accès à la liste complète des médias du post
    console.log("mediaList ====", mediaList);
    setMediaList(mediaList);
    setShowFullscreenMedia(true);
    // setFullscreenMediaUrl(mediaList[mediaIndex]); // Afficher le 1er média du post
    setCurrIndex(mediaIndex);

    setMediaId(postId);
  };

  // fonction appelée pour fermer le plein écran
  const handleCloseFullScreenMedia = () => {
    setShowFullscreenMedia(false);
  };

  useEffect(() => {
    console.log("tab", tab);

    switch (tab) {
      case "medias":
        myaxios
          .get("/api/user/medias")
          .then((response) => {
            console.log("Les posts du user :", response.data);
            setPosts(response.data);
          })
          .catch((error) => console.log(error));
        break;
      case "events":
        myaxios
          .get("/api/user/events")
          .then((response) => {
            console.log("Les events du user :", response.data);
            setEvents(response.data);
          })
          .catch((error) => console.log(error));
        break;
      case "projects":
        myaxios
          .get("/api/user/projects")
          .then((response) => {
            console.log("Les projects du user :", response.data);
            setProjects(response.data);
          })
          .catch((error) => console.log(error));
        break;
    }
  }, [tab]);

  return (
    <div className="profile">
      <div className="head">
        <img
          src="../../images/logout.png"
          alt="logout icon"
          className="logout"
          onClick={logoutUser}
        />
        <h2>{user.username}</h2>
        <img
          src={user.profile_img}
          alt="profile picture"
          className="profile-pic"
        />
        <Link to="/profile/edit">Edit your profile</Link>
      </div>

      <div className="tabs-container">
        <Link to="/profile?tab=medias">
          <img src="../../images/grid-icon.png" alt="medias-icon" />
        </Link>
        <Link to="/profile?tab=events">
          <img src="../../images/event-icon.png" alt="events-icon" />
        </Link>
        <Link to="/profile?tab=projects">
          <img src="../../images/project-icon.png" alt="projects-icon" />
        </Link>
      </div>

      {tab === "medias" && (
        <PostMosaic posts={posts} handleMediaClick={handleMediaClick} />
      )}
      {tab === "events" && <EventCard events={events} />}
      {tab === "projects" && <ProjectCard projects={projects} />}

      {showFullscreenMedia && (
        <FullscreenMedia
          onClose={handleCloseFullScreenMedia}
          setCurrIndex={setCurrIndex}
          currIndex={currIndex}
          mediaList={mediaList}
          posts={posts}
          mediaId={mediaId}
        />
      )}

      <NavBar />
    </div>
  );
}

export default ProfilePage;
