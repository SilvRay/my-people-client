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
        console.log("response", response);

        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="signupPage">
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
    </div>
  );
}

export default SignupPage;
