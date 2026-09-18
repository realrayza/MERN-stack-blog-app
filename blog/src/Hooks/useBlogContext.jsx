import { useContext } from "react";
import { blogContext } from "../Context/BlogContext";

export const useBlogContext = () => {
  const context = useContext(blogContext);
  return context;
};
