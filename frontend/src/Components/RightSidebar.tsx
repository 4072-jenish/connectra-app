import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/rightSidebar.css";
import "../styles/globle.css";
import { Icons } from "../utils/icons";
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "../store";
import { followUser, getFollowData } from "../Services/Actions/followAction";
import { getUserProfile } from "../Services/Actions/authAction";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function RightSidebar({ isOpen, onClose }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { followers, following } = useSelector((state: RootState) => state.follow);
  const { user } = useSelector((state: RootState) => state.profile);

  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 1024);

  useEffect(() => {
    dispatch(getFollowData());
    dispatch(getUserProfile());
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleFollow = (id: number) => {
    dispatch(followUser(id));
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };

  const handleProfileClick = (userId: number) => {
    navigate(`/profile/${userId}`);
    onClose();
  };

  return (
    <aside className={`right-sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-content">
        {isMobile && (
          <button className="sidebar-close" onClick={onClose}>
            <Icons.Close />
          </button>
        )}

        {/* Profile Card */}
        <div className="profile-card">
          <div className="profile-avatar-large">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} />
            ) : (
              <Icons.User />
            )}
          </div>

          <div className="profile-info">
            <span>@{user?.name || user?.name}</span>
            <span>{user?.name}</span>
          </div>

          <button className="switch-btn" onClick={logout}>
            <Icons.Logout /> Switch
          </button>
        </div>

        {/* Followers Section */}
        <div className="followers-section">
          <div className="section-header">
            <h4>Your Followers</h4>
            <span>{followers?.length || 0}</span>
          </div>

          <div className="followers-list">
            {(!followers || followers.length === 0) ? (
              <div className="empty-followers">
                <Icons.Users />
                <p>No followers yet</p>
              </div>
            ) : (
              followers
                .filter((f: any) => !user?.id || f?.id !== user.id)
                .map((f: any, index: number) => (
                <div
                  key={f.id}
                  className="follower-item"
                  onClick={() => handleProfileClick(f.id)}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="follower-avatar">
                    {f.avatar ? (
                      <img src={f.avatar} alt={f.name} />
                    ) : (
                      <Icons.User />
                    )}
                  </div>
                  <div className="follower-info">
                    <span>@{f.name}</span>
                    <span>{f.name}</span>
                  </div>
                </div>
              ))
            )}
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