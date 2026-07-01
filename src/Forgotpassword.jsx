import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Forgotpassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSendCode = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      alert("Email is required");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(`${data.message}\nYour reset code is: ${data.resetCode}`);
        navigate("/reset-password");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Backend not connected");
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="brand">🤖 AI Education</div>

        <h1>Empowering Minds with AI Education</h1>

        <p className="description">
          Learn smarter, grow faster, and unlock your potential with an
          intelligent learning platform designed for students and professionals.
        </p>

        <div className="features">
          <div>📘 Smart Learning</div>
          <div>📊 Track Progress</div>
          <div>🤖 AI Assistance</div>
        </div>

        <div className="illustration">
          <div className="circle large"></div>
          <div className="circle small"></div>

          <div className="study-card">
            <span>AI</span>
            <p>Personalized Learning</p>
          </div>
        </div>
      </div>

      <div className="login-right">
        <div className="login-card">
          <h2>Forgot Password</h2>

          <p className="subtitle">Enter your email to receive reset code</p>

          <form onSubmit={handleSendCode}>
            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button type="submit" className="login-btn">
              Send Code
            </button>
          </form>

          <p className="register-text">
            Remember password? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Forgotpassword;