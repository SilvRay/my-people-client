import { useState, useEffect, useContext } from "react";
import myaxios from "../myaxios.js";
import NavBar from "../components/NavBar.jsx";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context.jsx";

function NotificationsPage() {
  const { refreshUser } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const [notifications, setNotifications] = useState([]);

  // Fonction qui retourne le bon message selon le type d'event
  const notifMessage = (notification) => {
    if (notification.type === "Food Time") {
      return "organize a family meal";
    } else if (notification.type === "Movie Time") {
      return "organize a movie session";
    } else if (notification.type === "Game Time") {
      return "organize a game session";
    } else if (notification.type === "Trip Time") {
      return "organize a trip";
    } else if (notification.type === "Real Talk") {
      return "want to talk";
    } else if (notification.title) {
      // Message pour les notifications de projet
      return "created a new project";
    }
  };

  // Fonction pour calculer l'ancienneté d'une notif
  const getTimeDifference = (date) => {
    const today = new Date();
    const notificationDate = new Date(date);
    const timeDifference = today.getTime() - notificationDate.getTime();
    return timeDifference;
  };

  const getTimeLabel = (timeDifference) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const oneWeek = oneDay * 7;
    const oneMonth = oneDay * 30;

    if (timeDifference < oneDay) {
      return "Today";
    } else if (timeDifference < oneWeek) {
      return "This week";
    } else if (timeDifference < oneMonth) {
      return "This month";
    } else {
      return "Earlier";
    }
  };

  // Fonction pour grouper les notif par libellé de temps
  const groupNotifByTimeLabel = (notifications) => {
    // Initialiser un objet vide pour stocker les notifications groupées par libellé de temps
    const groupedNotifications = {};

    // Parcourir les notif et les regouper par libellé de temps
    notifications.forEach((notification) => {
      // Appeler la fonction getTimeDifference
      // Pour calculer la différence de temps entre la date actuelle et la date de notif
      const timeDifference = getTimeDifference(notification.createdAt);
      // Appeler la fonction getTimeLabel
      // Pour obtenir le libellé de temps approprié (Today, This week,...)
      // En fonction de la différence de temps
      const timeLabel = getTimeLabel(timeDifference);

      // Vérifier si le libellé de temps existe déjà en tant que propriété
      // De l'objet groupedNotifications
      if (groupedNotifications[timeLabel]) {
        // Si le libellé de temps existe,
        // Ajouter la notification au tableau existant correspondant au libellé
        groupedNotifications[timeLabel].push(notification);
      } else {
        // Si le libellé de temps n'existe pas,
        // créer un nouveau tableau avec la notification
        // Et l'ajouter à l'objet groupedNotifications
        // Avec le libellé de temps comme propriété
        groupedNotifications[timeLabel] = [notification];
      }
    });
    // Retourner l'objet avec les notif groupées
    return groupedNotifications;
  };

  // Appeler la fonction pour regrouper les notifs par libellés de temps
  const groupedNotifications = groupNotifByTimeLabel(notifications);

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
        return ` ${value}${interval.label}`;
      }
    }

    return " now";
  };

  useEffect(() => {
    myaxios
      .get("/api/notifications")
      .then((response) => {
        console.log("Here are the notifications :", response.data);

        refreshUser();
        setNotifications(response.data);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  }, [refreshUser]);

  return (
    <div className="notif-page">
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <h2>Notifications</h2>

      <div className="notif-container">
        {/* Parcourir l'objet contenant les notifs groupées */}
        {Object.entries(groupedNotifications).map(
          ([timeLabel, notifications]) => {
            return (
              <>
                <div key={timeLabel} className="notifs">
                  {/* Afficher le libellé de temps */}
                  <h3>{timeLabel}</h3>
                  {/* Parcourir les notifs sous le même libellé de temps */}
                  {notifications.map((notification) => {
                    return (
                      <div key={notification._id} className="notif">
                        <img
                          src={notification.creator.profileImg}
                          alt="profile picture"
                        />
                        <p>
                          <span className="creator">
                            {notification.creator.username}{" "}
                          </span>
                          {notifMessage(notification)}
                          <span className="time">
                            {formatTimeAgo(new Date(notification.createdAt))}
                          </span>
                        </p>
                        <Link>See</Link>
                      </div>
                    );
                  })}
                </div>
                <div className="outline"></div>
              </>
            );
          }
        )}
      </div>

      <NavBar />
    </div>
  );
}

export default NotificationsPage;
