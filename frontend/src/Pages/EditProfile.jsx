import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Services/axios";
import { Icons } from "../utils/icons";
import "../styles/editProfile.css";
import "../styles/globle.css";

function EditProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    bio: ""
  });
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      try {
        setFetchLoading(true);
        const { data } = await API.get("/auth/userProfile");
        setUser(data.user);
        if (data.user?.avatar) {
          setAvatarPreview(data.user.avatar);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setFetchLoading(false);
      }
    };

    getProfile();
  }, []);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("bio", user.bio);
    if (avatar) {
      formData.append("avatar", avatar);
    }

    try {
      await API.post("/auth/editUser", formData);
      alert("Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="edit-loading">
        <Icons.Refresh className="spinning" />
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="edit-profile-page">
      <div className="edit-profile-container">
        {/* Decorative Elements */}
        <div className="edit-decoration">
          <div className="floating-shape shape1"></div>
          <div className="floating-shape shape2"></div>
          <div className="floating-shape shape3"></div>
        </div>

        <div className="edit-profile-card">
          <div className="edit-header">
            <button className="back-btn" onClick={() => navigate("/profile")}>
              <Icons.ArrowLeft /> Back
            </button>
            <h2>
              <Icons.Edit /> Edit Profile
            </h2>
            <p>Update your personal information</p>
          </div>

          <form onSubmit={handleSubmit} className="edit-form">
            {/* Avatar Upload Section */}
            <div className="avatar-section">
              <div className="avatar-preview">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar" />
                ) : (
                  <div className="avatar-placeholder">
                    <Icons.User />
                  </div>
                )}
                <div className="avatar-overlay">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    id="avatar-upload"
                    hidden
                  />
                  <label htmlFor="avatar-upload" className="avatar-upload-label">
                    <Icons.Camera />
                  </label>
                </div>
              </div>
              <p className="avatar-hint">Click the camera icon to change your photo</p>
            </div>

            {/* Form Fields */}
            <div className="form-fields">
              <div className="input-group">
                <label htmlFor="name">
                  <Icons.User /> Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="email">
                  <Icons.Email /> Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="bio">
                  <Icons.Info /> Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={user.bio}
                  onChange={handleChange}
                  placeholder="Tell us about yourself"
                  rows="5"
                />
                <span className="char-count">
                  {user.bio?.length || 0}/200
                </span>
              </div>
            </div>

            {/* Form Actions */}
            <div className="form-actions">
              <button 
                type="button" 
                className="cancel-btn"
                onClick={() => navigate("/profile")}
              >
                <Icons.Close /> Cancel
              </button>
              <button 
                type="submit" 
                className="save-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Icons.Refresh className="spinning" /> Updating...
                  </>
                ) : (
                  <>
                    <Icons.Check /> Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;