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
      setHidden(true)
    }
  },[])

  useEffect(()=>{
    if(hidden) return;
    document.addEventListener('mousedown',handleClickAway);
   
    return () =>{
      document.removeEventListener('mousedown',handleClickAway)
     
    }
  },[hidden,handleClickAway])

 
  return (
    <div className="header flexRow spaceBetween alignCenter mainColor mainFont ">
      <button ref={menuRef} className="noBorder mainColor largeFont mainFont weight700 menuButton" onClick={()=>setHidden(!hidden)}>{hidden? <h2>MENU</h2> : <h2>X</h2>}</button>
      <Link
        className="headerLeft links weight700 padding5 borderRadius5 mainFontColor mainFont alignSelfCenter mainFont"
        to="/">
        <header className="itemsCenter flexRow spaceBetween">
          <h1 className="md440Header">COFFEE BLOG</h1>
          <h1>☕</h1>
          
        </header>
      </Link>
      <nav className={` navBarResponsive animation flexColumnMd navtexts itemsCenter  flexShrink flexRow itemsStartMd spaceBetween1 ${hidden? "hidden" : null}`} ref={menuRef}>
        <Link
          className=" links weight700 padding5 borderRadius5 mainFontColor mainFont"
          to="/" onClick={()=>setHidden(!hidden)}>
          HOME
        </Link>
         <Link
          className=" links weight700 padding5 borderRadius5 mainFontColor mainFont"
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
              Hi, {user.username} ✍️
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
