import { useEffect,useReducer } from "react";
import { userContext } from "./UserContext";

const initialState = {user:[]}
const reducer = (state,action)=>{
  switch(action.type){
     case 'LOGIN':
      return {user: action.payload};
    case 'LOGOUT':
      return {user:null}
    default:
      return state
  }
   
  
}

export const UserContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(reducer,initialState)
    useEffect(()=>{
      const fetchUser = async () =>{
         const userinfo = JSON.parse(localStorage.getItem('user')) 
      if(userinfo){
        dispatch({type:"LOGIN",payload:userinfo})
      }else{
        dispatch({type:"LOGOUT"})
      }
      }    
      fetchUser() 
    },[])
  return (
    <userContext.Provider value={{dispatch,...state}}>
        {children}
    </userContext.Provider>
  )
}
