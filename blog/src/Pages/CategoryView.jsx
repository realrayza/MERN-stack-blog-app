import { useEffect, useState } from "react";
import { BlogComponentSmaller } from "../Components/BlogComponentSmaller";
import { useParams } from "react-router-dom";
import { PagesandSidebar } from "../Layoutcomponents/PagesandSidebar";
import { Sidebar } from "../Components/Sidebar";
import { useNavigate } from "react-router-dom";
import { PaginationControl } from "../Components/PaginationControl";


export const CategoryView = () => {
  const [blog, setBlog] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState();
 
  const navigate = useNavigate();
  const url = import.meta.env.VITE_URL;
  const pageLimit = [4, 8, 12];

  const params = useParams();

  const { category } = params;

   useEffect(() => {
    document.title = "Category";
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${url}/api/blogcategory/${category}`);
        if(response.ok){
          return
        }else{
          navigate('*')
        }
        
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, [url,category,navigate]);

  useEffect(() => {
    const fetchblog = async () => {
      try {
       
        const response = await fetch(
          `${url}/api/blogs/category/blogs/${category}?page=${page}&limit=${limit}`,
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
  }, [category, page, limit,url,navigate]);
  return (
    <PagesandSidebar>
      <div className="side">
        <Sidebar />
      </div>
      <div className="page">
        <div className="blogDisplay">
          <div className="pageNav padding10">
                <button
                  className="smallCardButton mainColor"
                  onClick={() => navigate(-1)}>
                  Back
                </button>
              </div>
          {blog.length > 0 && (
            <div className="blogResult  borderRadius10 secondaryColor">
              <h2 className="mainFont margin10">{category}</h2>

              <div className="flexRow flexColumnMd">
                {blog.map((blog) => {
                  return (
                    <div key={blog._id}>
                      <BlogComponentSmaller blog={blog} />
                    </div>
                  );
                })}
              </div>
              <PaginationControl
                currentPage={currentPage}
                limit={limit}
                totalPages={totalPages}
                setPage={setPage}
                page={page}
                pageLimit={pageLimit}
                setLimit={setLimit}
              />
              {/* <div className="pageNav">
                <button
                  className="smallCardButton mainColor"
                  onClick={() => navigate(-1)}>
                  Back
                </button>
              </div> */}
            </div>
          )}
        </div>
        {blog.length === 0 && (
          <div className="blogResult">
            <div className="pageNav padding10">
              <h2 className="mainFont mainFontColor mdMainFontColor">No Blogs to display</h2>
              <button
                className="smallCardButton mainColor margin10"
                onClick={() => navigate(-1)}>
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </PagesandSidebar>
  );
};
