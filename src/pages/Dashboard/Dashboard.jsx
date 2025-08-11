import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, User, Key } from "lucide-react";
import { logoutUser, checkAuthStatus } from "@/store/authSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  // Check authentication status on component mount
  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(checkAuthStatus());
    }
  }, [dispatch, isAuthenticated]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, loading, navigate]);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome to Dashboard
          </h1>
          <p className="text-gray-600">
            You have successfully logged in to the system
          </p>
        </div>

        {/* User Info Card */}
        <Card className="mb-8 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <User className="h-6 w-6" />
              User Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500">
                  User ID
                </label>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <Key className="h-4 w-4 text-gray-400" />
                  <span className="font-mono text-gray-700">
                    {user.id || "N/A"}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500">
                  Name
                </label>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <User className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-700">{user.name || "N/A"}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-800">Actions</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex justify-center">
              <Button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </Button>
            </div>
            <p className="text-center text-gray-500 mt-4">
              Click the logout button to sign out and return to the login page
            </p>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p>© 2024 MeetUs VR. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
