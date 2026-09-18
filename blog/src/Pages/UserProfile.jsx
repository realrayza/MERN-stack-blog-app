import { PagesandSidebar } from "../Layoutcomponents/PagesandSidebar";
import { Sidebar } from "../Components/Sidebar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UseUserContext } from "../Hooks/UseUserContext";
import { UserDisplay } from "../Components/UserDisplay";

export const UserProfile = () => {
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState("");
  const param = useParams();
  const { username } = param;
  const url = import.meta.env.VITE_URL;
  const context = UseUserContext();
  const { user } = context;

  useEffect(() => {
    document.title = "Profile";

    const fetchUser = async () => {
      try {
        const auth = await fetch(`${url}api/user/profile/${username}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: user.token,
          },
        });
        const data = await auth.json();

        if (auth.ok) {
          setUserData(data);
        } else {
          setError(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [username, user.token,url]);
  return (
    <PagesandSidebar>
      <div className="side">
        <Sidebar />
      </div>
      <div className="page flexColumn">
        {error && <h2>error</h2>}
        {userData && <UserDisplay userData={userData} user={user} />}
      </div>
    </PagesandSidebar>
  );
};
