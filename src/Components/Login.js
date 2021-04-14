import React, { useState } from "react";

const Login = (props) => {
  const [user, setUser] = useState("");
  const { setAuthorized, setCurrentUser, currentUser } = props;

  function helperHandleSubmit(e) {
    setUser({ ...user, password: e.target.value });
    setCurrentUser(user.username);
    console.log(currentUser);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    fetch(
      "https://strangers-things.herokuapp.com/api/2101-LSU-RM-WEB-PT/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user }),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        if (result.success) {
          alert("Logged in.");
          setAuthorized(result.data.token);
        } else {
          alert("Failed to login.");

        }
      })
      .catch(console.error);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="login"> Login:</h1>
      <label className="username">Username:</label>
      <input
        name="Username"
        required
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <label className="password">Password:</label>
      <input type="password" required onChange={(e) => helperHandleSubmit(e)} />
      <button className="submit">submit</button>
    </form>
  );
};

export default Login;