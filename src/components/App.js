import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "../hooks";

import { Home, Login, Page404 } from "../pages";
import Loader from "./Loader";
import Navbar from "./Navbar";

function App() {
  const auth = useAuth();
  
  // if authentication pending or loading
  if (auth.loading){
    return <Loader></Loader>;
  }

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route exact path="/login" element={<Login />}/>
          <Route exact path="/Page404" element={<Page404 />}/>
          
          <Route path="/*" element={<Navigate to="/Page404" />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
