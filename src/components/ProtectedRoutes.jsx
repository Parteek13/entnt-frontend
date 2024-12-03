import React from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  console.log(allowedRoles);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  if (!token || !allowedRoles.includes(role)) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-6"
      >
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <h1 className="text-4xl font-semibold text-red-500 mb-4 text-center">
            Access Denied!
          </h1>
          <p className="text-lg text-gray-600 mb-6 text-center">
            You do not have the necessary permissions to view this page. Please log in again to continue.
          </p>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("role");
              navigate("/");
            }}
            className="w-full bg-red-500 text-white text-lg font-semibold py-3 rounded-lg transition-transform transform hover:scale-105 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
