import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Services/axios";
import { Icons } from "../utils/icons";
import "../styles/profile.css";
import "../styles/globle.css";

function Profile() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [follower, setFollower] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const [postsRes, userRes, followersRes] = await Promise.all([
          API.get("/post/userPost"),
          API.get("/auth/userProfile"),
          API.get("/follow/allFollowers")
        ]);
        setPosts(postsRes.data);
        setUser(userRes.data.user);
        setFollower(followersRes.data);
        console.log(follower);
        
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, []);

  const handleEditProfile = () => {
    navigate("/editProfile");
  };

const deletePost = async (postId) => {

  const confirmDelete = window.confirm("Are you sure you want to delete this post?");

  if (!confirmDelete) return;

  try {
    await API.delete(`/post/deletePost/${postId}`);

    setPosts(prev => prev.filter(post => post.id !== postId));

    alert("Post deleted successfully");

  } catch (error) {
    console.error("Delete error:", error);
  }
};

const handleDeleteAccount = async () => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete your account? This action cannot be undone."
  );

  if (!confirmDelete) return;

  try {
    await API.delete("/auth/deleteUser");

    alert("Account deleted successfully");

    // remove token if stored
    localStorage.removeItem("token");

    // redirect to login
    navigate("/");

  } catch (error) {
    console.error("Delete account error:", error);
    alert("Failed to delete account");
  }
};

  if (loading) {
    return (
      <div className="profile-loading">
        <Icons.Refresh className="spinning" />
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-cover">
          <div className="cover-gradient"></div>
        </div>
        
        <div className="profile-info">
          <div className="profile-avatar-wrapper">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="profile-avatar" />
            ) : (
              <div className="profile-avatar-placeholder">
                <Icons.User />
              </div>
            )}
          </div>

          <div className="profile-details">
            <div className="profile-name-wrapper">
  <h1 className="profile-name">{user?.name}</h1>
          <div className="profile-actions">
            <button
              className="edit-profile-btn"
              onClick={handleEditProfile}
            >
              <Icons.Edit /> Edit Profile
            </button>
        
            <button
              className="delete-account-btn save-btn"
              onClick={handleDeleteAccount}
            >
              <Icons.Delete /> Delete Account
            </button>
          </div>
        </div>
            <p className="profile-bio">
              <Icons.Info /> {user?.bio || "No bio yet"}
            </p>
            
            <div className="profile-stats">
              <div className="stat-card">
                <Icons.Image className="stat-icon" />
                <span className="stat-number">{posts.length}</span>
                <span className="stat-label">Posts</span>
              </div>
              <div className="stat-card">
                <Icons.Users className="stat-icon" />
                <span className="stat-number">{follower?.length || 0}</span>
                <span className="stat-label">Followers</span>
              </div>
              <div className="stat-card">
                <Icons.UserCheck className="stat-icon" />
                <span className="stat-number">0</span>
                <span className="stat-label">Following</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <h2 className="posts-title">
          <Icons.Image /> My Posts
        </h2>
        
        {posts.length === 0 ? (
          <div className="no-posts">
            <Icons.Create className="no-posts-icon" />
            <p>No posts yet. Create your first post!</p>
          </div>
        ) : (
            <div className="posts-grid">
              {posts.map((post, index) => (
                <div 
                  key={post.id} 
                  className="profile-post-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <button
                    className="delete-post-btn save-btn"
                    onClick={() => deletePost(post.id)}
                  >
                    <Icons.Delete />
                  </button>
                  <p className="post-content">{post.content}</p>
                  {post.image && (
                    <div className="post-image">
                      <img src={post.image} alt="Post" />
                    </div>
                  )}
                  <div className="post-footer">
                    <span className="post-date">
                      <Icons.Clock /> {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                    <div className="post-engagement">
                      <span><Icons.Heart /> {post.likes?.length || 0}</span>
                      <span><Icons.Comment /> {post.comments?.length || 0}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
        )}
      </div>
    </div>
  );
}

export default Profile;