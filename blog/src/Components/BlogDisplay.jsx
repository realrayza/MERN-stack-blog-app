import DOMpurify from "dompurify";
import { useEffect,useState } from "react";

export const BlogDisplay = ({ blog, navigate, pageId,error,user,deleteConfirm,setDeleteConfirm }) => {
  const [author, setAuthor] = useState("");
  const cleanHTML = DOMpurify.sanitize(blog.blogBody);
  const url = import.meta.env.VITE_URL;
  useEffect(() => {
    document.title = blog.blogTitle;
  }, [blog.blogTitle]);

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
  });

  const handleEdit = () => {
    navigate(`/blog/edit/${pageId}`);
  };

  if (deleteConfirm) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  return (
    <>
      <div className="blogContent secondaryColor padding10">
        <div className="pageNav">
          <button
            className="smallCardButton mainColor pointer"
            onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
        <div className="blogHeader  boxShadow">
          {error && <h2 className="error">{error}</h2>}
          <div className="flexRow spaceBetween itemsCenter  flexColumnMd smallGap alignLeftMd">
            <div className=".blogTitle  mainFont weight700 smallFontMd hugeFont padding10">
              {blog.blogTitle}
            </div>
            <div className="flexRow alignCenter ">
              {user && user.userid === blog.userId && (
                <div className="flexRow padding20 alignCenter">
                  <button
                    className="mainColor noBorder smallFont borderRadius10 pointer mainFont padding10 weight700"
                    onClick={handleEdit}>
                    EDIT
                  </button>
                  <button
                    className="mainColor noBorder smallFont borderRadius10 pointer mainFont padding10 weight700"
                    onClick={() => setDeleteConfirm(!deleteConfirm)}>
                    DELETE
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="blogMeta itemsCenter flexRow spaceBetween padding10 flexColumnMd itemsStartMd">
            <h2 className="secondaryFontColor largeFont links weight700 mainFont padding5">AUTHOR: {author.toUpperCase()} </h2>
            <div className="secondaryFontColor largeFont links weight700 mainFont padding5">
              CATEGORY: {blog.blogCategory.toUpperCase()}
            </div>
            <div className="flexRow spaceBetween padding5">
              <h2 className="secondaryFontColor largeFont links weight700 mainFont">
                Last Updated: {formattedDate}
              </h2>
            </div>
          </div>
        </div>
        <div className="blogBody padding20 boxShadow borderRadius5">
          <div className=" padding10">
            {blog.blogImage && (
              <img
                className="blogDisplayImage mainColor"
                src={blog.blogImage}
              />
            )}
          </div>
          <div
            className="mainFont htmlBLog"
            dangerouslySetInnerHTML={{ __html: cleanHTML }}></div>
        </div>
      </div>
    </>
  );
};
