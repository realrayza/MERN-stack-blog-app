import { UserBlogFetch } from "./UserBlogFetch";
import { useNavigate } from "react-router-dom";
import { DraftFetch } from "./DraftFetch";

export const UserDisplay = ({ user }) => {
    const navigate = useNavigate()
    
  return (
    <div className="userInfo secondaryColor boxShadow padding10 borderRadius10 flexColumnMd">
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
