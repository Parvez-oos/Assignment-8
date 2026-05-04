"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { FiEdit3, FiMail, FiUser, FiShield } from "react-icons/fi";

export default function MyProfile() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }

  if (!session) return null; 

  
  const userImage = session.user.image || `https://ui-avatars.com/api/?name=${session.user.name}&background=233249&color=fff&size=150`;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* ================= TOP BANNER ================= */}

      <div className="h-64 md:h-80 w-full bg-linear-to-r from-[#1a2538] to-blue-900 relative">
        <div className="absolute inset-0 bg-black/20"></div>
       
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
      </div>

      {/* ================= PROFILE CARD ================= */}

      <div className="max-w-4xl mx-auto px-6 sm:px-10 -mt-24 md:-mt-32 relative z-10">
        
        {/* ✅ FIX: Changed overflow-hidden to overflow-visible so the image is not cut off */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-visible">
          
          <div className="p-8 sm:p-12">
            
            {/* Header Row: Avatar & Action Button */}
            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end gap-6 mb-8">
              <div className="-mt-24 sm:-mt-28 relative">
                {/* Profile Avatar */}
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                  <img 
                    src={userImage} 
                    alt="Profile Avatar" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // If the URL is broken, instantly replace it with initials
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${session.user.name}&background=233249&color=fff&size=150`;
                    }}
                  />
                </div>
              </div>

              <Link 
                href="/update-profile" 
                className="btn btn-outline border-gray-300 hover:bg-gray-900 hover:text-white rounded-sm uppercase tracking-widest text-xs px-8 flex items-center gap-2"
              >
                <FiEdit3 size={16} /> Update Information
              </Link>
            </div>

            
            <div className="text-center sm:text-left border-b border-gray-100 pb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">{session.user.name}</h1>
              <p className="text-lg text-gray-500 mt-2 font-medium">Member of Elegant Surfaces</p>
            </div>

            
            <div className="mt-10">
              <h3 className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-6">Account Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                
                <div className="flex items-center gap-4 bg-gray-50 p-5 rounded-xl border border-gray-100">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-blue-600">
                    <FiUser size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Full Name</p>
                    <p className="text-gray-900 font-semibold text-lg">{session.user.name}</p>
                  </div>
                </div>

                
                <div className="flex items-center gap-4 bg-gray-50 p-5 rounded-xl border border-gray-100">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-blue-600">
                    <FiMail size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Email Address</p>
                    <p className="text-gray-900 font-semibold text-lg">{session.user.email}</p>
                  </div>
                </div>

                
                <div className="flex items-center gap-4 bg-gray-50 p-5 rounded-xl border border-gray-100">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-blue-600">
                    <FiShield size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Account Status</p>
                    <p className="text-green-600 font-bold text-lg flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span> Active
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}