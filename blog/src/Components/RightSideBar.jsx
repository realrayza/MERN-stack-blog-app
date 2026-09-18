import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TinyBlogDisplay } from "./TinyBlogDisplay";

export const RightSideBar = () => {
  const [blog, setBlog] = useState([]);
  const navigate = useNavigate();
  const url = import.meta.env.VITE_URL
  useEffect(() => {
    const fetchblog = async () => {
      try {
        const response = await fetch(`${url}api/blogs/sidebar`);
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchblog();
  }, [url]);
  return (
    <div className="rightContainer">
      {blog.length > 3 && (
        <div className=" padding20 secondaryColor boxShadow borderRadius10">
          <h2 className=" padding10 secondaryFontColor mainFont">
            {blog.blogCategory}
          </h2>
          <div className="flexRow flexWrap">
            {blog.map((blog) => {
              return (
                <div key={blog._id}>
                  <TinyBlogDisplay blog={blog} />
                </div>
              );
            })}
          </div>
          <div className="RightViewMore flexRow center">
            <button
              className="largeCardButton mainColor"
              onClick={() => navigate(`/blog/category/${blog.blogCategory}`)}>
              More
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
