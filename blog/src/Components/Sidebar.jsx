import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { UseUserContext } from "../Hooks/UseUserContext";


export const Sidebar = () => {
  const context = UseUserContext();
  const { user } = context;
  const location = useLocation();
  return (
    <div className="sidebar mainColor">
      <div className="padding15 flexColumn">
        <Link
          className={
            location.pathname === "/"
              ? "links weight700 padding10 borderRadius5 mainFont largeFont secondaryColor"
              : "links weight700 mainFontColor padding10 borderRadius5 mainFont largeFont"
          }
          to="/">
          HOME
        </Link>

        <Link
          className={
            location.pathname === "/blog/category"
              ? "links weight700 padding10 borderRadius5 mainFont largeFont secondaryColor"
              : "links weight700 mainFontColor padding10 borderRadius5 mainFont largeFont"
          }
          to="/blog/category">
          CATEGORY
        </Link>

        {user && (
          <div className="authLinks flexColumn">
            <Link
              className={
                location.pathname === "/blog/create-new"
                  ? "links weight700 padding10 borderRadius5 mainFont largeFont secondaryColor"
                  : "links weight700 mainFontColor padding10 borderRadius5 mainFont largeFont"
              }
              to="/blog/create-new">
              CREATE NEW
            </Link>
            <Link
              className={
                location.pathname === `/profile/${user.username}`
                  ? "links weight700 padding10 borderRadius5 mainFont largeFont secondaryColor"
                  : "links weight700 mainFontColor padding10 borderRadius5 mainFont largeFont"
              }
              to={`/profile/${user.username}`}>
              PROFILE
            </Link>
            
          </div>
        )}
      </div>
    </div>
  );
};
