import { UserBlogFetch } from "./UserBlogFetch";
import { useNavigate } from "react-router-dom";
import { DraftFetch } from "./DraftFetch";
import { useEffect } from "react";

export const UserDisplay = ({ user }) => {
    const navigate = useNavigate()
    useEffect(()=>{
      document.title = user.username
    },[user.username])
    
  return (
    <div className="userInfo secondaryColor boxShadow padding10 borderRadius10 flexColumnMd flexColumnSd">
      <div className="dashBoard boxShadow padding20 flexRow spaceBetween">
        {user && <h2 className="mainFont  secondaryFontColor">Hi, {user.username}</h2>}
        <div className="accountControl flexRow">
          <button className="largeFont padding10 borderRadius10 mainFont weight700 mainColor noBorder pointer" onClick={()=> navigate(`/profile/${user.username}/settings`)}>SETTINGS</button>
          <button className="largeFont padding10 borderRadius10 mainFont weight700 mainColor noBorder pointer" onClick={()=>navigate('/logout')}>LOGOUT</button>
        </div>
      </div>
     
      <div className="userBlogs padding20 flexColumn">
        
        <UserBlogFetch/>
      </div>
       <div className="draft padding20 flexColumn">
    
        <DraftFetch/>
      </div>
      
    </div>
  );
};
