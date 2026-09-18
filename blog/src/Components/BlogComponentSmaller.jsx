import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export const BlogComponentSmaller = ({ blog }) => {
  const navigate = useNavigate();

  const updatedDate = new Date(blog.updatedAt);
  const formattedDate = updatedDate.toLocaleString("en-us", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
  return (
    <div className="smallerBlogCard flexColumn padding10 secondaryColor padding10 borderRadius10 mainFont boxShadow transition">
      <div className="smallerCardUpper padding10 flexColumn center">
        <Link
          to={`/blog/${blog.blogCategory}&${blog._id}&${blog.blogTitle}`}
          className="links secondaryFontColor">
          <h2 className="largeFont  mainFont">{blog.blogTitle}</h2>
        </Link>
        {blog.blogImage ? (
          <Link
            to={`/blog/${blog.blogCategory}&${blog._id}&${blog.blogTitle}`}
            className="links secondaryFontColor">
            <div className="smallBlogImage flexColumn center borderRadius10 mainColor ">
              <img className="image" src={blog.blogImage} />
            </div>
          </Link>
        ) : (
          <div className="smallBlogImage selfCenter flexColumn alignSelfCenter weight700 borderRadius10 mainColor center textCenter mainFont">
            No Image
          </div>
        )}
      </div>
      <div className="smallerCardMid flexColumn spaceBetween smallFont">
        <div className=" smallerCardTimeSection">
          <h3 className="smallerCardUpdatedAt md440TinyFont">
            Last updated on: {formattedDate}
          </h3>
        </div>
      </div>
      <div className="flexRow right">
        <button
          className="smallCardButton pointer transition mainColor mainFont"
          onClick={() =>
            navigate(`/blog/${blog.blogCategory}&${blog._id}&${blog.blogTitle}`)
          }>
          Read More...
        </button>
      </div>
    </div>
  );
};
