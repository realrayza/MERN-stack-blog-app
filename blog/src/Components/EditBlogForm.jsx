import { useState, useEffect } from "react";
import Editor from "react-simple-wysiwyg";
import { useBlogContext } from "../Hooks/useBlogContext";
import { UseUserContext } from "../Hooks/UseUserContext";
import { useDraftContext } from "../Hooks/useDraftContext";

export const EditBlogForm = ({ blog, searchid, navigate }) => {
  const [blogTitle, setBlogTitle] = useState(blog[0].blogTitle);
  const [blogBody, setBlogBody] = useState(blog[0].blogBody);
  const [blogCategory, setBlogCategory] = useState(blog[0].blogCategory);
  const [image, setImage] = useState(blog[0].blogImage);
  const [error, setError] = useState(null);
  const [draftId, setDraftId] = useState();
  const [draftSave, setDraftSave] = useState(null);
  const context = useBlogContext();
  const { dispatch } = context;
  const [category, setCategory] = useState([]);
  const { user } = UseUserContext();
  const { dispatch: draftDispatch } = useDraftContext();
  const url = import.meta.env.VITE_URL;

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      if (!(file instanceof Blob)) {
        resolve("");
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size too large");
      return;
    }
    setImage(file);
  };

  // fetch category
  useEffect(() => {
    document.title = "Edit Blog";
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

  // autosave draft
  useEffect(() => {
    const timer = setInterval(async () => {
      setError(null);

      try {
        const response = await fetch(
          draftId ? `${url}/api/draft/update/${draftId}` : `${url}/api/draft/`,
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
    user.token,
    draftId,
    draftDispatch,
    url,
  ]);

  // save drafts manually
  const saveDraft = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch(
        draftId ? `${url}/api/draft/update/${draftId}` : `${url}/api/draft/`,
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

  // const category = ["Technology", "Art", "Music", "Sports", "Education"];
  const updateBlog = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      let imageBase64;
      if (image) {
        imageBase64 = await convertToBase64(image);
      } else {
        imageBase64 = "";
      }
      const body = {
        blogTitle,
        blogCategory,
        blogBody,
        blogImage: imageBase64,
      };

      if (!blogCategory || blogCategory === "") {
        throw Error("Select a Blog Category");
      }
      const response = await fetch(
        searchid ? `${url}/api/blogs/update/${searchid}` : `${url}/api/blogs/`,
        {
          method: searchid ? "PATCH" : "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
            Authorization: user.token,
          },
        },
      );

      const data = await response.json();
      if (response.ok) {
        dispatch({ type: "UPDATE_BLOG", payload: data });
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
    <div className="flexColumn spaceAround alignCenter">
      <form
        className="blogForm padding20 flexColumn secondaryColor mainFont boxShadow secondaryFontColor"
        onSubmit={updateBlog}>
        {error && (
          <h2 className="error mainFontColor mainFont padding10 largeFont">
            {error}
          </h2>
        )}
        <div className="flexRow alignLeftMd spaceBetween alignCenter itemsCenter itemsStartMd flexColumnMd">
          <h2 className="hugeFont mainFont">Edit Blog</h2>
          <div className="flexRow alignLeftMd spaceBetween itemsStartMd flexColumnMd">
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
        <label
          className="formLabel largeFont weight700 mainFont"
          htmlFor="blogTitle">
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

        <label
          className="formLabel largeFont weight700 mainFont"
          htmlFor="blogBody">
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

        <label className="mainFont largeFont weight500" htmlFor="blogCategory">
          Category
        </label>
        <select
          className="blogCategory padding5 largeFont pointer borderRadius5 mainFont borderColorMain"
          value={blogCategory}
          onChange={(e) => {
            (setError(null), setBlogCategory(e.target.value));
          }}
          required>
          <option className="selectOption" value={blogCategory}>
            {blogCategory}
          </option>
          {category.map((category) => (
            <option className="selectOption" value={category} key={category}>
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
          onChange={handleImageChange}
        />
        <button
          className=" mainFont hugeFont weight500 padding10 pointer noBorder transition mainColor borderRadius5"
          type="submit">
          Update Blog
        </button>
      </form>
    </div>
  );
};
