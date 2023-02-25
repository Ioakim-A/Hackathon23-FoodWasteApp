import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateUser } from "../utils/dbQuery/CreateUser.js";

const CreateUserPage = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [createUserError, setCreateUserError] = useState("");
    const navigate = useNavigate();
  
    const handleCreateUser = async () => {
      try {
        if (password !== confirmPassword) {
          setCreateUserError("Passwords do not match");
          return;
        }
        const isCreated = await CreateUser(userName, password);
        if (isCreated) {
          console.log("User is created");
          // Redirect the user to the login page
          navigate("/loginUser");
        } else {
          setCreateUserError("User name already exists");
        }
      } catch (err) {
        setCreateUserError("Error occurred while creating user");
        console.log(err);
      }
    };
  
    return (
      <div>
        <h1>Create User Page</h1>
        {createUserError && <p>{createUserError}</p>}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCreateUser();
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
          <label>
            Confirm Password:
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
          <br />
          <button type="submit">Create User</button>
        </form>
      </div>
      );
      };

export default CreateUserPage;