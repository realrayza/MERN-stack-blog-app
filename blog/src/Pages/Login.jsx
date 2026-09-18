import { useState, useEffect } from "react";
import { UseUserContext } from "../Hooks/UseUserContext";
import { useNavigate, Link } from "react-router-dom";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const url = import.meta.env.VITE_URL;
  const context = UseUserContext();
  const { dispatch } = context;

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login";
  });

  const login = async (e) => {
    e.preventDefault();
    const body = { username, password };
    try {
      const auth = await fetch(`${url}api/user/login`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });

      const data = await auth.json();
      if (auth.ok) {
        dispatch({ type: "LOGIN", payload: data });
        setPassword("");
        setUsername("");
        setError("");
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: data.username,
            token: data.token,
            userid: data.userid,
          }),
        );
        navigate("/", { replace: true });
      }
      if (!auth.ok) {
        setError(data);
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="page selfCenter formContainer flexColumn itemsCenter">
      {error && (
        <div className="errorContainer error itemsCenter flexColumn">
          <div className=" padding10 mainFont weight700">{error}</div>
        </div>
      )}
      <form
        className="authForm secondaryColor flexColumn boxShadow borderRadius10"
        onSubmit={login}>
        <h2 className="mainFont hugeFont weight700">LOGIN</h2>

        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setError(null);
          }}
          className="mainFont padding10 largeFont secondaryFontColor weight700 authInput"
          placeholder="Username/E-mail..."
        />
        <input
          type="password"
          id="password"
          className="mainFont padding10 largeFont secondaryFontColor weight700 authInput"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(null);
          }}
          placeholder="Password...."
        />

        <button
          className="authButton mainColor noBorder mainFont padding10 borderRadius5 largeFont weight700"
          type="submit">
          LOGIN
        </button>
        <span className="margin10">
          <h2 className="flexRow smallFont mainFont secondaryFontColor">
            <i>Don't have an account?</i>{" "}
            <Link to="/signup" className="links thirdFontColor pointer">
              Create Account
            </Link>
          </h2>
        </span>
      </form>
    </div>
  );
};
