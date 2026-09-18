import { PagesandSidebar } from "../Layoutcomponents/PagesandSidebar";
import { Sidebar } from "../Components/Sidebar";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import { EditBlogForm } from "../Components/EditBlogForm";

export const EditBlog = () => {
    const [blog,setBlog] = useState(null)
  const params = useParams();
  const { id } = params;
  const searchid = id.split("&")[1];
  const navigate = useNavigate();
const url = import.meta.env.VITE_URL
   useEffect(() => {
    document.title = "Edit Blog"
    const fetchblog = async () => {
      try {
        const blog = await fetch(`${url}api/blogs/${searchid}`);
        const data = await blog.json();
  
        setBlog(data.response);
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
      <div className="page flexColumn">
       {blog && <EditBlogForm blog={blog} searchid={searchid} navigate={navigate}/> } 
      </div>
    </PagesandSidebar>
  );
};
