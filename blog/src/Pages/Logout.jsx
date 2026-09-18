import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { UseUserContext } from "../Hooks/UseUserContext";
export const Logout = () => {
  const context = UseUserContext()
  const {dispatch} = context
  const navigate = useNavigate();
  useEffect(() => {
    dispatch({type:"LOGOUT"})
    localStorage.removeItem('user')
    navigate("/");
  },[dispatch,navigate]);
  return <></>;
};
