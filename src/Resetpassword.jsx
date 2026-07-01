import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function ResetPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const reset = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          resetCode,
          newPassword,
        }),
      });

      const data = await res.json();
      alert(data.message);

      if (res.ok) {
        navigate("/login");
      }
    } catch (err) {
      alert("Server Error");
      console.log(err);
    }
  };

  return (
    <div className="login-page">
      {/* Left Section */}
      <div className="login-left">
        <div className="brand">AI Education</div>

        <h1>Create a New Password</h1>

        <p className="description">
          Your new password must be different from your previous password.
          Enter the reset code sent to your email and create a strong password.
        </p>

        <div className="features">
          <div>🔒 Secure Reset</div>
          <div>⚡ Fast Recovery</div>
          <div>📧 Email Verification</div>
        </div>

        <div className="illustration">
          <div className="circle large"></div>
          <div className="circle small"></div>

          <div className="study-card">
            <span>🔐</span>
            <p>Password Recovery</p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="login-right">
        <div className="login-card reset-card">
          <div className="reset-icon">🔑</div>

          <h2>Reset Password</h2>

          <p className="subtitle">
            Enter your email, reset code and create a new password.
          </p>

          <form onSubmit={reset} className="reset-form">

            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Reset Code</label>
              <input
                type="text"
                placeholder="Enter reset code"
                value={resetCode}
                onChange={(e) => setResetCode(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="login-btn">
              Reset Password
            </button>

            <p className="register-text">
              Remember your password?{" "}
              <Link to="/login">Back to Login</Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;