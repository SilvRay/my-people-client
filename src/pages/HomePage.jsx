import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import myaxios from "../myaxios";
import NavBar from "../components/NavBar";
import FullscreenMedia from "../components/FullscreenMedia";
import Posts from "../components/Posts";
import Events from "../components/Events";
import { AuthContext } from "../context/auth.context";
import Projects from "../components/Projects";
import { useSearchParams } from "react-router-dom";

function HomePage() {
  const [errorMessage, setErrorMessage] = useState(undefined);

  let [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");
  const { user } = useContext(AuthContext);
  const [group, setGroup] = useState(null);

  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState([]);
  const [projects, setProjects] = useState([]);

  const [showFullscreenMedia, setShowFullscreenMedia] = useState(false);
  const [fullscreenMediaUrl, setFullscreenMediaUrl] = useState("");

  // fonction qui sera appelée quand le user clique sur l'image pour afficher en plein écran
  const handleMediaClick = (mediaUrl) => {
    setFullscreenMediaUrl(mediaUrl);
    setShowFullscreenMedia(true);
  };

  // fonction appelée pour fermer le plein écran
  const handleCloseFullScreenMedia = () => {
    setShowFullscreenMedia(false);
  };

  useEffect(() => {
    myaxios
      .get(`/api/group/me`)
      .then((response) => {
        // console.log("response.data groupe", response.data);
        setGroup(response.data);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  }, []);

  useEffect(() => {
    console.log("tab", tab);

    switch (tab) {
      case "medias":
        myaxios
          .get("/api/medias")
          .then((response) => {
            console.log(response.data);
            setPosts(response.data);
          })
          .catch((error) => console.log(error));
        break;
      case "events":
        myaxios
          .get("/api/events")
          .then((response) => {
            console.log(response.data);
            setEvents(response.data);
          })
          .catch((error) => console.log(error));
        break;
      case "projects":
        myaxios
          .get("/api/projects")
          .then((response) => {
            console.log(response.data);
            setProjects(response.data);
          })
          .catch((error) => console.log(error));
        break;
    }
  }, [tab]);

  return (
    <div className="homepage">
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="tabs-container">
        <Link to="/home?tab=medias">
          <img src="../../images/grid-icon.png" alt="medias-icon" />
        </Link>
        <Link to="/home?tab=events">
          <img src="../../images/event-icon.png" alt="events-icon" />
        </Link>
        <Link to="/home?tab=projects">
          <img src="../../images/project-icon.png" alt="projects-icon" />
        </Link>
      </div>

      {group && (
        <>
          <h1>{group.name}</h1>
        </>
      )}

      {!group ? (
        <>
          <p className="alert">You do not have any of your people right now</p>
          <div className="new-group-container">
            <img src="../../images/Group-new.png" alt="add-icon" />
            <p>Create your group</p>
          </div>
        </>
      ) : (
        <>
          {tab === "medias" && (
            <Posts
              posts={posts}
              handleMediaClick={handleMediaClick}
              user={user}
            />
          )}

          {tab === "events" && <Events events={events} user={user} />}
          {tab === "projects" && <Projects projects={projects} user={user} />}
        </>
      )}

      {showFullscreenMedia && (
        <FullscreenMedia
          mediaUrl={fullscreenMediaUrl}
          onClose={handleCloseFullScreenMedia}
        />
      )}

      <NavBar />
    </div>
  );
}

export default HomePage;
