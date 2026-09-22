import { Sidebar } from "../Components/Sidebar";
import { PagesandSidebar } from "../Layoutcomponents/PagesandSidebar";
import { useParams,useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { PaginationControl } from "../Components/PaginationControl";
import { BlogComponent } from "../Components/BlogComponent";

export const Author = () => {
  const [blogs, setBlogs] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState();
  const url = import.meta.env.VITE_URL;
  const param = useParams();
  const { author } = param;
  const navigate = useNavigate()
  const pageLimit = [4, 8, 12];
  useEffect(() => {
    document.title = "Author Profile";
    document.body.classList.remove("active-modal");
  });

  useEffect(() => {
    const fetchAuthor = async () => {
      const response = await fetch(
        `${url}/api/blogs/authorBlogs/${author}/?page=${page}&limit=${limit}`,
      );
      const data = await response.json();
      if (response.ok) {
        setBlogs(data.response);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
      }
    };
    if (author) {
      fetchAuthor();
    }
  }, [url, author, limit, page]);

  return (
    <PagesandSidebar>
      <div className="side">
        <Sidebar />
      </div>
      <div className="page padding20 secondaryColor borderRadius10 flexColumn">
        <div className="flexRow">
        <div className="pageNav">
          <button
            className="smallCardButton mainColor pointer"
            onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
       
          <h1 className="hugeFont alignSelfCenter mainFont secondaryFontColor padding10">
            {author.toUpperCase()}'s Blogs
          </h1>
        </div>

        <div className="displayGrid flexColumnMd">
          {blogs !== null &&
            blogs.map((blog) => (
              <div key={blog._id}>
                <BlogComponent blog={blog} />
              </div>
            ))}
        </div>

        {blogs && (
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
    </PagesandSidebar>
  );
};
