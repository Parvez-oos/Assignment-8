"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineDiamond } from "react-icons/md";
import { FiArrowLeft } from "react-icons/fi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const loadingToast = toast.loading("Authenticating...");
    
    const { error } = await authClient.signIn.email({ email, password });

    if (error) {
      toast.error(error.message ?? "Invalid email or password", { id: loadingToast });
    } else {
      toast.success("Welcome back!", { id: loadingToast });
      router.push("/");
    }
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({ provider: "google", callbackURL: "/" });
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      
      {/* ================= LEFT SIDE: IMAGE BANNER ================= */}
      <div 
        className="hidden lg:flex lg:w-1/2 bg-cover bg-center relative"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1920&auto=format&fit=crop')" }}
      >
        
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent"></div>
        
        
        <div className="relative z-10 flex flex-col justify-end p-16 text-white w-full h-full">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6">
            <MdOutlineDiamond size={28} className="text-white" />
          </div>
          <h1 className="text-5xl font-serif font-bold mb-4 tracking-wide leading-tight">
            Discover Your <br /> Perfect Aesthetic.
          </h1>
          <p className="text-gray-300 text-lg max-w-md leading-relaxed">
            Sign in to explore our premium porcelain and marble tile collections curated for modern spaces.
          </p>
        </div>
      </div>

      {/* ================= RIGHT SIDE: FORM ================= */}

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        
        
        <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors">
          <FiArrowLeft size={18} /> Back to Home
        </Link>

        <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 mt-10 lg:mt-0">
          
         
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Welcome Back</h2>
            <p className="text-gray-500 text-sm">Please enter your details to sign in.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
              <input 
                type="email" 
                required 
                placeholder="hello@example.com"
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all text-gray-900 placeholder-gray-400" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>

            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <input 
                type="password" 
                required 
                placeholder="••••••••"
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all text-gray-900 placeholder-gray-400" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>

            
            <div className="pt-2">
              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white font-bold tracking-wide py-3.5 rounded-xl hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                Sign In
              </button>
            </div>
          </form>

          
          <div className="flex items-center my-8">
            <div className="grow h-px bg-gray-200"></div>
            <span className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-widest">Or continue with</span>
            <div className="grow h-px bg-gray-200"></div>
          </div>

          
          <button 
            onClick={handleGoogleLogin} 
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-100 text-gray-700 font-bold py-3.5 rounded-xl hover:bg-gray-50 hover:border-gray-200 transition-all duration-300 shadow-sm"
          >
            <FcGoogle size={22} /> 
            Sign in with Google
          </button>

          
          <p className="text-center mt-10 text-sm text-gray-600 font-medium">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-blue-600 hover:text-blue-800 font-bold hover:underline transition-all">
              Create an account
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
}