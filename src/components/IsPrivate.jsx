import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

function IsPrivate({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) return <p>Loading...</p>;

  if (!isLoggedIn) {
    // si le user n'est pas connecté renvoyer à la page de connexion
    return <Navigate to="/login" />;
  } else {
    // si le user est connecté permettre de voir la page
    return children;
  }
}

export default IsPrivate;
