import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Icons } from "../utils/icons";
import "../styles/profile.css";
import "../styles/globle.css";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import {
  getProfile,
  deletePost,
  deleteAccount,
} from "../Services/Actions/profileAction";

function Profile() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const dispatch = useDispatch<AppDispatch>();

  const { user, posts, followers, following, loading } = useSelector(
    (state: RootState) => state.profile
  );

  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  const loggedInUserId = Number(localStorage.getItem("userId") || 0);
  const isOwnProfile = !id || Number(id) === loggedInUserId;

  const handleEditProfile = () => {
    navigate("/editProfile");
  };

  // ✅ FETCH PROFILE
  useEffect(() => {
    dispatch(getProfile(id ? Number(id) : undefined));
  }, [id]);

  // ✅ LOADING
  if (loading) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-cover">
          <div className="cover-gradient">
            <button className="back-btn" onClick={() => navigate("/feed")}>
              <Icons.ArrowLeft /> Back
            </button>
          </div>
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

              {isOwnProfile && (
                <div className="profile-actions">
                  <button
                    className="edit-profile-btn"
                    onClick={handleEditProfile}
                  >
                    <Icons.Edit /> Edit Profile
                  </button>

                  <button
                    className="delete-account-btn save-btn"
                    onClick={() => dispatch(deleteAccount())}
                  >
                    <Icons.Delete /> Delete Account
                  </button>
                </div>
              )}
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
                <span
                  className="stat-number clickable"
                  onClick={() => setShowFollowers(true)}
                >
                  {followers.length}
                </span>
                <span className="stat-label">Followers</span>
              </div>

              <div className="stat-card">
                <Icons.UserCheck className="stat-icon" />
                <span
                  className="stat-number clickable"
                  onClick={() => setShowFollowing(true)}
                >
                  {following.length}
                </span>
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
                {isOwnProfile && (
                  <button
                    className="delete-post-btn save-btn"
                    onClick={() => {
                      if (window.confirm("Delete this post?")) {
                        dispatch(deletePost(post.id));
                      }
                    }}
                  >
                    <Icons.Delete />
                  </button>
                )}

                <p className="post-content">{post.content}</p>

                {post.image && (
                  <div className="post-image">
                    <img src={post.image} alt="Post" />
                  </div>
                )}

                <div className="post-footer">
                  <span className="post-date">
                    <Icons.Clock />{" "}
                    {new Date(post.createdAt).toLocaleDateString()}
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

      {/* Followers Modal */}
      {showFollowers && (
        <div className="followers-modal">
          <div className="followers-content">
            <div className="modal-header">
              <h3><Icons.Users /> Followers</h3>
              <button onClick={() => setShowFollowers(false)}>
                <Icons.Close />
              </button>
            </div>

            <div className="followers-list">
              {followers.length === 0 ? (
                <p>No followers yet</p>
              ) : (
                followers.map((u, index) => (
                  <div
                    key={u.id}
                    className="follower-item"
                    onClick={() => {
                      navigate(`/profile/${u.id}`);
                      setShowFollowers(false);
                    }}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="follower-avatar">
                      {u.avatar ? (
                        <img src={u.avatar} alt={u.name} />
                      ) : (
                        <div className="avatar-placeholder">
                          {u.name.charAt(0)}
                        </div>
                      )}
                    </div>

                    <div className="follower-info">
                      <span>@{u.name || u.name}</span>
                      <span>{u.name}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Following Modal */}
      {showFollowing && (
        <div className="followers-modal">
          <div className="followers-content">
            <div className="modal-header">
              <h3><Icons.UserCheck /> Following</h3>
              <button onClick={() => setShowFollowing(false)}>
                <Icons.Close />
              </button>
            </div>

            <div className="followers-list">
              {following.length === 0 ? (
                <p>Not following anyone yet</p>
              ) : (
                following.map((u, index) => (
                  <div
                    key={u.id}
                    className="follower-item"
                    onClick={() => {
                      navigate(`/profile/${u.id}`);
                      setShowFollowing(false);
                    }}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="follower-avatar">
                      {u.avatar ? (
                        <img src={u.avatar} alt={u.name} />
                      ) : (
                        <div className="avatar-placeholder">
                          {u.name.charAt(0)}
                        </div>
                      )}
                    </div>

                    <div className="follower-info">
                      <span>@{u.name || u.name}</span>
                      <span>{u.name}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;