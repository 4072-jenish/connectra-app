import { useState } from "react";
import API from "../Services/axios";
import { useNavigate, Link } from "react-router-dom";
import { Icons, AuthIcons } from "../utils/icons";
import "../styles/register.css";
import "../styles/globle.css"


function Register() {
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    bio: ""
  });

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("bio", form.bio);
    formData.append("avatar", avatar);
    console.log(formData);
    
    try {
      const { data } = await API.post("/auth/regUser", formData);
      console.log(data.email);
      
      navigate("/verify-otp", { state: { email: data.email } });
      alert(data.message);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container register-container">
      <div className="auth-card register-card">
        <div className="auth-decoration">
          <div className="floating-shape shape1"></div>
          <div className="floating-shape shape2"></div>
          <div className="floating-shape shape3"></div>
        </div>

        <div className="register-progress">
          <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>
            <span className="step-number">1</span>
            <span className="step-label">Account</span>
          </div>
          <div className={`progress-line ${step >= 2 ? 'active' : ''}`}></div>
          <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
            <span className="step-number">2</span>
            <span className="step-label">Profile</span>
          </div>
          <div className={`progress-line ${step >= 3 ? 'active' : ''}`}></div>
          <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
            <span className="step-number">3</span>
            <span className="step-label">Photo</span>
          </div>
        </div>

        <div className="auth-content">
          <Icons.Instagram className="auth-logo save-btn"/>
          <h2 className="auth-title">Create Account</h2>
          <p className="auth-subtitle">Join our warm community today!</p>
          
          <form onSubmit={handleSubmit} className="auth-form">
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <div className="step-content">
                <div className="input-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="auth-input"
                  />
                </div>

                <div className="input-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="auth-input"
                  />
                </div>

                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="auth-input"
                  />
                  <button 
                    type="button"
                    className="password-toggle save-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Icons.EyeOff /> : <Icons.Eye />}
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Bio */}
            {step === 2 && (
              <div className="step-content">
                <div className="input-group">
                  <AuthIcons.Bio className="input-icon" />
                  <textarea
                    name="bio"
                    placeholder="Tell us about yourself"
                    value={form.bio}
                    onChange={handleChange}
                    className="auth-input auth-textarea"
                    rows="4"
                  />
                </div>
                <p className="bio-hint">
                  <Icons.Info /> Share your interests, hobbies, or a short introduction
                </p>
              </div>
            )}

            {/* Step 3: Avatar Upload */}
            {step === 3 && (
              <div className="step-content avatar-step">
                <div className="upload-area">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    id="avatar-upload"
                    hidden
                  />
                  
                  {avatarPreview ? (
                    <div className="avatar-preview-container">
                      <img 
                        src={avatarPreview} 
                        alt="Avatar preview" 
                        className="avatar-preview-image"
                      />
                      <button 
                        type="button"
                        className="change-avatar-btn"
                        onClick={() => {
                          setAvatar(null);
                          setAvatarPreview(null);
                        }}
                      >
                        <Icons.Refresh /> Change Photo
                      </button>
                    </div>
                  ) : (
                    <label htmlFor="avatar-upload" className="upload-label">
                      <AuthIcons.Camera className="upload-icon" />
                      <div className="upload-text">
                        <span className="upload-main">Click to upload avatar</span>
                        <span className="upload-hint">
                          <Icons.Image /> PNG, JPG or GIF (max 5MB)
                        </span>
                      </div>
                    </label>
                  )}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="button-group">
              {step > 1 && (
                <button 
                  type="button" 
                  className="auth-button secondary-button"
                  onClick={() => setStep(step - 1)}
                >
                  <Icons.ArrowLeft /> Back
                </button>
              )}
              
              {step < 3 ? (
                <button 
                  type="button" 
                  className="auth-button primary-button"
                  onClick={() => setStep(step + 1)}
                  disabled={
                    (step === 1 && (!form.name || !form.email || !form.password)) ||
                    (step === 2 && !form.bio)
                  }
                >
                  Next <Icons.ArrowRight />
                </button>
              ) : (
                <button 
                  type="submit" 
                  className="save-btn register-button"
                  disabled={loading || !avatar}
                >
                  {loading ? (
                    <Icons.Refresh className="spinning" />
                  ) : (
                    <>
                      <Icons.Check /> Create Account
                    </>
                  )}
                </button>
              )}
            </div>
          </form>

          <p className="auth-footer">
            Already have an account? <Link to="/">
              <Icons.Login /> Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;