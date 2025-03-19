import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { Eye, EyeOff, Loader2, Lock, MessageSquare, } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../components/AuthImagePattern';
import toast from 'react-hot-toast';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const validateForm = () => {
    if (!formData.username) return toast.error("Username is required");
    if (!formData.password) return toast.error("Password is required");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if( success === true) login(formData)
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className='size-6 text-primary' />
              </div>
              <h1 className="text-2xl font-bold mt-2">
                Welcome Back
              </h1>
              <p className="text-base-content/60">Sign in to your account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 bg-base-100 p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
            {/* Username */}
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <div className="absolute h-8 p-2 z-10 top-7 inset-y-0 left-3 flex items-center text-base-content/40">
                @
              </div>
              <input
                type="text"
                name="username"
                placeholder='John'
                className="input input-bordered w-full pl-12"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>

            {/* Password */}
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="absolute h-8 p-2 z-10 top-7 inset-y-0 left-3 flex items-center text-base-content/40">
                <Lock className="size-5" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder='Your Password'
                className="input input-bordered w-full pl-12 pr-12"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                className="absolute h-8 p-2 z-10 top-7 inset-y-0 right-3 flex items-center cursor-pointer text-base-content/40"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
              </button>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-full" disabled={isLoggingIn}>
              {isLoggingIn ? <>
                <Loader2 className='size-5 animate-spin' />
                Loading...
              </> : "Login"}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Don't have an account?{" "}
              <Link to='/register' className='link link-primary'>Create Account</Link>
            </p>
          </div>
        </div>
      </div>

      <AuthImagePattern
        title="Welcome Back!"
        subtitle="Sign in to continue your conversations and catch up with your messages."
      />
    </div>
  )
}

export default Login
