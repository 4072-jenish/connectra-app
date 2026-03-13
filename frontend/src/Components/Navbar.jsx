import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Icons, NavIcons } from "../utils/icons";
import "../styles/Navbar.css";
import "../styles/globle.css"


function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/feed" className="nav-logo">
          <Icons.Instagram className="logo-icon" />
          <span className="logo-text">SocialWarm</span>
        </Link>

        <div className="nav-links">
          <Link 
            to="/feed" 
            className={`nav-link ${location.pathname === '/feed' ? 'active' : ''}`}
          >
            <NavIcons.Home className="nav-icon" />
            <span className="nav-label">Feed</span>
          </Link>

          <Link 
            to="/create-post" 
            className={`nav-link ${location.pathname === '/create-post' ? 'active' : ''}`}
          >
            <NavIcons.Create className="nav-icon" />
            <span className="nav-label">Create</span>
          </Link>

          <Link 
            to="/users" 
            className={`nav-link ${location.pathname === '/users' ? 'active' : ''}`}
          >
            <Icons.Users className="nav-icon" />
            <span className="nav-label">Users</span>
          </Link>

          <Link 
            to="/followers" 
            className={`nav-link ${location.pathname === '/followers' ? 'active' : ''}`}
          >
            <Icons.UserFollow className="nav-icon" />
            <span className="nav-label">Followers</span>
          </Link>

          <Link 
            to="/profile" 
            className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`}
          >
            <NavIcons.Profile className="nav-icon" />
            <span className="nav-label">Profile</span>
          </Link>
        </div>

        <div className="nav-profile">
          <div className="profile-badge">
            <Icons.Notification className="notification-icon" />
            <span className="notification-dot"></span>
            <div className="profile-mini">
              <Icons.User />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;