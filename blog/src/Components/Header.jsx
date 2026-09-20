import { Link } from "react-router-dom";
import { UseUserContext } from "../Hooks/UseUserContext"
import { useState,useEffect,useRef,useCallback } from "react";
export const Header = () => {
  const [hidden,setHidden]=useState(true);
  const context = UseUserContext();
  const { user } = context;

  const menuRef= useRef(null)

  const handleClickAway = useCallback((event)=>{
    if(menuRef.current && !menuRef.current.contains(event.target)){
      setHidden(hidden)
    }
  },[hidden])

  useEffect(()=>{
    if(!hidden) return;
    document.addEventListener('mousedown',handleClickAway);
   
    return () =>{
      document.removeEventListener('mousedown',handleClickAway)
     
    }
  },[hidden,handleClickAway])

 
  return (
    <div className="header flexRow spaceBetween alignCenter mainColor mainFont ">
      <button  className="noBorder mainColor largeFont mainFont weight700 menuButton" onClick={()=>setHidden(!hidden)}>MENU</button>
      <Link
        className="headerLeft links weight700 padding5 borderRadius5 mainFontColor mainFont alignSelfCenter mainFont"
        to="/">
        <header className="itemsCenter flexRow spaceBetween">
          <h1 className="md440Header">COFFEE BLOG</h1>
          <h1>☕</h1>
          
        </header>
      </Link>
      <nav className={` navBarResponsive animation flexColumnMd navtexts itemsCenter  flexShrink flexRow itemsStartMd spaceBetween1 ${hidden? "hidden" : null}`} ref={menuRef}>
        {user && <p className="links weight700 padding5 borderRadius5 mainFontColor mainFont navtexts">Hi, {user.username} ✍️</p>}
        <Link
          className="navtexts links weight700 padding5 borderRadius5 mainFontColor mainFont"
          to="/" onClick={()=>setHidden(!hidden)}>
          HOME
        </Link>
         <Link
          className=" links navtexts weight700 padding5 borderRadius5 mainFontColor mainFont"
          to="/blog/category" onClick={()=>setHidden(!hidden)}>
          CATEGORY
        </Link>
        
        <div className="authLinks">
          {user && (
            <div className="flexRow navtexts itemsStartMd flexShrink spaceBetween itemsCenter flexColumnMd">
              <Link
                className="links weight700 padding5 borderRadius5 mainFontColor mainFont"
                to="/blog/create-new" onClick={()=>setHidden(!hidden)}>
                CREATE NEW
              </Link>
              <Link
                className="links weight700 padding5 borderRadius5 mainFontColor mainFont"
                to="/logout" onClick={()=>setHidden(!hidden)}>
                LOGOUT
              </Link>
              <Link
              className="links weight700 padding5 borderRadius5 mainFontColor mainFont"
              to={`/profile/${user.username}`} onClick={()=>setHidden(!hidden)}>
              PROFILE
            </Link>
            </div>
          )}
        </div>
        
        {!user && (
          <div className="navtexts flexColumnMd itemsStartMd">
            <Link
              className="links weight700 padding5 borderRadius5 mainFontColor mainFont"
              to="/login" onClick={()=>setHidden(!hidden)}>
              LOGIN
            </Link>
            <Link
              className="links alignSelfCenter weight700 padding5 borderRadius5 mainFontColor mainFont"
              to="/signup" onClick={()=>setHidden(!hidden)}>
              SIGN UP
            </Link>
          </div>
        )}
        
      </nav>
      
    </div>
  );
};
