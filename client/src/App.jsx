import { Container } from "@material-ui/core";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar.jsx";
import Home from "./Home/Home.jsx";
import Auth from "./components/Auth/Auth.jsx";
import PostDetails from "./components/PostDetails/PostDetails.jsx";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.auth.user) || null;
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Home />} />
          <Route path="/posts/search" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
