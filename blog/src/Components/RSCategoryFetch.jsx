import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TinyBlogCard } from "./TinyBlogCard";

export const RSCategoryfetch = ({ blogData }) => {
  const [blog, setBlog] = useState([]);
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const url = import.meta.env.VITE_URL;

  useEffect(() => {
    const setCat = async () => {
      if (blogData) {
        await setCategory(blogData.blogCategory);
      }
    };
    setCat();
  }, [setCategory, blogData]);

  useEffect(() => {
    const fetchblog = async () => {
      try {
        const response = await fetch(`${url}/api/blogs/category/${category}`);
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchblog();
  }, [category, url]);

  return (
    <div className="blogDisplay">
      {blog.length > 0 && (
        <div className="blogResult boxShadow secondaryColor">
          <h2 className="mainFont blogFetchTitle padding10">
           More from {blogData.blogCategory} category
          </h2>
          <div className="blogCard2 flexColumn flexWrap">
            {blog.map((blog) => {
              return (
                <div key={blog._id}>
                  <TinyBlogCard blog={blog} />
                </div>
              );
            })}
          </div>
          <div className="viewMore flexRow Center">
            <button
              className="mainColor pointer mainFont noBorder padding10 borderRadius5 weight700 largeFont"
              onClick={() =>
                navigate(`/blog/category/${blogData.blogCategory}`)
              }>
              More
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
