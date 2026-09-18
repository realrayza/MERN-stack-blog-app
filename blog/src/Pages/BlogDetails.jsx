import { PagesandSidebar } from "../Layoutcomponents/PagesandSidebar";
import { Sidebar } from "../Components/Sidebar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BlogDisplay } from "../Components/BlogDisplay";
import { useNavigate } from "react-router-dom";

export const BlogDetails = () => {
  const [blog, setBlog] = useState([]);
  const params = useParams();
  const { id } = params;
  const searchid = id.split("&")[1];
  const navigate = useNavigate();
  const url = import.meta.env.VITE_URL;
  useEffect(() => {
    const fetchblog = async () => {
      try {
        const blog = await fetch(`${url}api/blogs/${searchid}`);
        const data = await blog.json();
        if(blog.ok){
          setBlog(data.response);
        }else{
          navigate('*')
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchblog();
  }, [searchid,url,navigate]);

  useEffect(() => {
    const setTitle = async () => {
      document.title = await blog.blogTitle;
    };
    setTitle();
  }, [blog.blogTitle]);
  return (
    <PagesandSidebar>
      <div className="side">
        <Sidebar />
      </div>
      <div className="page">
        {blog &&
          blog.map((blog) => {
            return (
              <div key={blog._id}>
                <BlogDisplay navigate={navigate} pageId={id} blog={blog} />
              </div>
            );
          })}
      </div>
    </PagesandSidebar>
  );
};
