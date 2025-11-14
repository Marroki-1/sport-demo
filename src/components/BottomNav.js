import { Link } from "react-router-dom";
import "./BottomNav.css";

function BottomNav() {
  return (
    <div className="bottom-nav">
      <Link to="/">🏠</Link>
      <Link to="/map">🗺️</Link>
      <Link to="/communities">👥</Link>
      <Link to="/defis">🏅</Link>
      <Link to="/events">📅</Link>
      <Link to="/profile">⚙️</Link>
    </div>
  );
}

export default BottomNav;
