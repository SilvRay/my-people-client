import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import myaxios from "../myaxios";
import { AuthContext } from "../context/auth.context";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmailInput = (e) => setEmail(e.target.value);
  const handlePasswordInput = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const reqBody = { email, password };

    myaxios
      .post("/auth/login", reqBody)
      .then((response) => {
        // Request to the server's endpoint `/auth/login` returns a response
        // with the JWT string ->  response.data.authToken

        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/home?tab=medias");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="loginPage">
      {" "}
      <img
        className="img1"
        src="/my-people-client/images/pexels-rfstudio-3811111.jpg"
        alt="women chilling in a bed"
      />
      <img
        className="img2"
        src="/my-people-client/images/pexels-askar-abayev-5638814.jpg"
        alt=""
      />
      <img
        className="img3"
        src="/my-people-client/images/pexels-yan-krukau-5792901.jpg"
        alt=""
      />
      <img
        className="img4"
        src="/my-people-client/images/Playground.jpg"
        alt=""
      />
      <img
        className="img5"
        src="/my-people-client/images/pexels-tamuka-xulu-12982997.jpg"
        alt=""
      />
      <img
        className="img6"
        src="/my-people-client/images/pexels-aline-viana-prado-3491940.jpg"
        alt=""
      />
      <img
        className="img7"
        src="/my-people-client/images/pexels-yan-krukau-9069271.jpg"
        alt=""
      />
      <img
        className="img8"
        src="/my-people-client/images/pexels-august-de-richelieu-4262424.jpg"
      />
      <section>
        <h1>MyPeople</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleEmailInput}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordInput}
            placeholder="Password"
          />
          <div className="btn-container">
            <button type="submit">Login</button>
          </div>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="to-signup-container">
          <p>Do not have an account yet ?</p>
          <Link to={"/"}>Sign Up</Link>
        </div>
      </section>
    </div>
  );
}

export default LoginPage;
