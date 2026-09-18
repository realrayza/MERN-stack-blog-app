import { useState, useEffect } from "react";
import Editor from "react-simple-wysiwyg";
import { useBlogContext } from "../Hooks/useBlogContext";
import { useNavigate } from "react-router-dom";
import { PagesandSidebar } from "../Layoutcomponents/PagesandSidebar";
import { Sidebar } from "../Components/Sidebar";
import { UseUserContext } from "../Hooks/UseUserContext";
import { useDraftContext } from "../Hooks/useDraftContext";

export const CreateBlog = () => {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogBody, setBlogBody] = useState("");
  const [blogCategory, setBlogCategory] = useState("");
  const [blogImage, setBlogImage] = useState(null);
  const [error, setError] = useState(null);
  const [draftId, setDraftId] = useState();
  const [draftSave, setDraftSave] = useState(null);
  const context = useBlogContext();
  const { dispatch } = context;
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const { user } = UseUserContext();
  const { dispatch: draftDispatch } = useDraftContext();
  const url = import.meta.env.VITE_URL
  // fetch blog categories

  useEffect(() => {
    document.title = "Create Blog";
    const fetchCategory = async () => {
      try {
        const response = await fetch(`${url}/api/blogcategory`);
        const data = await response.json();
        setCategory(data[0].category.sort());
      } catch (error) {
        setError(error);
      }
    };
    fetchCategory();
  }, [url]);

  // auto-save drafts

  useEffect(() => {
    const timer = setInterval(async () => {
      setError(null);

      try {
        const response = await fetch(
          draftId
            ? `${url}/api/draft/update/${draftId}`
            : `${url}/api/draft/`,
          {
            method: draftId ? "PATCH" : "POST",
            body: JSON.stringify({
              blogTitle,

              blogCategory,
              blogBody,
            }),
            headers: {
              "Content-Type": "application/json",
              Authorization: user.token,
            },
          },
        );

        const data = await response.json();
        if (response.ok) {
          if (draftId) {
            draftDispatch({ type: "UPDATE_DRAFT", payload: data });
          } else {
            draftDispatch({ type: "ADD_DRAFT", payload: data });
          }
          setDraftId(data._id);
          setDraftSave(data.updatedAt);
        } else {
          setError(data);
        }
      } catch (error) {
        setError(error.message);
      }
    }, 50000);
    return () => clearInterval(timer);
  }, [
    blogTitle,
    blogBody,
    blogCategory,
    blogImage,
    user.token,
    draftId,
    draftDispatch,url
  ]);

  // save drafts manually
  const saveDraft = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch(
        draftId
          ? `${url}/api/draft/update/${draftId}`
          : `${url}/api/draft/`,
        {
          method: draftId ? "PATCH" : "POST",
          body: JSON.stringify({
            blogTitle,

            blogCategory,
            blogBody,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: user.token,
          },
        },
      );

      const data = await response.json();
      if (response.ok) {
        if (draftId) {
          draftDispatch({ type: "UPDATE_DRAFT", payload: data });
        } else {
          draftDispatch({ type: "ADD_DRAFT", payload: data });
        }
        setDraftId(data._id);
        setDraftSave(data.updatedAt);
      } else {
        setError(data);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // save drafts and exit
  const saveAndExit = () => {
    setError(null);
    saveDraft();
    navigate("/");
  };

  // submit blog
  const submitBlog = async (e) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData();

    formData.append("blogTitle", blogTitle);
    formData.append("blogCategory", blogCategory);
    formData.append("blogBody", blogBody);
    blogImage && formData.append("image", blogImage);

    try {
      if (!blogCategory || blogCategory === "") {
        throw Error("Select a Blog Category");
      }
      const response = await fetch(`${url}/api/blogs/`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: user.token,
        },
      });

      const data = await response.json();
      if (response.ok) {
        dispatch({ type: "ADD_BLOG", payload: data });
        setBlogBody("");
        setBlogTitle("");
        setBlogBody("");
        setBlogCategory("");
        setError(null);
        navigate("/");
      } else {
        setError(data);
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  const updatedDate = new Date(draftSave);
  const formattedDate = updatedDate.toLocaleString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
  return (
    <PagesandSidebar>
      <div className="side">
        <Sidebar />
      </div>
      <div className="page">
        <div className="flexColumn spaceAround alignCenter">
          <form
            className="blogForm padding20 flexColumn mainFont boxShadow secondaryColor secondaryFontColor"
            onSubmit={submitBlog}>
            {error && (
              <h2 className="error mainFontColor mainFont padding10 largeFont">
                {error}
              </h2>
            )}
            <div className="flexRow flexColumnMd alignLeftMd spaceBetween alignCenter itemsCenter itemsStartMd flexRowBd">
              <h2 className="hugeFont mainFont">Create Blog</h2>
              <div className="flexRow alignLeftMd flexColumnMd spaceBetween alignCenter itemsCenter itemsStartMd flexRowBd">
                <button
                  className="smallCardButton mainColor padding10 mainFont"
                  onClick={saveDraft}>
                  Save
                </button>
                <button
                  className="smallCardButton mainColor padding10 mainFont"
                  onClick={saveAndExit}>
                  Save And Exit
                </button>
                {draftSave !== null && formattedDate && (
                  <h2 className="largeFont mainFont">
                    last saved: {formattedDate}
                  </h2>
                )}
              </div>
            </div>

            <label className="largeFont weight500 mainFont" htmlFor="blogTitle">
              Blog Title
            </label>
            <input
              className="titleInput"
              type="text"
              id="blogTitle"
              value={blogTitle}
              onChange={(e) => {
                (setError(null), setBlogTitle(e.target.value));
              }}
              required
            />

            <label className="mainFont largeFont weight500" htmlFor="blogBody">
              Blog Content
            </label>
            <Editor
              className="editor mainFont borderRadius10"
              value={blogBody}
              onChange={(e) => {
                (setError(null), setBlogBody(e.target.value));
              }}
              placeholder="Share your ideas....."
              required
            />

            <label
              className="mainFont largeFont weight500"
              htmlFor="blogCategory">
              Category
            </label>
            <select
              className="blogCategory padding5 largeFont pointer borderRadius5 mainFont borderColorMain"
              value={blogCategory}
              onChange={(e) => {
                (setError(null), setBlogCategory(e.target.value));
              }}
              required>
              {category.map((category) => (
                <option
                  className="selectOption"
                  value={category}
                  key={category}>
                  {category}
                </option>
              ))}
            </select>
            <label className="mainFont largeFont weight500" htmlFor="blogImage">
              Upload Image
            </label>
            <input
              className="noBorder padding5 largeFont pointer secondaryFontColor borderRadius5 mainFont borderColorMain"
              type="file"
              onChange={(e) => {
                (setError(null), setBlogImage(e.target.files[0]));
              }}
            />
            <button
              className=" mainFont hugeFont weight500 padding10 pointer noBorder transition mainColor borderRadius5"
              type="submit">
              Upload Blog
            </button>
          </form>
        </div>
      </div>
    </PagesandSidebar>
  );
};
