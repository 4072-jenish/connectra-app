import { useState } from "react";
import API from "../Services/axios";
import { useNavigate, Link } from "react-router-dom";
import { Icons, AuthIcons } from "../utils/icons";
import "../styles/login.css";
import "../styles/globle.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState<{ email: string; password: string }>({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await API.post("/auth/login", form);
      localStorage.setItem("token", data.token);
      navigate("/feed");
    } catch (error: any) {
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const InstagramIcon = Icons.Instagram;
  const EmailIcon = AuthIcons.Email;
  const PasswordIcon = AuthIcons.Password;
  const EyeIcon = Icons.Eye;
  const EyeOffIcon = Icons.EyeOff;
  const RefreshIcon = Icons.Refresh;
  const LoginIcon = Icons.Login;
  const RegisterIcon = Icons.Register;

  return (
    <div className="auth-container">
      <div className="auth-card login-card">
        <div className="auth-decoration">
          <div className="floating-shape shape1"></div>
          <div className="floating-shape shape2"></div>
          <div className="floating-shape shape3"></div>
        </div>

        <div className="auth-content">
          {InstagramIcon && <InstagramIcon className="auth-logo save-btn" />}
          <h2 className="auth-title">Welcome Back!</h2>
          <p className="auth-subtitle">Login to continue your journey</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
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
                {showPassword
                  ? (EyeOffIcon && <EyeOffIcon />)
                  : (EyeIcon && <EyeIcon />)}
              </button>
            </div>

            <button
              type="submit"
              className="auth-button login-button"
              disabled={loading}
            >
              {loading ? (
                RefreshIcon && <RefreshIcon className="spinning" />
              ) : (
                <>
                  {LoginIcon && <LoginIcon />} Login
                </>
              )}
            </button>
          </form>

          <p className="auth-footer">
            Don't have an account? <Link to="/register">
              {RegisterIcon && <RegisterIcon />} Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;