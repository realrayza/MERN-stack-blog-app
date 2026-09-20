import DOMpurify from "dompurify";
import { useState,useEffect } from "react";
import { UseUserContext } from "../Hooks/UseUserContext";
import {useBlogContext} from '../Hooks/useBlogContext'


export const BlogDisplay = ({ blog, navigate,pageId }) => {
  const [error,setError] = useState(null)
  const cleanHTML = DOMpurify.sanitize(blog.blogBody);
  const { user } = UseUserContext();
  const context = useBlogContext()
  const {dispatch} = context
  const url = import.meta.env.VITE_URL

  useEffect(()=>{
    document.title = blog.blogTitle
  },[blog.blogTitle])

  const deleteBlog = async () =>{
    const id = await blog._id
    try {
      const response = await fetch(`${url}/api/blogs/${id}`,{
        method: 'DELETE',
        headers: {'Authorization' : user.token}
      })
      const data = await response.json()
      if(response.ok){
        dispatch({type:'DELETE_BLOG', payload:data})
        navigate(`/profile/${user.username}`,{replace:true})
      }else{
        setError(error)
      }
      
    } catch (error) {
      setError(error)
    }
  }
  const updatedDate = new Date(blog.updatedAt)
  const formattedDate = updatedDate.toLocaleString("en-us",
    {year:"numeric", month: "short", day:"numeric",}
  )
  
  const handleEdit = () =>{
    navigate(`/blog/edit/${pageId}`)
  }
  return (
    <div className="blogContent secondaryColor padding10">
      <div className="blogHeader  boxShadow">
        {error && <h2 className="error">{error}</h2>}
        <div className="flexRow spaceBetween itemsCenter  flexColumnMd smallGap alignLeftMd">
          <div className=".blogTitle  mainFont weight700 smallFontMd hugeFont padding10">
            {blog.blogTitle}
          </div>
          <div className="flexRow alignCenter ">
            {(user && user.userid === blog.userId) && (
              <div className="flexRow padding20 alignCenter">
                <button className="mainColor noBorder smallFont borderRadius10 pointer mainFont padding10 weight700" onClick={handleEdit}>
                  EDIT
                </button>
                <button className="mainColor noBorder smallFont borderRadius10 pointer mainFont padding10 weight700" onClick={deleteBlog}>
                  DELETE
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="blogMeta itemsCenter flexRow spaceBetween padding10">
          <div className="secondaryFontColor largeFont links weight700 mainFont">
            CATEGORY: {blog.blogCategory.toUpperCase()}
          </div>
          <div className="flexRow spaceBetween padding10">
            <h2 className="secondaryFontColor largeFont links weight700 mainFont">
              Last Update:  {formattedDate}
            </h2>
          </div>
        </div>
      </div>
      <div className="blogBody padding20 boxShadow borderRadius5">
        <div className=" padding10">
          {blog.blogImage && (
            <img className="blogDisplayImage mainColor" src={blog.blogImage} />
          )}
        </div>
        <div
          className="mainFont htmlBLog"
          dangerouslySetInnerHTML={{ __html: cleanHTML }}></div>
        <div className="pageNav">
          <button
            className="smallCardButton mainColor pointer"
            onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};
