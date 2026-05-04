"use client";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";


import { FiMenu, FiX, FiLogOut } from "react-icons/fi";
import { MdOutlineDiamond } from "react-icons/md";

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname(); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Tiles", path: "/all-tiles" },
  ];

  if (session) {
    navLinks.push({ name: "My Profile", path: "/my-profile" });
  }

  return (
    <nav className="sticky top-0 z-100 w-full bg-white border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="w-full mx-auto px-6 md:px-16 lg:px-24 max-w-480">
        <div className="flex justify-between items-center h-24">
          
          {/* ================= LEFT: LOGO ================= */}

          <div className="shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-linear-to-br from-[#233249] to-blue-800 text-white flex items-center justify-center rounded-lg shadow-md group-hover:scale-105 transition-transform duration-300">
                <MdOutlineDiamond size={24} />
              </div>
              <span className="font-serif text-2xl md:text-3xl font-bold tracking-wider text-gray-900 drop-shadow-sm">
                Elegant<span className="text-gray-400 font-light">Surfaces</span>
              </span>
            </Link>
          </div>

          {/* ================= CENTRE: LINKS ================= */}

          <div className="hidden md:flex items-center justify-center space-x-12">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link 
                  key={link.path} 
                  href={link.path}
                  className={`text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:text-blue-600 relative
                    ${isActive ? "text-blue-600" : "text-gray-600"}
                  `}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-blue-600 rounded-full"></span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* ================= RIGHT: AUTH BUTTONS ================= */}

          <div className="hidden md:flex items-center space-x-4">
             {isPending ? (
                <span className="loading loading-spinner text-blue-600"></span>
             ) : !session ? (
                // Logged Out: Show Login Button
                <Link 
                  href="/login" 
                  className="bg-blue-600 text-white hover:bg-blue-700 px-10 py-3 text-sm font-bold tracking-widest uppercase rounded-sm transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center"
                >
                  Login
                </Link>
             ) : (
                
                <button 
                  onClick={handleLogout} 
                  className="bg-red-50 text-red-600 border border-red-100 hover:bg-red-600 hover:text-white px-8 py-3 text-sm font-bold tracking-widest uppercase rounded-sm transition-all duration-300 shadow-sm flex items-center justify-center gap-2"
                >
                  <FiLogOut size={18} /> Logout
                </button>
             )}
          </div>

          {/* ================= MOBILE MENU BUTTON ================= */}

          <div className="md:hidden flex items-center">
             <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-800 hover:text-blue-600 focus:outline-none transition-colors p-2"
             >
               {isMobileMenuOpen ? <FiX size={32} /> : <FiMenu size={32} />}
             </button>
          </div>

        </div>
      </div>

      {/* ================= MOBILE DROPDOWN MENU ================= */}

      <div className={`md:hidden absolute w-full bg-white border-b border-gray-200 shadow-xl transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-6 py-6 space-y-6 flex flex-col">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              href={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-base font-bold tracking-widest uppercase border-b border-gray-100 pb-3 
                ${pathname === link.path ? "text-blue-600" : "text-gray-600"}
              `}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="pt-4">
            {!session ? (
               <Link 
                  href="/login" 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="bg-blue-600 text-white hover:bg-blue-700 px-10 py-4 text-sm font-bold tracking-widest uppercase rounded-sm transition-all duration-300 flex items-center justify-center w-full shadow-md"
               >
                 Login
               </Link>
            ) : (
               <button 
                  onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} 
                  className="bg-red-50 text-red-600 border border-red-200 hover:bg-red-600 hover:text-white px-10 py-4 text-sm font-bold tracking-widest uppercase rounded-sm transition-all duration-300 flex items-center justify-center w-full"
               >
                 <FiLogOut size={18} className="mr-2" /> Logout
               </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}