import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myaxios from "../myaxios";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmailInput = (e) => setEmail(e.target.value);
  const handleUsernameInput = (e) => setUsername(e.target.value);
  const handlePasswordInput = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const reqBody = { email, username, password };

    myaxios
      .post("/auth/users", reqBody)
      .then((response) => {
        console.log("data", response.data);

        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="signupPage">
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
        <div className="head-container">
          <h1>MyPeople</h1>
          <p>
            Strengthen your ties with your loved ones by creating family events
            and contributing to everyone projects
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleEmailInput}
            placeholder="Email"
          />
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleUsernameInput}
            placeholder="Username"
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordInput}
            placeholder="Password"
          />
          <div className="btn-container">
            <button type="submit">Sign Up</button>
          </div>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="to-login-container">
          <p>Already have an account ?</p>
          <Link to={"/login"}>Login</Link>
        </div>
      </section>
    </div>
  );
}

export default SignupPage;
