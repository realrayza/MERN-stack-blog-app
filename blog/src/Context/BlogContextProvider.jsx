import { useReducer } from "react";
import { blogContext } from "./BlogContext";

const initialState = { blogs: [] };
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_BLOG":
      return { blogs: action.payload };
    case "ADD_BLOG":
      return { ...state, blogs: [...state.blogs, action.payload] };
    case "DELETE_BLOG":
      return {
        blogs: state.blogs.filter((blog) => {
          blog.id != action.payload._id;
        }),
      };
    case "UPDATE_BLOG":
      return {...state,
        blogs: state.blogs.map((blog) => {
          return blog._id === action.payload.id
            ? {
                ...blog,
                blogTitle: action.payload.blogTitle,
                blogBody: action.payload.blogBody,
                blogCategory: action.payload.blogCategory,
                blogPreview: action.payload.blogPreview,
                blogImage: action.payload.blogImage,
              }
            : blog;
        }),
      };
    case "EMPTY_BLOG":
      return { blogs: null };
    default:
      return state;
  }
};
export const BlogContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <blogContext.Provider value={{ ...state, dispatch }}>
      {children}
    </blogContext.Provider>
  );
};
