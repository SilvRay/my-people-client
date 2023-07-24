import React, { useState, useEffect } from "react";
import myaxios from "../myaxios";

const AuthContext = React.createContext();

function AuthProviderWrapper({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  const authenticateUser = () => {
    // Récuperer le token à partir du localStorage
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      // Si le token existe dans le localStorage faire une requête à l'endpoint de verif
      myaxios
        .get("/auth/verify")
        .then((response) => {
          const user = response.data;
          // MAJ des states pour signifier que le user est authentifié
          setIsLoggedIn(true);
          setIsLoading(false);
          setUser(user);
        })
        .catch((error) => {
          console.log("The error is :", error);
          // MAJ des states pour signifier que le user n'est pas authentifié
          setIsLoggedIn(false);
          setIsLoading(false);
          setUser(null);
        });
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  };

  const removeToken = () => {
    localStorage.removeItem("authToken");
  };

  const logoutUser = () => {
    // Pour déconnecter le user retirer le token
    removeToken();
    // MAJ des states
    authenticateUser();
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  const obj = {
    isLoggedIn,
    isLoading,
    user,
    storeToken,
    authenticateUser,
    logoutUser,
  };

  return <AuthContext.Provider value={obj}>{children}</AuthContext.Provider>;
}

export { AuthProviderWrapper, AuthContext };
