import React, { useState } from "react";
import { Button, Input } from "./ui";
import Silk from "./Silk";

const Login = ({ handleLogin, handleSignup }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = () => {
    if (isSignup) {
      handleSignup(formData.username, formData.email, formData.password);
    } else {
      handleLogin(formData.email, formData.password);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center py-16">
      {/* Animated Silk Background */}
      <div className="absolute inset-0 z-0">
        <Silk
          speed={3}
          scale={1.2}
          color="#f59e0b"
          noiseIntensity={1.2}
          rotation={0}
        />
      </div>

      {/* Login/Signup Card */}
      <div className="relative z-10 max-w-md w-full mx-auto overflow-hidden card-hover">
        <div className="bg-spice-forest p-10 text-center text-white">
          <h2 className="font-display text-3xl font-bold mb-2 tracking-tight">
            {isSignup ? "Join South Spice" : "Welcome Back"}
          </h2>
          <p className="text-emerald-100/70 text-sm font-medium">
            {isSignup
              ? "Create your account for traditional flavors"
              : "Log in to your South Spice account"}
          </p>
        </div>
        <div className="p-10 space-y-6">
          {isSignup && (
            <Input
              id="username"
              label="Full Name"
              placeholder="John Doe"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          )}
          <Input
            id="email"
            label="Email Address"
            placeholder="name@restaurant.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <Input
            id="password"
            type="password"
            label="Password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <Button
            variant="secondary"
            className="w-full py-4 shadow-lg shadow-spice-saffron/20 mt-4"
            onClick={handleSubmit}
          >
            {isSignup ? "Create Account" : "Login to System"}
          </Button>

          <div className="text-center space-y-2">
            <button
              className="text-xs text-spice-forest font-bold hover:underline"
              onClick={() => setIsSignup(!isSignup)}
            >
              {isSignup
                ? "Already have an account? Login"
                : "Don't have an account? Sign up"}
            </button>
            <p className="text-center text-xs text-gray-400 font-medium">
              Forgot your credentials? Contact the administrator.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
