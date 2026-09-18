import { useState,useEffect } from "react";
import { UseUserContext } from "../Hooks/UseUserContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const context = UseUserContext();
  const { dispatch } = context;
  const url = import.meta.env.VITE_URL

   useEffect(()=>{
      document.title = "Login"
    })
  
  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();
    setError(null);
    const body = { name, email, username, password };
    try {
      const auth = await fetch(`${url}/api/user/signup`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });
      const data = await auth.json();
      if (auth.ok) {
        dispatch({type:"LOGIN",payload: data});
        setError(null);
        setEmail("");
        setName("");
        setPassword("");
        setUsername("");
        localStorage.setItem('user',JSON.stringify({username: data.username, token: data.token,userid:data.userid}))
        navigate("/login", { replace: true });
      } else {
        setError(data);
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="page selfCenter formContainer flexColumn itemsCenter">
       {error && (
        <div className="errorContainer error flexRow center">
          <div className=" padding10 mainFont weight700">
            {error}
          </div>
        </div>
      )}
      <form
        className="authForm secondaryColor flexColumn boxShadow borderRadius10"
        onSubmit={signup}>
        <h2 className="mainFont hugeFont weight700">Create Account</h2>

        <input
          type="text"
          value={name}
          onChange={(e) => {setError(null);setName(e.target.value)}}
          id="firstname"
          className="authInput mainFont padding10 largeFont secondaryFontColor weight700" placeholder="Name..."
        />

        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => {setEmail(e.target.value);setError(null)}}
          className="authInput mainFont padding10 largeFont secondaryFontColor weight700" placeholder="E-mail..."
        />

        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => {setUsername(e.target.value);setError(null)}}
          className="authInput mainFont padding10 largeFont secondaryFontColor weight700" placeholder="Username..."
        />

        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => {setPassword(e.target.value);setError(null)}}
          className="authInput mainFont padding10 largeFont secondaryFontColor weight700" placeholder="Password...."
        />

        <button
          className="authButton mainColor noBorder mainFont padding10 borderRadius5 largeFont weight700"
          type="submit">
          Create Account
        </button>
        <span className="margin10">
          <h2 className="flexRow smallFont mainFont secondaryFontColor">
            <i>Already have an account?</i>{" "}
            <Link to="/login" className="links thirdFontColor pointer">
              LOGIN
            </Link>
          </h2>
        </span>
      </form>
    </div>
  );
};
