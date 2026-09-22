import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { UseUserContext } from "../Hooks/UseUserContext";
export const TinyBlog = ({ blog }) => {
  const context = UseUserContext();
  const {user}=context
  const navigate = useNavigate();
  const updatedDate = new Date(blog.updatedAt);
  const formattedDate = updatedDate.toLocaleString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div className="blogTinyCard flexColumn spaceBetween padding10 borderRadius10 mainFont boxShadow transition">
      <div className="tinyCardUpper flexRow spaceBetween">
        <Link
          to={`/blog/${blog.blogCategory}&${blog._id}&${blog.blogTitle}`}
          className="links">
          <h2 className="mainFont tinyBlogCardTitle hugeFont secondaryFontColor">
            {blog.blogTitle}
          </h2>
        </Link>
        {user && user.userid === blog.userId && <div>
          <button
          className="smallCardButton mainColor"
          onClick={() =>
            navigate(
              `/blog/edit/${blog.blogCategory}&${blog._id}&${blog.blogTitle}`,
            )
          }>
          Edit
        </button>
          </div>}
        
      </div>
      <div className="flexRow spaceBetween smallFont">
        <div className="smallFont  mainFont">
          <h3 className="smallFont secondaryFontColor mainFont">
            Updated: {formattedDate}
          </h3>
        </div>
        <button
          className="smallCardButton pointer transition mainColor"
          onClick={() => {
            navigate(
              `/blog/${blog.blogCategory}&${blog._id}&${blog.blogTitle}`,
            );
          }}>
          Read...
        </button>
      </div>
    </div>
  );
};
