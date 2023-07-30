import myaxios from "../myaxios";
import { useState } from "react";
import { useNavigate } from "react-router";
import NavBar from "../components/NavBar";
import { useSearchParams } from "react-router-dom";

function AddEventPage() {
  let [searchParams] = useSearchParams();
  const event = searchParams.get("event");

  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  const handlePlace = (e) => setPlace(e.target.value);
  const handleDate = (e) => setDate(e.target.value);
  const handleTime = (e) => setTime(e.target.value);
  const handleContent = (e) => setContent(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const reqBody = { type, place, date, time, content };

    myaxios
      .post("/api/events", reqBody)
      .then((response) => {
        console.log("response", response);
        navigate("/profile");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  let type = "";

  switch (event) {
    case "food":
      type = "Food Time";
      break;
    case "movie":
      type = "Movie Time";
      break;
    case "game":
      type = "Game Time";
      break;
    case "trip":
      type = "Trip Time";
      break;
    case "talk":
      type = "Real Talk";
      break;
  }

  return <></>;
}

export default AddEventPage;
