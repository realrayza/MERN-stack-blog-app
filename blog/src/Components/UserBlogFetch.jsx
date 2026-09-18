import { useEffect, useState } from "react";
import { TinyBlogDisplay } from "./TinyBlogDisplay";
import { PaginationControl } from "./PaginationControl";
import { UseUserContext } from "../Hooks/UseUserContext";


export const UserBlogFetch = () => {
  const [blog, setBlog] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState();
  const url = import.meta.env.VITE_URL
  const pageLimit = [4, 8, 12];

  const context = UseUserContext()
  const {user} = context
  useEffect(() => {
    const fetchblog = async () => {
      try {
        const response = await fetch(
          `${url}/api/blogs/userblogs/?page=${page}&limit=${limit}`,{
            headers : {'Authorization':user.token}
          }
        );
        const data = await response.json();
        setBlog(data.response);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
      } catch (error) {
        console.log(error);
      }
    };
    fetchblog();
  }, [limit,page,user.token,url]);
  return (
    <div className="blogDisplay">
      {blog && (
        <div className="blogResult boxShadow secondaryColor borderRadius10 ">
          <h2 className="mainFont ">Your Blogs</h2>
          <div className="blogCard2 flexRow left flexWrap">
            {blog.map((blog) => {
              return (
                <div key={blog._id}>
                 <TinyBlogDisplay blog={blog} />
                </div>
              );
            })}
          </div>
          <div className="">
            {blog.length > 1 && <PaginationControl
                        currentPage={currentPage}
                        limit={limit}
                        totalPages={totalPages}
                        setPage={setPage}
                        page={page}
                        pageLimit={pageLimit}
                        setLimit={setLimit}
                      />}
          </div>
        </div>
      )}
    </div>
  );
};
