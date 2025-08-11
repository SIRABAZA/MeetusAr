"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Lock, LogOut } from "lucide-react";
import logo from "../../../public/logo.svg";
import meetus from "../../../public/meetusVr.png";
import { loginUser, logoutUser, clearError } from "@/store/authSlice";
import { Input } from "@/components/ui/input";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(1, "Password is required")
    .required("Password is required"),
});

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user, token } = useSelector((state) => state.auth);

  const isAuthenticated = !!user && !!token;

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const result = await dispatch(loginUser(values));
      if (loginUser.fulfilled.match(result)) {
        toast.success("Login successful! Redirecting to dashboard...");
        navigate("/dashboard");
      }
    } catch (err) {
      toast.error("Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (err) {
      toast.error("Logout failed. Please try again.");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  return (
    <div className="min-h-screen relative flex flex-col lg:flex-row items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#f8f9fb] via-[#E9ECF2] to-[#e6e9f0]">
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(ellipse at center, #E477F6 0%, #E477F6 20%, transparent 70%)",
            filter: "blur(120px)",
            transform: "translate(30%, -30%)",
          }}
        />

        <div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-45"
          style={{
            background:
              "radial-gradient(ellipse at center, #9E77F6 0%, #9E77F6 25%, transparent 65%)",
            filter: "blur(100px)",
            transform: "translate(20%, 20%)",
          }}
        />

        <div
          className="absolute bottom-0 left-0 w-[700px] h-[700px] rounded-full opacity-35"
          style={{
            background:
              "radial-gradient(ellipse at center, #B0D2E5 0%, #B0D2E5 30%, transparent 70%)",
            filter: "blur(150px)",
            transform: "translate(-25%, 25%)",
          }}
        />

        <div
          className="absolute top-0 left-0 w-[650px] h-[650px] rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at center, #9E77F6 0%, #9E77F6 25%, transparent 65%)",
            filter: "blur(140px)",
            transform: "translate(-30%, -30%)",
          }}
        />

        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(158, 119, 246, 0.1) 0%, transparent 50%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-8 max-md:mb-0">
        <div className="w-full max-w-md space-y-8 text-center mb-3 order-2 lg:order-1">
          <Card className="bg-transparent border-none shadow-none">
            <CardContent className="p-6">
              <div className="space-y-4 mb-8 max-md:hidden">
                <h1 className="text-[56px] font-bold text-[#1A1A1E] leading-tight">
                  Welcome back
                </h1>
                <p className="text-[#62626B] text-[18px] leading-relaxed mx-auto">
                  Step into our shopping metaverse for an unforgettable shopping
                  experience
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  {error}
                </div>
              )}

              {!isAuthenticated ? (
                <Formik
                  initialValues={{ email: "", password: "" }}
                  validationSchema={LoginSchema}
                  onSubmit={handleSubmit}
                >
                  {({
                    isSubmitting,
                    isValid,
                    dirty,
                    values,
                    handleChange,
                    handleBlur,
                    touched,
                    errors,
                  }) => (
                    <Form className="space-y-4 max-md:-mt-10">
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1A1A1E] h-5 w-5 z-20 pointer-events-none" />
                        <Input
                          type="email"
                          placeholder="Email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`w-full pl-10 h-12 backdrop-blur-sm rounded-[8px] text-[#62626B] placeholder:text-[#62626B] bg-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                            touched.email && errors.email
                              ? "border-red-500"
                              : "border-[#fff]"
                          }`}
                        />
                      </div>
                      {touched.email && errors.email && (
                        <div className="mt-1">
                          <p className="text-red-500 text-sm text-left font-medium">
                            {errors.email}
                          </p>
                        </div>
                      )}

                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1A1A1E] h-5 w-5 z-20 pointer-events-none" />
                        <Input
                          type="password"
                          placeholder="Password"
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`w-full pl-10 h-12 backdrop-blur-sm border-[#fff] rounded-lg text-[#62626B] placeholder:text-[#62626B] bg-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                            touched.password && errors.password
                              ? "border-red-500"
                              : "border-[#fff]"
                          }`}
                        />
                      </div>
                      {touched.password && errors.password && (
                        <div className="mt-1">
                          <p className="text-red-500 text-sm text-left font-medium">
                            {errors.password}
                          </p>
                        </div>
                      )}

                      <Button
                        type="submit"
                        disabled={isSubmitting || !isValid || !dirty || loading}
                        className="w-full h-12 bg-[#9414FF] hover:bg-[#9414FF]/90 cursor-pointer text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading || isSubmitting ? "Logging in..." : "Login"}
                      </Button>
                    </Form>
                  )}
                </Formik>
              ) : (
                <div className="space-y-4">
                  <p className="text-green-600 font-medium">
                    You are already logged in!
                  </p>
                  <Button
                    onClick={handleLogout}
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              )}

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

        <div className="w-full flex flex-col justify-center items-center relative order-1 lg:order-2 mb-8 lg:mb-0 max-md:mb-0">
          <div className="relative">
            <img
              src={logo}
              alt="logo"
              className="w-full max-w-[250px] lg:max-w-[744px] h-auto lg:h-[650px] max-md:h-[300px] max-md:w-[200px]"
            />
          </div>
          <div className="absolute bottom-8 lg:bottom-40">
            <img
              src={meetus}
              alt="meetus"
              className="w-full max-w-[200px] lg:max-w-[413px] h-auto lg:h-[75px] max-sm:h-[30px] max-sm:w-[200px] max-sm:mb-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
