import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquareLock, Settings, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatedSpan } from "./terminal/AnimatedSpan";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout, authUser } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Error in logout:", err?.response?.data || err.message);
    }
  };
  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-10 backdrop-blur-lg shadow">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between  h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquareLock className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">
                <AnimatedSpan delay={100}> Chatify</AnimatedSpan>
              </h1>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/settings" className="btn btn-sm gap-2 transition-colors">
              <Settings className="w-5 h-5" />
              <span className="hidden sm:inline text-sm">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link to="/profile" className="btn btn-sm gap-2">
                  <User className="size-5" />
                  <span className="hidden sm:inline text-sm">
                    {authUser?.fullName}
                  </span>
                </Link>

                <button
                  className="flex gap-2 items-center"
                  onClick={handleLogout}
                >
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
