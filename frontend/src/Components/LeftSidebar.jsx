import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../Services/axios";
import { Icons, NavIcons } from "../utils/icons";
import "../styles/leftSidebar.css";
import "../styles/globle.css";

function LeftSidebar({ isOpen, onClose }) {
  const location = useLocation();

  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🔹 Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await API.get("/auth/userProfile");
        setUser(data.user);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  const navItems = [
    { path: "/feed", icon: NavIcons.Home, label: "Home" },
    { path: "/search", icon: NavIcons.Search, label: "Search" },
    { path: "#", icon: Icons.Explore, label: "Explore" },
    { path: "#", icon: NavIcons.Reels, label: "Reels" },
    { path: "#", icon: NavIcons.Messages, label: "Messages" },
    { path: "#", icon: NavIcons.Notifications, label: "Notifications" },
    { path: "/create-post", icon: NavIcons.Create, label: "Create" },
    { path: "/profile", icon: NavIcons.Profile, label: "Profile" },
  ];

  return (
    <aside className={`left-sidebar ${expanded ? "expanded" : ""} ${isOpen ? "open" : ""}`}>

      {/* Header */}
      <div className="sidebar-header">
        <Link to="/feed" className="sidebar-logo" onClick={onClose}>
          <Icons.Instagram className="logo-icon" />
          {(expanded || !isMobile) && <span className="logo-text">Connectra</span>}
        </Link>

        {!isMobile && (
          <button className="toggle-sidebar" onClick={() => setExpanded(!expanded)}>
            {expanded ? <Icons.ArrowLeft /> : <Icons.ArrowRight />}
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? "active" : ""}`}
              onClick={onClose}
            >
              <Icon className="nav-icon" />
              {(expanded || !isMobile) && (
                <span className="nav-label">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer user section */}
      {user && (
        <Link to="/profile" className="user-info">

          <div className="user-avatar-small">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} />
            ) : (
              <Icons.User />
            )}
          </div>

          {(expanded || !isMobile) && (
            <div className="user-details">
              <span className="username">@{user.username || user.name}</span>
              <span className="user-fullname">{user.name}</span>
            </div>
          )}

        </Link>
      )}

    </aside>
  );
}

export default LeftSidebar;