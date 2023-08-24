import { useEffect, useState } from "react";
import myaxios from "../myaxios";
import { Link, useParams, useSearchParams } from "react-router-dom";
import PostMosaic from "../components/PostMosaic";
import EventCard from "../components/EventCard";
import ProjectCard from "../components/ProjectCard";
import FullscreenMedia from "../components/FullscreenMedia";
import NavBar from "../components/NavBar";

function MemberProfilePage() {
  const { userId } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(undefined);

  let [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");

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
    myaxios
      .get(`/api/user/${userId}`)
      .then((response) => {
        console.log("Member profile data ===", response.data);

        setUserProfile(response.data);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  }, [userId]);

  useEffect(() => {
    console.log("tab", tab);

    switch (tab) {
      case "medias":
        myaxios
          .get(`/api/user/${userId}/medias`)
          .then((response) => {
            console.log("Les posts du user :", response.data);
            setPosts(response.data);
          })
          .catch((error) => console.log(error));
        break;
      case "events":
        myaxios
          .get(`/api/user/${userId}/events`)
          .then((response) => {
            console.log("Les events du user :", response.data);
            setEvents(response.data);
          })
          .catch((error) => console.log(error));
        break;
      case "projects":
        myaxios
          .get(`/api/user/${userId}/projects`)
          .then((response) => {
            console.log("Les projects du user :", response.data);
            setProjects(response.data);
          })
          .catch((error) => console.log(error));
        break;
    }
  }, [tab, userId]);

  if (userProfile === null) {
    return "Loading...";
  }

  return (
    <div className="member-profile">
      <main>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="head">
          <h2>{userProfile.username}</h2>
          <img
            src={userProfile.profileImg}
            alt="profile picture"
            className="profile-pic"
          />
        </div>

        <div className="tabs-container">
          <Link to={`/profile/${userId}?tab=medias`}>
            <img
              src="/my-people-client/images/grid-icon.png"
              alt="medias-icon"
            />
          </Link>
          <Link to={`/profile/${userId}?tab=events`}>
            <img
              src="/my-people-client/images/event-icon.png"
              alt="events-icon"
            />
          </Link>
          <Link to={`/profile/${userId}?tab=projects`}>
            <img
              src="/my-people-client/images/project-icon.png"
              alt="projects-icon"
            />
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
      </main>

      <NavBar />
    </div>
  );
}

export default MemberProfilePage;
