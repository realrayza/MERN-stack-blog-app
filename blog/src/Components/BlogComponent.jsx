import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import DOMpurify from 'dompurify'
export const BlogComponent = ({ blog }) => {
  const navigate = useNavigate();
  const cleanHTML = DOMpurify.sanitize(blog.blogPreview)

  const updatedDate = new Date(blog.updatedAt)
  const formattedDate = updatedDate.toLocaleString("en-us",
    {year:"numeric", month: "long", day:"numeric", hour:"numeric",minute:"2-digit"}
  )
  return (
    <div className="blogCard flexColumn secondaryColor padding10 borderRadius10 boxShadow mainFont">
      <div className="cardUpper flexColumn center">
        <Link to={`/blog/${blog.blogCategory}&${blog._id}&${blog.blogTitle}`} className="links">
          <h2 className="largeBlogCardTitle secondaryFontColor mainFont">
            {blog.blogTitle}
          </h2>
        </Link>
        {blog.blogImage ? (
          <Link to={`/blog/${blog.blogCategory}&${blog._id}&${blog.blogTitle}`} className="links secondaryFontColor">
            <div className="blogImage selfCenter flexColumn center borderRadius10 mainColor "><img className="image" src={blog.blogImage} /></div>
            
          </Link>
        ) : <div className="blogImage selfCenter flexColumn alignSelfCenter weight700 borderRadius10 mainColor center textCenter mainFont">No Image</div>}
         <Link to={`/blog/${blog.blogCategory}&${blog._id}&${blog.blogTitle}`} className="links secondaryFontColor">
          <p className="largeBlogCardPreview largeFont padding10 mainFont mddHide" dangerouslySetInnerHTML={{__html: cleanHTML}}>
            
          </p>
        </Link>
      </div>
      <div className="cardMid margin10 flexRow spaceBetween tinyFont">
        <Link to={`/blog/${blog.blogCategory}`} className="links secondaryFontColor">
          <h3 className="cardCategory">CATEGORY: {blog.blogCategory.toUpperCase()}</h3>
        </Link>
        <div className="cardTimeSection flexRow">
        
          <h3 className="cardUpdatedAt">Last updated on: {formattedDate}</h3>
        </div>
      </div>
      <div className="flexRow right padding10">
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
