import { useEffect } from "react";
import myaxios from "../myaxios";

function CleanupComponent() {
  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      myaxios
        .delete("/api/events")
        .then(() => {
          console.log("Passes Events has been removed successfully !");
        })
        .catch((error) =>
          console.log("ERROR when removing passed events :", error)
        );
    }, 8.64e7);

    // Clear l'interval une fois le component se démonte
    return () => clearInterval(cleanupInterval);
  }, []);

  return null; // Ce component ne rend rien
}

export default CleanupComponent;
