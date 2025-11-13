import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MapPage from "./pages/MapPage";
import Communities from "./pages/Communities";
import Challenges from "./pages/Challenges";
import Profile from "./pages/Profile";
import BottomNav from "./components/BottomNav";
import Events from "./pages/Events";

function App() {
  return (
    <Router>
      <div style={{ paddingBottom: "70px" }}> 
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/communities" element={<Communities />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/events" element={<Events />} />
        </Routes>
      </div>
      <BottomNav />
    </Router>
  );
}

export default App;
