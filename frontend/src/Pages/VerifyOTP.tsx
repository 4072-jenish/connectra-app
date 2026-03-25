import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../Services/axios";
import { Icons } from "../utils/icons";
import "../styles/verifyOTP.css";
import "../styles/globle.css";

function VerifyOTP() {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [canResend, setCanResend] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as any)?.email;

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

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value.replace(/[^0-9]/g, "");
    setOtp(newOtp);
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join("");
    setLoading(true);

    try {
      await API.post("/auth/verify-otp", { email, otp: otpString });
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
  
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const digits = pastedData.replace(/[^0-9]/g, "").split("");
  
    const newOtp = [...otp];
  
    digits.forEach((digit, index) => {
      if (index < 6) {
        newOtp[index] = digit;
      }
    });
  
    setOtp(newOtp);
  };

  const handleResendOTP = async () => {
    try {
      setLoading(true);
  
      await API.post("/auth/resend-otp", { email });
  
      setTimeLeft(60);
      setCanResend(false);
  
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
  
    } catch (error) {
      console.error("Resend error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-container">
      <div className="verify-decoration">
        <div className="floating-shape shape1"></div>
        <div className="floating-shape shape2"></div>
        <div className="floating-shape shape3"></div>
      </div>

      <div className="verify-card">
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