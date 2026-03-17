import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../Services/axios";
import { Icons } from "../utils/icons";
import "../styles/verifyOTP.css";
import "../styles/globle.css";

function VerifyOTP() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;



  useEffect(() => {
    if (!email) {
      navigate("/");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [email, navigate]);

  const handleChange = (index, value) => {
    if (value.length > 1) return; 

    const newOtp = [...otp];
    newOtp[index] = value.replace(/[^0-9]/g, ""); 

    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return; // Only allow numbers

    const pastedArray = pastedData.split("");
    const newOtp = [...otp];

    pastedArray.forEach((value, index) => {
      if (index < 6) newOtp[index] = value;
    });

    setOtp(newOtp);

    // Focus the next empty input or last input
    const lastIndex = Math.min(pastedArray.length, 5);
    const nextInput = document.getElementById(`otp-${lastIndex}`);
    if (nextInput) nextInput.focus();
  };

  const handleVerify = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      alert("Please enter complete 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      const { data } = await API.post("/auth/verify-otp", {
        email,
        otp: otpString
      });

      alert(data.message);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setCanResend(false);
    setTimeLeft(60);
    
    try {
      await API.post("/auth/resend-otp", { email });
      alert("New OTP sent to your email!");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to resend OTP");
      setCanResend(true);
    }
  };

  return (
    <div className="verify-container">
      {/* Decorative Elements */}
      <div className="verify-decoration">
        <div className="floating-shape shape1"></div>
        <div className="floating-shape shape2"></div>
        <div className="floating-shape shape3"></div>
      </div>

      <div className="verify-card">
        {/* Header */}
        <div className="verify-header">
          <div className="verify-icon-wrapper">
            <Icons.Email className="verify-icon" />
          </div>
          <h2>Verify Your Email</h2>
          <p className="verify-subtitle">
            We've sent a verification code to
          </p>
          <p className="verify-email">{email}</p>
        </div>

        {/* OTP Input Section */}
        <div className="otp-section">
          <label className="otp-label">Enter 6-digit OTP</label>
          <div className="otp-inputs">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="otp-input"
                autoFocus={index === 0}
              />
            ))}
          </div>
        </div>

        {/* Timer Section */}
        <div className="timer-section">
          {timeLeft > 0 ? (
            <p className="timer-text">
              <Icons.Clock /> Resend code in <span>{timeLeft}s</span>
            </p>
          ) : (
            <button 
              className="resend-btn"
              onClick={handleResendOTP}
              disabled={!canResend}
            >
              <Icons.Refresh /> Resend OTP
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="verify-actions">
          <button 
            className="back-btn"
            onClick={() => navigate("/")}
          >
            <Icons.ArrowLeft /> Back
          </button>
          <button 
            className="verify-btn"
            onClick={handleVerify}
            disabled={loading || otp.join("").length !== 6}
          >
            {loading ? (
              <>
                <Icons.Refresh className="spinning" /> Verifying...
              </>
            ) : (
              <>
                <Icons.Check /> Verify OTP
              </>
            )}
          </button>
        </div>

        <p className="help-text">
          Didn't receive the code? Check your spam folder or 
          <button className="help-link" onClick={handleResendOTP}> click here</button>
        </p>
      </div>
    </div>
  );
}

export default VerifyOTP;