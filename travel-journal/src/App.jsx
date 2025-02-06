import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../src/pages/Home";
import Login from "../src/pages/Login";
import Register from "../src/pages/Register";
import Profile from "../src/pages/Profile";
import CreateEntry from "../src/pages/CreateEntry";
import TravelDetails from "../src/pages/TravelDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create" element={<CreateEntry />} />
        <Route path="/entry/:id" element={<TravelDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
