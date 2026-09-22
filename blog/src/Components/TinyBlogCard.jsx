import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { UseUserContext } from "../Hooks/UseUserContext";
import { useDraftContext } from "../Hooks/useDraftContext";

export const TinyBlogCard = ({ blog }) => {
    const {dispatch} = useDraftContext()
  const navigate = useNavigate();
  const context = UseUserContext()
  const {user} = context
  const url = import.meta.env.VITE_URL
  const updatedDate = new Date(blog.updatedAt);
  const formattedDate = updatedDate.toLocaleString("en-us", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  const deleteBlog = async () =>{
    const id = await blog._id
    
    try {
      const response = await fetch(`${url}/api/draft/${id}`,{
        method: 'DELETE',
        headers: {'Authorization' : user.token}
      })
      const data = await response.json()
      
      if(response.ok){
        dispatch({type:"DELETE_DRAFT",payload:data})
        navigate(0)
      }
    } catch (error) {
    
    console.log(error)
    }
  }
  return (
    <div className="blogTinyCard flexColumn spaceBetween padding10 borderRadius10 mainFont boxShadow transition">
      <div className="tinyCardUpper flexRow spaceBetween">
        <Link to={`/blog/${blog.blogCategory}&${blog._id}&${blog.blogTitle}`} className="links">
          <h2 className="mainFont smallFont secondaryFontColor">
            {blog.blogTitle ? blog.blogTitle : "Autosave"}
          </h2>
        </Link>
         {user.userId === blog.userId && <div>
           <button className="smallCardButton mainColor" onClick={deleteBlog}>Delete</button>
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
              `/blog/draft/${blog.blogCategory}&${blog._id}&${blog.blogTitle}`,
            );
          }}>
          Read...
        </button>
      </div>
    </div>
  );
};
