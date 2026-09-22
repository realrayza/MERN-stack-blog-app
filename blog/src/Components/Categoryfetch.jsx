import { useEffect, useState } from "react";
import { BlogComponentSmaller } from "./BlogComponentSmaller";
import { useNavigate } from "react-router-dom";

export const Categoryfetch = ({ category }) => {
  const [blog, setBlog] = useState([]);
  const navigate = useNavigate();
  const url = import.meta.env.VITE_URL
  useEffect(() => {
    const fetchblog = async () => {
      try {
        const response = await fetch(
          `${url}/api/blogs/category/${category}`,
        );
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchblog();
  }, [category,url]);
  return (
    <div className="blogDisplay">
      {blog.length > 0 && (
        <div className="blogResult boxShadow secondaryColor borderRadius10 ">
          <h2 className="mainFont blogFetchTitle padding10">{category}</h2>
          <div className="blogCard2 flexRow flexColumnMd displayGridSd">
            {blog.map((blog) => {
              return (
                <div key={blog._id}>
                  <BlogComponentSmaller blog={blog} />
                </div>
              );
            })}
          </div>
          <div className="viewMore flexRow Center">
            <button
              className="mainColor pointer mainFont noBorder padding10 borderRadius5 weight700 largeFont"
              onClick={() => navigate(`/blog/category/${category}`)}>
              More
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
