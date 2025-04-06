import { useEffect } from "react";
import LoginForm from "./components/LoginForm";
import PostBlogForm from "./components/PostBlogForm";
import MessageSystem from "./components/MessageSystem";
import { initializeBlogs } from "./reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";
import { checkUser } from "./reducers/userReducer";
import BlogList from "./components/BlogList";
import { Link, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Users from "./components/Users";
import User from "./components/User";
import BlogDetailed from "./components/BlogDetailed";
import Navbar from "./components/Navbar";
import { Container } from "@mui/material";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(checkUser());
  }, []);

  if (!user) {
    return (
      <div>
        <MessageSystem />
        <LoginForm user={user} />
      </div>
    );
  }
  return (
    <Container>
      <Navbar />
      <Header />
      <Routes>
        <Route path="/" element={<h2>Home</h2>} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<BlogDetailed />} />
      </Routes>
    </Container>
  );
};

export default App;
