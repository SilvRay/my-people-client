import { useEffect, useState } from "react";

function Posts({ posts, handleMediaClick }) {
  const [updatedPosts, setUpdatedPosts] = useState([]);

  useEffect(() => {
    //MAJ des posts quand la prop posts change
    setUpdatedPosts(posts);
  }, [posts]);

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
        return `${value}${interval.label} ago`;
      }
    }

    return "just now";
  };

  return (
    <div className="medias-container">
      {updatedPosts.map((post) => {
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
              <h3>{post.creator.username}</h3>{" "}
              <span>{formatTimeAgo(new Date(post.createdAt))}</span>
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
  );
}

export default Posts;
