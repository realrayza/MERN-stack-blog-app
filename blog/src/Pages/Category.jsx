import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PagesandSidebar } from "../Layoutcomponents/PagesandSidebar";
import { Sidebar } from "../Components/Sidebar";
import { Categoryfetch } from "../Components/Categoryfetch";

export const Category = () => {
  const [categories, setCategories] = useState([]);
  const url = import.meta.env.VITE_URL

  useEffect(() => {
    document.title = "Category";
     document.body.classList.remove("active-modal");
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${url}/api/blogcategory`);
        const data = await response.json();
        setCategories(data[0].category.sort());
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, [url]);
  return (
    <PagesandSidebar>
      <div className="side">
        <Sidebar />
      </div>
      <div className="page">
        <div className="flexColumn categoryPage">
          <div className="category flexRowMd padding10 flexWrap">
          {categories.map((category, index) => {
            return (
              <Link className="links  mainFont weight700 hugeFont md440SmallFont mainFontColor" to={`/blog/category/${category}`}>
                <div className="symbol mainColor padding10 borderRadius5" key={index}>{category}</div>
              </Link>
            );
          })}
        </div>
        <div className="categoryMap">
          {categories.map((category, index) => {
            return (
                <div key={index}><Categoryfetch category={category}/></div>
            );
          })}
        </div>
        </div>
        
      </div>
    </PagesandSidebar>
  );
};
