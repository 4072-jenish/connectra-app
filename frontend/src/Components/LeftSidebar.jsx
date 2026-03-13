import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Icons, NavIcons } from "../utils/icons";
import "../styles/leftSidebar.css";
import "../styles/globle.css"


function LeftSidebar() {
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);

  const navItems = [
    { path: "/feed", icon: NavIcons.Home, label: "Home" },
    { path: "/search", icon: NavIcons.Search, label: "Search" },
    { path: "/explore", icon: Icons.Explore, label: "Explore" },
    { path: "/reels", icon: NavIcons.Reels, label: "Reels" },
    { path: "/messages", icon: NavIcons.Messages, label: "Messages" },
    { path: "/notifications", icon: NavIcons.Notifications, label: "Notifications" },
    { path: "/create-post", icon: NavIcons.Create, label: "Create" },
    { path: "/profile", icon: NavIcons.Profile, label: "Profile" },
  ];

  return (
    <aside className={`left-sidebar ${expanded ? 'expanded' : ''}`}>
      <div className="sidebar-header">
        <Link to="/feed" className="sidebar-logo">
          <Icons.Instagram className="logo-icon" />
          {expanded && <span className="logo-text">SocialWarm</span>}
        </Link>
        <button 
          className="toggle-sidebar" 
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? <Icons.ArrowLeft /> : <Icons.ArrowRight />}
        </button>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <Icon className="nav-icon" />
              {expanded && <span className="nav-label">{item.label}</span>}
              {item.label === "Notifications" && (
                <span className="notification-badge">3</span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="nav-item">
          <Icons.Menu className="nav-icon" />
          {expanded && <span className="nav-label">More</span>}
        </div>
        <div className="user-info">
          <div className="user-avatar-small">
            <Icons.User />
          </div>
          {expanded && (
            <div className="user-details">
              <span className="username">@username</span>
              <span className="user-fullname">User Name</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

export default LeftSidebar;