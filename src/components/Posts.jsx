import { useState } from "react";

function Posts({ posts, handleMediaClick, user }) {
  // Création d'un state pour filtrer les projets à afficher

  const [allOrMyPosts, setAllOrMyPosts] = useState("all");

  // Fonction pour formater le temps écoulé de manière concise
  const formatTimeAgo = (date) => {
    const currentDate = new Date();
    const timeDifferenceInSeconds = Math.floor(
      (currentDate - new Date(date)) / 1000
    );

    const intervals = [
      { label: "y", seconds: 31536000 },
      { label: "mo", seconds: 2592000 },
      { label: "w", seconds: 604800 },
      { label: "d", seconds: 86400 },
      { label: "h", seconds: 3600 },
      { label: "m", seconds: 60 },
      { label: "s", seconds: 1 },
    ];

    for (const interval of intervals) {
      const value = Math.floor(timeDifferenceInSeconds / interval.seconds);
      if (value >= 1) {
        return ` ${value}${interval.label} ago`;
      }
    }

    return " just now";
  };

  // Créer une variable égale dans un 1er temps au state posts
  let filteredOrNotPosts = posts;
  // Si le state pour filtrer les events à afficher égale à "my"
  // filtrer les posts pour n'avoir que ceux créés par le user connecté
  if (allOrMyPosts === "my") {
    filteredOrNotPosts = filteredOrNotPosts.filter((el) => {
      // console.log("el.creator:", el.creator);
      return el.creator._id === user._id;
    });
  }

  return (
    <>
      <div className="filters">
        <span>
          <img
            src={`/my-people-client/images/selected-${
              allOrMyPosts === "all" ? "true" : "false"
            }.png`}
            alt="selection button"
            onClick={() => setAllOrMyPosts("all")}
          />
          all posts
        </span>
        <span>
          <img
            src={`/my-people-client/images/selected-${
              allOrMyPosts === "my" ? "true" : "false"
            }.png`}
            alt="selection button"
            onClick={() => setAllOrMyPosts("my")}
          />
          my posts
        </span>
      </div>

      <div className="medias-container">
        {filteredOrNotPosts.map((post) => {
          return (
            <div key={post._id} className="post">
              <div className="whos-post">
                <img
                  src={
                    post.creator.profileImg ||
                    "https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_user-64.png"
                  }
                  alt="profile picture of the user"
                />
                <h3>{post.creator.username}</h3>
                <span>{formatTimeAgo(new Date(post.createdAt))}</span>
              </div>
              {post.medias.length === 1 ? (
                <img
                  src={post.medias[0]}
                  alt="media"
                  className="media"
                  onClick={() => handleMediaClick(post.medias, 0, post._id)}
                />
              ) : (
                <>
                  <img
                    src={post.medias[0]}
                    alt="media"
                    className="media"
                    onClick={() => handleMediaClick(post.medias, 0, post._id)}
                  />
                  <img
                    src="/my-people-client/images/multiple.png"
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
    </>
  );
}

export default Posts;
