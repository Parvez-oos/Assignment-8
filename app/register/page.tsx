"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineDiamond } from "react-icons/md";
import { FiArrowLeft } from "react-icons/fi";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const loadingToast = toast.loading("Creating your account...");
    
    const { error } = await authClient.signUp.email({ 
      email, 
      password, 
      name, 
      image: photo 
    });

    if (error) {
      toast.error(error.message ?? "Registration failed", { id: loadingToast });
    } else {
      toast.success("Registration Successful! Please sign in.", { id: loadingToast });
      router.push("/login");
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
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920&auto=format&fit=crop')" }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>
        
        {/* Content inside Image */}
        <div className="relative z-10 flex flex-col justify-end p-16 text-white w-full h-full">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6">
            <MdOutlineDiamond size={28} className="text-white" />
          </div>
          <h1 className="text-5xl font-serif font-bold mb-4 tracking-wide leading-tight">
            Join the World of <br /> Premium Surfaces.
          </h1>
          <p className="text-gray-300 text-lg max-w-md leading-relaxed">
            Create an account to save your favorite tile designs, access architectural resources, and more.
          </p>
        </div>
      </div>

      {/* ================= RIGHT SIDE: FORM ================= */}

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative overflow-y-auto">
        
        
        <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors">
          <FiArrowLeft size={18} /> Back to Home
        </Link>

        
        <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 my-12 lg:my-0">
          
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Create Account</h2>
            <p className="text-gray-500 text-sm">Join Elegant Surfaces today.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
              <input 
                type="text" 
                required 
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all text-gray-900 placeholder-gray-400" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
              />
            </div>

            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
              <input 
                type="email" 
                required 
                placeholder="hello@example.com"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all text-gray-900 placeholder-gray-400" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>

           
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Profile Photo URL</label>
              <input 
                type="url" 
                required 
                placeholder="https://example.com/photo.jpg"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all text-gray-900 placeholder-gray-400" 
                value={photo} 
                onChange={(e) => setPhoto(e.target.value)} 
              />
            </div>

            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <input 
                type="password" 
                required 
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all text-gray-900 placeholder-gray-400" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>

            
            <div className="pt-3">
              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white font-bold tracking-wide py-3.5 rounded-xl hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                Create Account
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="grow h-px bg-gray-200"></div>
            <span className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-widest">Or continue with</span>
            <div className="grow h-px bg-gray-200"></div>
          </div>

          
          <button 
            onClick={handleGoogleLogin} 
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-100 text-gray-700 font-bold py-3.5 rounded-xl hover:bg-gray-50 hover:border-gray-200 transition-all duration-300 shadow-sm"
          >
            <FcGoogle size={22} /> 
            Sign up with Google
          </button>

          
          <p className="text-center mt-8 text-sm text-gray-600 font-medium">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 hover:text-blue-800 font-bold hover:underline transition-all">
              Sign in
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
}