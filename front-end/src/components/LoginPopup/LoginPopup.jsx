import React, { useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // 👁️ eye icons

const LoginPopup = ({ setShowLogin, setUser, setMessage }) => {
  const [currState, setCurrState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👈 new state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Password validation rules
  const passwordRules = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /\d/.test(password),
    symbol: /[^A-Za-z0-9]/.test(password),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const endpoint =
      currState === "Login"
        ? "http://localhost:3000/api/users/login"
        : "http://localhost:3000/api/users/register";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...(currState === "Sign up" && { name }),
          email,
          password,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        if (currState === "Login") {
          localStorage.setItem("token", data.token);
          setMessage && setMessage("✅ Login successful!");
        } else {
          setMessage && setMessage("✅ Signup complete!");
        }

        localStorage.setItem("user", JSON.stringify(data.user));
        if (setUser) setUser(data.user);
        setShowLogin(false);
      } else {
        setError(data.message || `${currState} failed ❌`);
        setMessage && setMessage(`❌ ${data.message || currState + " failed"}`);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError("Something went wrong 🚨");
      setMessage && setMessage("🚨 Something went wrong");
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={handleSubmit} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="Close"
          />
        </div>

        <div className="login-popup-inputs">
          {currState === "Sign up" && (
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* 👇 Password field with eye icon */}
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* ✅ Show password rules only in Sign up */}
          {currState === "Sign up" && (
            <div className="password-rules">
              <p className={passwordRules.length ? "valid" : "invalid"}>
                {passwordRules.length ? "✅" : "❌"} At least 8 characters
              </p>
              <p className={passwordRules.upper ? "valid" : "invalid"}>
                {passwordRules.upper ? "✅" : "❌"} At least 1 uppercase letter
              </p>
              <p className={passwordRules.lower ? "valid" : "invalid"}>
                {passwordRules.lower ? "✅" : "❌"} At least 1 lowercase letter
              </p>
              <p className={passwordRules.number ? "valid" : "invalid"}>
                {passwordRules.number ? "✅" : "❌"} At least 1 number
              </p>
              <p className={passwordRules.symbol ? "valid" : "invalid"}>
                {passwordRules.symbol ? "✅" : "❌"} At least 1 symbol
              </p>
            </div>
          )}
        </div>

        <button type="submit" disabled={loading}>
          {loading
            ? "Please wait..."
            : currState === "Sign up"
            ? "Create account"
            : "Login"}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>

        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
