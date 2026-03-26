import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icons, NavIcons } from "../utils/icons";
import { RootState, AppDispatch } from "../store";
import "../styles/leftSidebar.css";
import "../styles/globle.css";
import { getUserProfile } from "../Services/Actions/authAction";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function LeftSidebar({ isOpen, onClose }: Props) {
  const location = useLocation();

  const [expanded, setExpanded] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);

  const dispatch = useDispatch<AppDispatch>();
  const { currentUser  } = useSelector((state: RootState) => state.profile);
   
  useEffect(() => {
    if (!currentUser) {
    dispatch(getUserProfile());
  }
  }, [dispatch , currentUser]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

   const navItems = [
    { path: "/feed", label: "Feed", icon: NavIcons.Home },
    { path: "/search", label: "Search", icon: NavIcons.Search },
    { path: "/create-post", label: "Create", icon: NavIcons.Create },
    { path: "/users", label: "Users", icon: NavIcons.Profile },

  ];

  return (
    <aside className={`left-sidebar ${expanded ? "expanded" : ""} ${isOpen ? "open" : ""}`}>
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

      {currentUser && (
        <Link to="/profile" className="user-info" onClick={onClose}>
          <div className="user-avatar-small">
            {currentUser.avatar ? <img src={currentUser.avatar} alt={currentUser.name} /> : <Icons.User />}
          </div>

          {(expanded || !isMobile) && (
            <div className="user-details">
              <span className="username">@{currentUser.name}</span>
              <span className="user-fullname">{currentUser.name}</span>
            </div>
          )}
        </Link>
      )}
    </aside>
  );
}

export default LeftSidebar;
