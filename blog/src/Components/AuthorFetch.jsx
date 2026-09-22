import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TinyBlogCard } from "./TinyBlogCard";

export const AuthorFetch = ({ userId }) => {
     const [author, setAuthor] = useState("");
    
    const [blogs, setBlogs] = useState(null);
    const url = import.meta.env.VITE_URL;

    const navigate = useNavigate()

    useEffect(() => {
      const fetchAuthor = async () => {
        const response = await fetch(`${url}/api/user/author/${userId}`);
        const data = await response.json()
        if(response.ok){
          setAuthor(data)
        }
      };
      if(userId){
      fetchAuthor()}
    },[url,userId]); 

    useEffect(() => {
      const blogFetch = async () => {
        const response = await fetch(`${url}/api/blogs/author/${userId}`);
        const data = await response.json()
        if(response.ok){
          setBlogs(data)
        }
      };
      blogFetch()
    },[url,userId]);
  return(
    <div className="blogDisplay">
          {blogs && (
            <div className="blogResult boxShadow secondaryColor">
              <h2 className="mainFont blogFetchTitle padding10">
               More from blogs {author.toUpperCase()} 
              </h2>
              <div className="blogCard2 flexColumn flexWrap">
                {blogs.map((blog) => {
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
                    navigate(`/blog/author/${author}`)
                  }>
                  More
                </button>
              </div>
            </div>
          )}
        </div>
  );
};
