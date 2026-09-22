import { PagesandSidebar } from "../Layoutcomponents/PagesandSidebar";
import { Sidebar } from "../Components/Sidebar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BlogDisplay } from "../Components/BlogDisplay";
import { useNavigate } from "react-router-dom";
import { UseUserContext } from "../Hooks/UseUserContext";
import { useBlogContext } from "../Hooks/useBlogContext";
import { AuthorFetch } from "../Components/AuthorFetch";

import { RSCategoryfetch } from "../Components/RSCategoryFetch";

export const BlogDetails = () => {
  const [blog, setBlog] = useState([]);
  const [error, setError] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const params = useParams();
  const { id } = params;
  const searchid = id.split("&")[1];
  const navigate = useNavigate();
  const url = import.meta.env.VITE_URL;

  const { user } = UseUserContext();
  const context = useBlogContext();
  const { dispatch } = context;
  useEffect(() => {
    document.body.classList.remove("active-modal");
    const fetchblog = async () => {
      try {
        const blog = await fetch(`${url}/api/blogs/${searchid}`);
        const data = await blog.json();
        if (blog.ok) {
          setBlog(data.response);
        } else {
          navigate("*");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchblog();
  }, [searchid, url, navigate]);

  useEffect(() => {
    const setTitle = async () => {
      document.title = await blog.blogTitle;
    };
    setTitle();
  }, [blog.blogTitle]);

  const deleteBlog = async () => {
    try {
      const response = await fetch(`${url}/api/blogs/${searchid}`, {
        method: "DELETE",
        headers: { Authorization: user.token },
      });
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: "DELETE_BLOG", payload: data });
        navigate(`/profile/${user.username}`, { replace: true });
      } else {
        setError(error);
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      {deleteConfirm && (
        <div className="popupContainer flexRow center itemsCenter padding10">
          <div className="popup flexColumn center secondaryColor borderRadius15 boxShadow flexColumn padding20  center itemsCenter">
            <h1 className="mainFont errorFont padding10 largeFont borderRadius10">
              WARNING
            </h1>
            <h2 className="mainFont largeFont textCenter">
              Are you sure you want to delete your blog?
            </h2>
            <div className="flexRow margin10">
              <button
                className="smallCardButton mainColor mainFont margin10"
                onClick={() => {
                  setDeleteConfirm(!deleteConfirm);
                }}>
                Cancel
              </button>
              <button
                className="smallCardButton mainColor mainFont margin10"
                onClick={deleteBlog}>
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}
      <PagesandSidebar>
        <div className="side">
          <Sidebar />
        </div>
        <div className="page">
          {blog &&
            blog.map((blog) => {
              return (
                <div key={blog._id}>
                  <BlogDisplay
                    navigate={navigate}
                    pageId={id}
                    blog={blog}
                    error={error}
                    user={user}
                    deleteConfirm={deleteConfirm}
                    setDeleteConfirm={setDeleteConfirm}
                  />
                </div>
              );
            })}
        </div>
        <div className="rightSideBar rightSideBarMd flexColumn">
          {blog &&
            blog.map((blog) => {
              return (
                <div key={blog._id}>
                  <AuthorFetch userId={blog.userId} />
                </div>
              );
            })}
          {blog &&
            blog.map((blog) => {
              return (
                <div key={blog._id}>
                  <RSCategoryfetch blogData={blog} />
                </div>
              );
            })}
        </div>
      </PagesandSidebar>
    </>
  );
};
