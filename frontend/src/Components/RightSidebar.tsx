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

  const { followers } = useSelector((state: RootState) => state.follow);
  const { user } = useSelector((state: RootState) => state.auth);

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
    localStorage.removeItem("userId"); // optional but recommended
  
    navigate("/");
  };

  return (
    <aside className={`right-sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-content">

        {isMobile && (
          <button className="sidebar-close" onClick={onClose}>
            <Icons.Close />
          </button>
        )}

        <div className="profile-card">
          <div className="profile-avatar-large">
            {user?.avatar ? <img src={user.avatar} alt="User"/> : <Icons.User />}
          </div>

          <div className="profile-info">
            <span>@{user?.name || user?.name}</span>
            <span>{user?.name}</span>
          </div>

          <button className="switch-btn" onClick={logout}>Q</button>
        </div>

        <div className="followers-section">
          <div className="section-header">
            <h4>Your Followers</h4>
            <span>{followers.length}</span>
          </div>

          <div className="followers-list">
            {followers.map((f : any) => (
              <div key={f.id} onClick={() => navigate(`/profile/${f.id}`)}>
                {f.name}
              </div>
            ))}
          </div>
        </div>

      </div>
    </aside>
  );
}

export default RightSidebar;