import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
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
          <h2>Welcome Back</h2>

          <p className="subtitle">
            Login to continue your learning journey
          </p>

          <form>
            <div className="input-group">
              <label>Email Address</label>

              <input
                type="email"
                placeholder="Enter your email"
              />
            </div>

            <div className="input-group">
              <label>Password</label>

              <input
                type="password"
                placeholder="Enter your password"
              />
            </div>

            <div className="options">
              <label className="remember">
                <input type="checkbox" />
                Remember Me
              </label>

              <a href="#">Forgot Password?</a>
            </div>

            <button className="login-btn">
              Login
            </button>
          </form>

          <p className="register-text">
            Don't have an account?{" "}
            <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;