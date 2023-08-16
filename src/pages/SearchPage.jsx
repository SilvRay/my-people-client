import { useState, useEffect } from "react";
import myaxios from "../myaxios";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";

function SearchPage() {
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [member, setMember] = useState("");
  // State pour stocker les résultats de la recherche
  const [searchResults, setSearchResults] = useState([]);
  const [group, setGroup] = useState(null);

  // Fonction pour MAJ le state member selon la valeur entrée dans la barre de recherche
  const handleMemberInput = (e) => setMember(e.target.value);

  useEffect(() => {
    // Si le user a entré qqe chose dans la barre de rech
    // Effectuer une  requête pour rechercher les membres du groupe en fonction du username entré
    if (member) {
      myaxios
        .get(`/api/users/search?username=${member}`)
        .then((response) => {
          console.log("Search results:", response.data);
          // MAJ des résultats de la recherche
          setSearchResults(response.data);
        })
        .catch((error) => {
          const errorDescription = error.response.data.message;
          setErrorMessage(errorDescription);
        });
    } else {
      // Si la barre de recherche est vide réinitilialiser les résultats de la recherche
      setSearchResults([]);
    }

    myaxios
      .get(`/api/group/me`)
      .then((response) => {
        // console.log("response.data groupe", response.data);

        // MAJ des infos du groupe
        setGroup(response.data);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  }, [member]);

  // Si le groupe n'est pas encore chargé afficher "loading..."
  if (!group) {
    return "loading...";
  }

  return (
    <div className="searchPage">
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <h1>{group.name}</h1>
      <div className="searchBar">
        <label>
          <img src="../../images/search-members.png" />
          <input
            id="member-search"
            type="text"
            name="search"
            value={member}
            onChange={handleMemberInput}
          />
          <button onClick={() => setMember("")}>Cancel</button>
        </label>
      </div>
      <div className="searchResults">
        {searchResults.map((user) => {
          return (
            <div key={user._id} className="searchResult">
              <img src={user.profileImg} alt="profile picture" />
              <Link to={`/profile/${user._id}?tab=medias`}>
                {user.username}
              </Link>
            </div>
          );
        })}
      </div>

      <NavBar />
    </div>
  );
}

export default SearchPage;
