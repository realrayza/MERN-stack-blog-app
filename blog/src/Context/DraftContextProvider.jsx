import { useReducer } from "react"
import { draftContext } from "./DraftContext";

const initialState = { draft: [] };
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_DRAFT":
      return { draft: action.payload };
    case "ADD_DRAFT":
      return { ...state, draft: [...state.draft, action.payload] };
    case "DELETE_DRAFT":
      return {
        blogs: state.draft.filter((blog) => {
          blog.id != action.payload._id;
        }),
      };
    case "UPDATE_DRAFT":
      return {...state,
        draft: state.draft.map((blog) => {
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
    case "EMPTY_DRAFT":
      return { draft: null };
    default:
      return state;
  }
};

export const DraftContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <draftContext.Provider value={{...state,dispatch}}>
        {children}
    </draftContext.Provider>
  )
}
