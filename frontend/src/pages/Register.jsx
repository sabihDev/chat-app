import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../components/AuthImagePattern';
import toast from 'react-hot-toast';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "male"
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.username) return toast.error("Username is required");
    if (!formData.fullName) return toast.error("Full name is required");
    if (!formData.email) return toast.error("Email is required");
    if (!formData.password) return toast.error("Password is required");
    if (!formData.confirmPassword) return toast.error("Confirm Password is required");
    if ((formData.password.length < 6) || (formData.confirmPassword.length < 6)) return toast.error("Passwords must be at least 6 characters");
    if (!(formData.password === formData.confirmPassword)) return toast.error("Passwords did not match");
    if (!/\S+@\S+\.\S/.test(formData.email)) return toast.error("Email is not valid");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if( success === true) signup(formData)
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
                Create Account
              </h1>
              <p className="text-base-content/60">Get started with your free account</p>
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

            {/* Full Name */}
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <div className="absolute h-8 p-2 z-10 top-7 inset-y-0 left-3 flex items-center text-base-content/40">
                <User className="size-5" />
              </div>
              <input
                type="text"
                name="fullName"
                placeholder='John Doe'
                className="input input-bordered w-full pl-12"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>

            {/* Email */}
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <div className="absolute h-8 p-2 z-10 top-7 inset-y-0 left-3 flex items-center text-base-content/40">
                <Mail className="size-5" />
              </div>
              <input
                type="email"
                name="email"
                placeholder='you@gmail.com'
                className="input input-bordered w-full pl-12"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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

            {/* Confirm Password */}
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <div className="absolute h-8 p-2 z-10 top-7 inset-y-0 left-3 flex items-center text-base-content/40">
                <Lock className="size-5" />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                className="input input-bordered w-full pl-12"
                placeholder='Confirm your password'
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
              <button
                type="button"
                className="absolute h-8 p-2 z-10 top-7 inset-y-0 right-3 flex items-center cursor-pointer text-base-content/40"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
              </button>
            </div>

            {/* Gender Selection */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Gender</span>
              </label>
              <select
                className="select select-bordered w-full focus:outline-none"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp}>
              {isSigningUp ? <>
                <Loader2 className='size-5 animate-spin' />
                Loading...
              </> : "Create Account"}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to='/login' className='link link-primary'>Sign in</Link>
            </p>
          </div>
        </div>
      </div>

      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  )
}

export default Register
