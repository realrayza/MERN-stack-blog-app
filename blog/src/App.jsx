import { Routes, Route } from "react-router-dom";
import { Blogs } from "./Pages/Blogs";
import { BlogDetails } from "./Pages/BlogDetails";
import { NotFound } from "./Pages/NotFound";
import { CreateBlog } from "./Pages/CreateBlog";
import { Layout } from "./Layoutcomponents/Layout";
import { Pages } from "./Layoutcomponents/Pages";
import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { Login } from "./Pages/Login";
import { Logout } from "./Pages/Logout";
import { Signup } from "./Pages/Signup";
import { Category } from "./Pages/Category";
import { CategoryView } from "./Pages/CategoryView";
import { UserProfile } from "./Pages/UserProfile";
import { UseUserContext } from "./Hooks/UseUserContext";
import { EditBlog } from "./Pages/EditBlog";
import { DraftView } from "./Pages/DraftView";
import { EditDraft } from "./Pages/EditDraft";
import { UserSettings } from "./Pages/UserSettings";

function App() {
  const context = UseUserContext();
  const { user } = context;

  return (
    <>
      <Layout>
        <Header />
        <Pages>
          <Routes>
            <Route path="/" element={<Blogs />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/blog/category/*" element={<NotFound />} />
            <Route path="/blog/*" element={<NotFound />} />
            <Route path="/home" element={<Blogs />} />
            <Route
              path="/profile/:username"
              element={user ? <UserProfile /> : <Login />}
            />
            <Route
              path="/profile/:username/settings"
              element={user ? <UserSettings /> : <Login />}
            />
            <Route path="/login" element={user ? <Blogs /> : <Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/signup" element={user ? <Blogs /> : <Signup />} />
            <Route path="/blog/category" element={<Category />} />
            <Route path="/blog/draft/:id" element={<DraftView />} />
            <Route path="/blog/draft/edit/:id" element={<EditDraft />} />
            <Route path="/blog/edit/:id" element={<EditBlog />} />
            <Route path="/blog/category/:category" element={<CategoryView />} />
            <Route
              path="/blog/create-new"
              element={user ? <CreateBlog /> : <Login />}
            />
            <Route path="/blog/:id" element={<BlogDetails />} />
          </Routes>
        </Pages>
        <Footer />
      </Layout>
    </>
  );
}

export default App;
