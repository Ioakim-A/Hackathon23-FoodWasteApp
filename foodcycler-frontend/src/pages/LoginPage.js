import { useState } from "react";
import { useNavigate  } from "react-router-dom";
import { LoginUser } from "../utils/dbQuery/LoginUser.js";
import generateSessionID from "../utils/generateSessionID.js";
import './css/LoginPage.css'

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const isLoggedIn = await LoginUser(userName, password);
      if (isLoggedIn) {
        localStorage.setItem('sessionID', generateSessionID()+'-'+userName);
        navigate("/")
      } else {
        setLoginError("Invalid user name or password");
      }
    } catch (err) {
      setLoginError("Error occurred while logging in");
      console.log(err);
    }
  };

  const handleCreateUser = () => {
    navigate("/createUser");
  };

  return (
<div className="login-container">
  <h1 className="titleText">Login To Your <b>Account</b></h1>
  {loginError && <p>{loginError}</p>}
  <form
    className="login-form-container"
    onSubmit={(e) => {
      e.preventDefault();
      handleLogin();
    }}
  >
    <label>
      User Name:
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
    </label>
    <br />
    <label>
      Password:
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </label>
    <br />
    <button type="submit">Login</button>
  </form>
  <div className="create-account-container">
    <p>Don't have an account?</p>
    <button onClick={handleCreateUser}>Create New User</button>
  </div>
</div>
  );
};

export default LoginPage;
