import { useEffect, useState } from "react";
import API from "../Services/axios";
import { Icons } from "../utils/icons";
import "../styles/users.css";
import "../styles/globle.css"


function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await API.get("/user/allUser");
        setUsers(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleFollow = async (userId) => {
    try {
      await API.get(`/follow/followUser/${userId}`);
      setFollowing(prev => ({ ...prev, [userId]: !prev[userId] }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="users-container">
      <div className="users-header">
        <Icons.Users className="header-icon" />
        <h2>Discover People</h2>
        <p>Connect with others and grow your network</p>
      </div>

      {loading ? (
        <div className="loading-grid">
          {[1,2,3,4].map(n => (
            <div key={n} className="user-card-skeleton"></div>
          ))}
        </div>
      ) : (
        <div className="users-grid">
          {users.map((user, index) => (
            <div 
              key={user.id} 
              className="user-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="user-card-gradient"></div>
              <div className="user-card-content">
                <div className="user-avatar-large">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} />
                  ) : (
                    <div className="avatar-placeholder">
                      <Icons.User />
                    </div>
                  )}
                  <Icons.Online className="online-indicator" />
                </div>

                <h3 className="user-name">{user.name}</h3>
                {user.bio && <p className="user-bio">{user.bio}</p>}
                
                <div className="user-stats">
                  <div className="stat">
                    <Icons.Users className="stat-icon" />
                    <span className="stat-label">Followers</span>
                  </div>
                  <div className="stat">
                    <Icons.Image className="stat-icon" />
                    <span className="stat-label">Posts</span>
                  </div>
                </div>

                <button 
                  className={`follow-btn ${following[user.id] ? 'following' : ''}`}
                  onClick={() => handleFollow(user.id)}
                >
                  {following[user.id] ? (
                    <>
                      <Icons.Check /> Following
                    </>
                  ) : (
                    <>
                      <Icons.Follow /> Follow
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Users;