import { useEffect, useState } from "react";
import API from "../Services/axios";
import "../styles/rightSidebar.css";
import "../styles/globle.css";
import { Icons } from "../utils/icons";

function RightSidebar({ isOpen, onClose }) {
  const [followers, setFollowers] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [user , setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [followersRes, profileRes] = await Promise.all([
          API.get("/follow/allFollowers"),
          API.get("/auth/userProfile"),
        ]); 
        
        setFollowers(followersRes.data.followers?.slice(0, 5) || []);
        setUser(profileRes.data.user);
        
      } catch (error) {
        console.error("Error fetching sidebar data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.href="/";
  };

  const handleFollow = async (userId) => {
    try {
      await API.get(`/follow/followUser/${userId}`);
      setSuggestions(prev => prev.filter(s => s.id !== userId));
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  return (
    <aside className={`right-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-content">
        {/* Close button for mobile */}
        {isMobile && (
          <button className="sidebar-close" onClick={onClose}>
            <Icons.Close />
          </button>
        )}

        {/* User Profile Section */}
        <div className="profile-card">
          <div className="profile-avatar-large">
            {user?.avatar ? (
              <img src={user.avatar} alt="User"/>
            ) : (
              <div className="profile-avatar-placeholder">
                <Icons.User />
              </div>
            )}
          </div>
          <div className="profile-info">
            <span className="profile-username">
              @{user?.username || user?.name}
            </span>
            <span className="profile-name">
              {user?.name}
            </span>
          </div>
          <button className="switch-btn" onClick={logout}>
            <Icons.Refresh /> Switch
          </button>
        </div>

        {/* Suggestions Section */}
        <div className="suggestions-section">
          <div className="section-header">
            <h4>Suggestions For You</h4>
            <button className="see-all-btn">See All</button>
          </div>

          {loading ? (
            <div className="suggestions-loading">
              {[1, 2, 3].map(n => (
                <div key={n} className="suggestion-skeleton"></div>
              ))}
            </div>
          ) : (
            <div className="suggestions-list">
              {suggestions.map((user) => (
                <div key={user.id} className="suggestion-item">
                  <div className="suggestion-avatar">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} />
                    ) : (
                      <div className="avatar-placeholder">
                        {user.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="suggestion-info">
                    <span className="suggestion-username">@{user.username || user.name}</span>
                    <span className="suggestion-name">{user.name}</span>
                  </div>
                  <button 
                    className="follow-btn-small"
                    onClick={() => handleFollow(user.id)}
                  >
                    <Icons.Follow /> Follow
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Followers Section */}
        <div className="followers-section">
          <div className="section-header">
            <h4>Your Followers</h4>
            <span className="follower-count">{followers.length}</span>
          </div>

          <div className="followers-list">
            {followers.map((f) => (
              <div key={f.follower.id} className="follower-item">
                <div className="follower-avatar">
                  {f.follower.avatar ? (
                    <img src={f.follower.avatar} alt={f.follower.name} />
                  ) : (
                    <div className="avatar-placeholder">
                      {f.follower.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="follower-info">
                  <span className="follower-username">@{f.follower.username || f.follower.name}</span>
                  <span className="follower-name">{f.follower.name}</span>
                </div>
                <div className="follower-status">
                  <span className="status-dot"></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Links */}
        <div className="sidebar-footer-links">
          <a href="#">About</a> • <a href="#">Help</a> • <a href="#">Press</a> • 
          <a href="#">API</a> • <a href="#">Jobs</a> • <a href="#">Privacy</a> • 
          <a href="#">Terms</a>
          <p className="copyright">
            <Icons.Instagram /> © 2024 CONNECTRA
          </p>
        </div>
      </div>
    </aside>
  );
}

export default RightSidebar;