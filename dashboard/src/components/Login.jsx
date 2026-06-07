import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!email || !password || !confirmPassword) {
      toast.error("Please fill all fields!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/user/login",
        { 
          email, 
          password, 
          confirmPassword, 
          role: "Admin"  // Dashboard is for admins only
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      
      toast.success(response.data.message || "Login Successful!");
      setIsAuthenticated(true);
      
      // Clear form
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      
      // Redirect to dashboard
      navigateTo("/");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage);
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <section className="container form-component">
        <img src="/logo.png" alt="logo" className="logo" />
        <h1 className="form-title">WELCOME TO ZEECARE</h1>
        <p>Admin Dashboard - Only Admins Are Allowed!</p>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <p style={{ fontSize: "12px", color: "#666", marginTop: "5px" }}>
            💡 Tip: You must have an Admin account to login here
          </p>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login as Admin"}
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
