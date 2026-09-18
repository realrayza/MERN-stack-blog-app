import { PagesandSidebar } from "../Layoutcomponents/PagesandSidebar";
import { Sidebar } from "../Components/Sidebar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { DraftDisplay } from "../Components/DraftDisplay";
import { useNavigate } from "react-router-dom";


export const DraftView = () => {
  const [blog, setBlog] = useState(null);
 const url = import.meta.env.VITE_URL
  const params = useParams();
  const { id } = params;
  const searchid = id.split("&")[1];
  const navigate = useNavigate();
 

  useEffect(() => {

    const fetchblog = async () => {
      try {
        const blog = await fetch(
          `${url}/api/draft/${searchid}`,
        );
        const data = await blog.json();
        setBlog(data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchblog();
  }, [searchid,url]);
  return (
    <PagesandSidebar>
      <div className="side">
        <Sidebar />
      </div>
      <div className="page">
        {blog && <DraftDisplay
                  navigate={navigate}
                  pageId={id}
                  blog={blog}
                />
              
            
          }
      </div>
    </PagesandSidebar>
  );
};
