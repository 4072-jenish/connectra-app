import { useEffect, useState } from "react";
import API from "../Services/axios";
import { Icons } from "../utils/icons";
import "../styles/follower.css";
import "../styles/globle.css"


function Followers() {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const { data } = await API.get("/follow/allFollowers");
        setFollowers(data.followers);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchFollowers();
  }, []);

  return (
    <div className="followers-container">
      <div className="followers-header">
        <Icons.Users className="header-icon" />
        <h2>Your Followers</h2>
        <p>People who follow you</p>
      </div>

      {loading ? (
        <div className="followers-loading">
          <Icons.Refresh className="spinning" />
        </div>
      ) : followers.length === 0 ? (
        <div className="no-followers">
          <div className="empty-state">
            <Icons.Users className="empty-icon" />
            <h3>No followers yet</h3>
            <p>Share your profile to connect with others</p>
          </div>
        </div>
      ) : (
        <div className="followers-grid">
          {followers.map((f, index) => (
            <div 
              key={f.follower.id} 
              className="follower-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="follower-card-inner">
                <div className="follower-avatar">
                  {f.follower.avatar ? (
                    <img src={f.follower.avatar} alt={f.follower.name} />
                  ) : (
                    <div className="avatar-placeholder">
                      <Icons.User />
                    </div>
                  )}
                </div>
                
                <div className="follower-info">
                  <h4 className="follower-name">{f.follower.name}</h4>
                  <p className="follower-email">
                    <Icons.Email /> {f.follower.email}
                  </p>
                </div>

                <div className="follower-actions">
                  <button className="message-btn">
                    <Icons.Send />
                  </button>
                  <button className="more-btn">
                    <Icons.More />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Followers;