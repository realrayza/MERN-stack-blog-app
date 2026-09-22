import { useBlogContext } from "../Hooks/useBlogContext";
import { useEffect, useState } from "react";
import { BlogComponent } from "../Components/BlogComponent";
import { PagesandSidebar } from "../Layoutcomponents/PagesandSidebar";
import { Sidebar } from "../Components/Sidebar";
import { PaginationControl } from "../Components/PaginationControl";
import { Link } from "react-router-dom";

export const Blogs = () => {
  const context = useBlogContext();
  const { blogs, dispatch } = context;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState();
  

  const url = import.meta.env.VITE_URL;

  const pageLimit = [4, 8, 12];

  useEffect(() => {
    document.title = "Home";

    document.body.classList.remove("active-modal");

    const fetchBlogs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${url}/api/blogs/?page=${page}&limit=${limit}`,
        )
        const data = await response.json();
        if (response.ok) {
          dispatch({ type: "FETCH_BLOG", payload: data.response });
          setTotalPages(data.totalPages);
          setCurrentPage(data.currentPage);
          setIsLoading(false);
          setError(null);
        } else {
          setIsLoading(false);
          setError(data);
          dispatch({ type: "EMPTY_BLOG" });
        }
      } catch (error) {
        setError(`Something went wrong,  ${error.message}`);
        setIsLoading(false);
        dispatch({ type: "EMPTY_BLOG" });
      }
    };
    fetchBlogs();
  }, [dispatch, page, limit, url]);
 

  return (
    <>
      <PagesandSidebar>
        <div className="side">
          <Sidebar />
        </div>
        <div className="page padding20 secondaryColor borderRadius10 flexColumn">
          <div className="padding20 largerFont mainFont secondaryFontColor">
            {error && <h2>{error}</h2>}
            {blogs.length === 0 && (
              <div className="padding10">
                <h2 className="secondaryFontColor">No blogs to display...</h2>
                <Link button
                  to="/blog/create-new"
                  className="links thirdFontColor weight500">
                  <i>Start creating....</i>{" "}
                </Link>
              </div>
            )}
          </div>
          <div className="flexRow flexWrap">
            {isLoading && (
              <h2 className="largeFont secondaryFontColor padding10">
                Loading...
              </h2>
            )}
            {blogs !== null && (
              blogs.map((blog) => (
                <div key={blog._id}>
                  <BlogComponent blog={blog} />
                </div>
              ))
            )
              }
          </div>

          {blogs.length !== 0 && (
            <PaginationControl
              currentPage={currentPage}
              limit={limit}
              totalPages={totalPages}
              setPage={setPage}
              page={page}
              pageLimit={pageLimit}
              setLimit={setLimit}
            />
          )}
          
        </div>
        <div className="rightSideBar">{/* <RightSideBar /> */}</div>
      </PagesandSidebar>
    </>
  );
};
