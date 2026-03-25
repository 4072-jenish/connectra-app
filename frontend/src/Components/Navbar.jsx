import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Icons, NavIcons } from "../utils/icons";
import "../styles/navbar.css";
import "../styles/globle.css";

function Navbar() {
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const navItems = [
    { path: "/feed", label: "Feed", icon: NavIcons.Home },
    { path: "/search", label: "Search", icon: NavIcons.Search },
    { path: "/create-post", label: "Create", icon: NavIcons.Create },
    { path: "/users", label: "Users", icon: NavIcons.Profile },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/feed" className="nav-logo">
          <Icons.Instagram className="logo-icon" />
          {!isMobile && <span className="logo-text">Connectra</span>}
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <div className="nav-links">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                >
                  <Icon className="nav-icon" />
                  <span className="nav-label">{item.label}</span>
                </Link>
              );
            })}
          </div>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <button 
            className="mobile-nav-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icons.Menu />
          </button>
        )}

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

      {/* Mobile Navigation Menu */}
      {isMobile && mobileMenuOpen && (
        <div className="mobile-nav-dropdown">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`mobile-nav-item ${location.pathname === item.path ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Icon className="nav-icon" />
                <span className="nav-label">{item.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}

export default Navbar;