function PostMosaic({ posts, handleMediaClick }) {
  return (
    <div className="posts-profile-container">
      {posts.map((post) => {
        return (
          <div key={post._id} className="post">
            {post.medias.length === 1 ? (
              <img
                src={post.medias[0]}
                alt="media"
                className="media"
                onClick={() => handleMediaClick(post.medias, 0)}
              />
            ) : (
              <>
                <img
                  src={post.medias[0]}
                  alt="media"
                  className="media"
                  onClick={() => handleMediaClick(post.medias, 0)}
                />
                <img
                  src="../../public/images/multiple.png"
                  alt="multiple medias icon"
                  className="multiple-medias-icon"
                />
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default PostMosaic;
