import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import DOMpurify from "dompurify";
import { useEffect } from "react";
import { useState } from "react";
export const BlogComponent = ({ blog }) => {
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();
  const cleanHTML = DOMpurify.sanitize(blog.blogPreview);
  const url = import.meta.env.VITE_URL;

  useEffect(() => {
    const fetchAuthor = async () => {
      const response = await fetch(`${url}/api/user/author/${blog.userId}`);
      const data = await response.json()
      if(response.ok){
        setAuthor(data)
      }
    };
    fetchAuthor()
  },[url,blog.userId]);

  const updatedDate = new Date(blog.updatedAt);
  const formattedDate = updatedDate.toLocaleString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
  return (
    <div className="blogCard blogCardSd blogCardMd flexColumn secondaryColor padding10 borderRadius10 boxShadow mainFont">
      <div className="cardUpper flexColumn center">
        <Link
          to={`/blog/${blog.blogCategory}&${blog._id}&${blog.blogTitle}`}
          className="links">
          <h2 className="largeBlogCardTitle secondaryFontColor mainFont">
            {blog.blogTitle}
          </h2>
        </Link>
        {blog.blogImage ? (
          <Link
            to={`/blog/${blog.blogCategory}&${blog._id}&${blog.blogTitle}`}
            className="links secondaryFontColor">
            <div className="blogImage selfCenter flexColumn center borderRadius10 mainColor ">
              <img className="image" src={blog.blogImage} />
            </div>
          </Link>
        ) : (
          <div className="blogImage selfCenter flexColumn alignSelfCenter weight700 borderRadius10 mainColor center textCenter mainFont">
            No Image
          </div>
        )}
        <Link
          to={`/blog/${blog.blogCategory}&${blog._id}&${blog.blogTitle}`}
          className="links secondaryFontColor">
          <p
            className="largeBlogCardPreview largeFont padding10 mainFont mddHide"
            dangerouslySetInnerHTML={{ __html: cleanHTML }}></p>
        </Link>
      </div>
      <div className="cardMid margin10 flexRow spaceBetween tinyFont flexColumnMd">
        <h3 className="mainFont ">AUTHOR:  {author.toUpperCase()}</h3>
        <Link
          to={`/blog/${blog.blogCategory}`}
          className="links secondaryFontColor">
          <h3 className="cardCategory">
            CATEGORY: {blog.blogCategory.toUpperCase()}
          </h3>
        </Link>
        <div className="cardTimeSection flexRow">
          <h3 className="cardUpdatedAt">Updated on: {formattedDate}</h3>
        </div>
      </div>
      <div className="flexRow right padding15">
        <button
          className="largeCardButton transition mainColor mainFont"
          onClick={() =>
            navigate(`/blog/${blog.blogCategory}&${blog._id}&${blog.blogTitle}`)
          }>
          Read More...
        </button>
      </div>
    </div>
  );
};
