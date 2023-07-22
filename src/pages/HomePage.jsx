import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import myaxios from "../myaxios";
import NavBar from "../components/NavBar";
import FullscreenMedia from "../components/FullscreenMedia";

function HomePage() {
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [tab, setTab] = useState("medias");
  const [userHasGroup, setUserHasGroup] = useState(false);
  const [contentExists, setContentExists] = useState(false);

  const [posts, setPosts] = useState([]);
  const [showFullscreenMedia, setShowFullscreenMedia] = useState(false);
  const [fullscreenMediaUrl, setFullscreenMediaUrl] = useState("");

  const [events, setEvents] = useState([]);

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
    // Extraire les paramètres de recherche de l'URL avec URLSearchParams qui est une API native du navigateur
    // Cette fonction permet de récupérer les valeurs des paramètres de recherche en fonction de leur nom
    const getQueryStringValue = (key) => {
      // Création d'un objet URLSearchParams à parti de l'URL en cours
      const urlSearchParams = new URLSearchParams(window.location.search);

      // Utiliser la méthode get pour récupérer la valeur du paramètre de recherche "key"
      const value = urlSearchParams.get(key);

      return value;
    };

    // Récuperer la valeur de l'onglet depuis l'URL
    const tabFromUrl = getQueryStringValue("tab");

    // Vérifier si l'onglet est valide sinon utiliser "medias" par défaut
    const validTabs = ["medias", "events", "projects"];
    const selectedTab = validTabs.includes(tabFromUrl) ? tabFromUrl : "medias";

    // MAJ du state de l'onglet
    setTab(selectedTab);

    // Requête pour vérifier si le user appartient à un groupe
    myaxios
      .get("/api/users")
      .then((response) => {
        // console.log("response.data", response.data);
        setUserHasGroup(response.data.belongsToGroup); // renvoie un Boolean qui indique si le user appartient ou pas à un groupe
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  }, []);

  useEffect(() => {
    myaxios
      .get(`/api/${tab}?page=${1}`)
      .then((response) => {
        console.log("response.data", response.data);

        const hasContent = response.data.length > 0 ? true : false;
        setContentExists(hasContent);
        setPosts(response.data);
        setEvents(response.data);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
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
      <h1>Group Name</h1> {/* faire apparaître le nom du groupe dans le h1 */}
      {contentExists === false && (
        <>
          <p className="alert">You do not have any of your people right now</p>
          <div className="new-group-container">
            <img src="../../images/Group-new.png" alt="add-icon" />
            <p>Create your group</p>
          </div>
        </>
      )}
      {tab === "medias" && contentExists && (
        <div className="medias-container">
          {posts.map((post) => {
            return (
              <div key={post._id} className="post">
                <div className="whos-post">
                  <img
                    src={
                      post.creator.profile_img ||
                      "https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_user-64.png"
                    }
                    alt="profile picture of the user"
                  />
                  <h3>{post.creator.username}</h3>
                </div>
                {post.medias.length === 1 ? (
                  <img
                    src={post.medias[0]}
                    alt="media"
                    className="media"
                    onClick={() => handleMediaClick(post.medias[0])}
                  />
                ) : (
                  <>
                    <img
                      src={post.medias[0]}
                      alt="media"
                      className="media"
                      onClick={() => handleMediaClick(post.medias[0])}
                    />
                    <img
                      src="../../images/multiple.png"
                      alt="multiple medias icon"
                      className="multiple-medias-icon"
                    />
                  </>
                )}
                <p>{post.legend}</p>
              </div>
            );
          })}
        </div>
      )}
      {showFullscreenMedia && (
        <FullscreenMedia
          mediaUrl={fullscreenMediaUrl}
          onClose={handleCloseFullScreenMedia}
        />
      )}
      {tab === "events" && contentExists && (
        <>
          <div className="header-events">
            <img src="" alt="lightning icon" />
            <h2>Events</h2>
          </div>

          <div className="filters">
            <span>all events</span>
            <span>my events</span>
            <span>events I go</span>
          </div>

          <div className="events-container">
            {events.map((event) => {
              return (
                <div key={event._id} className="event">
                  <p>{event.date}</p>
                  <h3>{event.type}</h3>
                  {/* différentes images selon le type d'évènements */}
                  <Link to="/events/:eventId">See</Link>
                </div>
              );
            })}
          </div>
        </>
      )}
      {tab === "projects" && contentExists}
      <NavBar />
    </div>
  );
}

export default HomePage;
