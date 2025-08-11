"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Lock } from "lucide-react";
import logo from "../../../public/logo.svg";
import meetus from "../../../public/meetusVr.png";
import { loginUser, clearError } from "@/store/authSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Check if login button should be disabled
  const isLoginDisabled =
    !email || !password || !validateEmail(email) || emailError || passwordError;

  // Handle input changes and clear errors
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (emailError) setEmailError("");
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (passwordError) setPasswordError("");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setEmailError("");
    setPasswordError("");

    // Validate inputs
    let hasErrors = false;

    if (!email) {
      setEmailError("Email is required");
      hasErrors = true;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      hasErrors = true;
    }

    if (!password) {
      setPasswordError("Password is required");
      hasErrors = true;
    }

    if (hasErrors) return;

    // Dispatch login action
    const result = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(result)) {
      // Login successful, redirect to dashboard
      navigate("/dashboard");
    }
  };

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  // Clear Redux error when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      {/* Gradient Background with Ellipses */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f8f9fb] via-[#E9ECF2] to-[#e6e9f0]">
        {/* Top Right - #E477F6 blur 400 */}
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(ellipse at center, #E477F6 0%, #E477F6 20%, transparent 70%)",
            filter: "blur(120px)",
            transform: "translate(30%, -30%)",
          }}
        />

        {/* Bottom Right - #9E77F6 blur 400 */}
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-45"
          style={{
            background:
              "radial-gradient(ellipse at center, #9E77F6 0%, #9E77F6 25%, transparent 65%)",
            filter: "blur(100px)",
            transform: "translate(20%, 20%)",
          }}
        />

        {/* Bottom Left - #B0D2E5 blur 800 */}
        <div
          className="absolute bottom-0 left-0 w-[700px] h-[700px] rounded-full opacity-35"
          style={{
            background:
              "radial-gradient(ellipse at center, #B0D2E5 0%, #B0D2E5 30%, transparent 70%)",
            filter: "blur(150px)",
            transform: "translate(-25%, 25%)",
          }}
        />

        {/* Top Left - #9E77F6 blur 800 */}
        <div
          className="absolute top-0 left-0 w-[650px] h-[650px] rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at center, #9E77F6 0%, #9E77F6 25%, transparent 65%)",
            filter: "blur(140px)",
            transform: "translate(-30%, -30%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl flex items-center justify-between gap-8">
        {/* Left side - Login Form */}
        <div className="w-full max-w-md space-y-8 text-center mb-3">
          <Card className="bg-transparent border-none shadow-none">
            <CardContent className="p-6">
              <div className="space-y-4 mb-8">
                <h1 className="text-[56px] font-bold text-[#1A1A1E] leading-tight">
                  Welcome back
                </h1>
                <p className="text-[#62626B] text-[18px] leading-relaxed mx-auto">
                  Step into our shopping metaverse for an unforgettable shopping
                  experience
                </p>
              </div>

              {/* Error message */}
              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1A1A1E] h-5 w-5 z-10" />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                    className={`pl-10 h-12 border-[#fff] backdrop-blur-sm rounded-[8px] text-[#62626B] placeholder:text-[#62626B] bg-white/20 ${
                      emailError ? "border-red-500" : ""
                    }`}
                    required
                  />
                  {emailError && (
                    <p className="text-red-500 text-sm mt-1 text-left">
                      {emailError}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1A1A1E] h-5 w-5 z-10" />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    className={`pl-10 h-12 backdrop-blur-sm border-[#fff] rounded-lg text-[#62626B] placeholder:text-[#62626B] bg-white/20 ${
                      passwordError ? "border-red-500" : ""
                    }`}
                    required
                  />
                  {passwordError && (
                    <p className="text-red-500 text-sm mt-1 text-left">
                      {passwordError}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isLoginDisabled || loading}
                  className="w-full h-12 bg-[#9414FF] hover:bg-[#9414FF]/90 cursor-pointer text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </form>

              <p className="text-center text-gray-700 mt-8">
                {"Don't have an account? "}
                <a
                  href="#"
                  className="font-medium decoration-2 underline-offset-2 transition-colors text-[#9414FF] hover:text-[#9414FF]/80"
                >
                  Sign up
                </a>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right side - Logo and Branding */}
        <div className="hidden lg:flex flex-1 flex-col justify-center items-center relative">
          <div className="relative">
            <img src={logo} alt="logo" className="w-[744px] h-[650px]" />
          </div>
          <div className="absolute bottom-40">
            <img src={meetus} alt="meetus" className="w-[413px] h-[75px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
