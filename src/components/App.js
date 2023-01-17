import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "../hooks";

import { Home, Login, Page404, Setting, Signup, UserProfile } from "../pages";
import { PrivateRoute, PublicRoute } from "../utils";
import ChatBar from "./ChatBar";
import Loader from "./Loader";
import Navbar from "./Navbar";

function App() {
  const auth = useAuth();

  // if authentication pending or loading
  if (auth.loading) {
    return <Loader></Loader>;
  }

  return (
    <div className="App">
      <Router basename="/v2">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/setting" element={<PrivateRoute element={<Setting />} />} />
          <Route exact path="/login" element={<PublicRoute element={<Login />} />} />
          <Route exact path="/signup" element={<PublicRoute element={<Signup />} />} />
          <Route exact path="/user/:userId" element={<PrivateRoute element={<UserProfile />} />} />
          <Route exact path="/Page404" element={<Page404 />} />

          <Route path="/*" element={<Navigate to="/Page404" />} />
        </Routes>
        {auth.user && <ChatBar />}
      </Router>
    </div>
  );
}

export default App;
