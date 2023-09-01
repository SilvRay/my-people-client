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
  let [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");
  const { user } = useContext(AuthContext);
  const [group, setGroup] = useState(undefined);

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
      .get(`/api/group/me`)
      .then((response) => {
        // console.log("response.data groupe", response.data);
        setGroup(response.data);
      })
      .catch((error) => {
        console.log("THE ERROR IS:", error);
      });
  }, []);

  useEffect(() => {
    console.log("tab", tab);

    switch (tab) {
      case "medias":
        myaxios
          .get("/api/medias")
          .then((response) => {
            console.log("medias", response.data);

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
      <main>
        <div className="tabs-container">
          <Link to="/home?tab=medias">
            <img
              src="/my-people-client/images/grid-icon.png"
              alt="medias-icon"
            />
          </Link>
          <Link to="/home?tab=events">
            <img
              src="/my-people-client/images/event-icon.png"
              alt="events-icon"
            />
          </Link>
          <Link to="/home?tab=projects">
            <img
              src="/my-people-client/images/project-icon.png"
              alt="projects-icon"
            />
          </Link>
        </div>

        {!group ? (
          <>
            <p className="alert">
              You do not have any of your people right now
            </p>
            <Link className="new-group-link" to="/new-group">
              <div className="new-group-container">
                <img
                  src="/my-people-client/images/Group-new.png"
                  alt="add-icon"
                />
                <p>Create your group</p>
              </div>
            </Link>
          </>
        ) : (
          <>
            <h1>{group.name}</h1>

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

export default HomePage;
