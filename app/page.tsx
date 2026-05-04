"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';


import { FaPlay, FaRegBuilding, FaMedal, FaLeaf } from "react-icons/fa";
import { MdOutlineComputer, MdOutlineHelpOutline, MdOutlineArticle } from "react-icons/md";
import { RiHandCoinLine } from "react-icons/ri";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Tile {
  id: string;
  title: string;
  image: string;
  description?: string;
  category?: string;
  price?: number;
  currency?: string;
  dimensions?: string;
  material?: string;
  inStock?: boolean;
}

const heroSlides = [
  { id: 1, title: "Designed for Life", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1920&auto=format&fit=crop" },
  { id: 2, title: "Crafted with Perfection", image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1920&auto=format&fit=crop" },
  { id: 3, title: "Elegance in Every Detail", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920&auto=format&fit=crop" },
  { id: 4, title: "Modern Minimalist Spaces", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1920&auto=format&fit=crop" },
  { id: 5, title: "Premium Stone & Marble", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1920&auto=format&fit=crop" }
];

const categories = [
  { name: "Nano Crystal Polished", img: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=800&auto=format&fit=crop" },
  { name: "Glazed Porcelain", img: "https://images.unsplash.com/photo-1554295405-abb8fd54f153?q=80&w=800&auto=format&fit=crop" },
  { name: "Glossy Wall", img: "https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=800&auto=format&fit=crop" },
  { name: "High Definition Relief", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop" },
  { name: "Matte Finish Concrete", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop" },
  { name: "Rustic Natural Stone", img: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=800&auto=format&fit=crop" },
  { name: "Geometric Mosaics", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop" },
  { name: "Premium Wood Effect", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop" }
];

export default function Home() {
  const [featured, setFeatured] = useState<Tile[]>([]);
  const [newArrivals, setNewArrivals] = useState<Tile[]>([]);
  const [hasMounted, setHasMounted] = useState(false);
  
  const { data: session } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    requestAnimationFrame(() => {
      setHasMounted(true);
    });

    fetch("http://localhost:4000/tiles")
      .then((res) => res.json())
      .then((data: Tile[]) => {
        setFeatured(data.slice(0, 4)); 
        setNewArrivals(data.slice(-4).reverse());
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const handleCategoryClick = () => {
    if (!session) {
      toast.error("Please login to view details.");
      router.push("/login");
    } else {
      router.push("/all-tiles");
    }
  };

  if (!hasMounted) {
    return <div className="bg-white min-h-screen" />; 
  }

  return (
    <div className="bg-white text-gray-800 font-sans">
      
      <style dangerouslySetInnerHTML={{__html: `
        .swiper-slide .animate-box { opacity: 0; transform: translateY(50px); transition: all 1.2s cubic-bezier(0.2, 0.8, 0.2, 1); transition-delay: 0.4s; }
        .swiper-slide-active .animate-box { opacity: 1; transform: translateY(0); }
        .swiper-slide .bg-img { transform: scale(1); transition: transform 12s ease-out; }
        .swiper-slide-active .bg-img { transform: scale(1.15); }
      `}} />

      <Swiper modules={[Autoplay, EffectFade, Pagination]} effect="fade" speed={1500} pagination={{ clickable: true }} autoplay={{ delay: 3500, disableOnInteraction: false }} className="h-[85vh] md:h-[90vh] w-full overflow-hidden group">
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="h-full w-full relative flex flex-col justify-center items-center overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center bg-img" style={{ backgroundImage: `url('${slide.image}')` }}></div>
              <div className="absolute inset-0 bg-black/30"></div>
              <div className="relative z-10 text-center px-4 animate-box">
                <h1 className="text-5xl md:text-7xl font-serif mb-6 tracking-wide text-white drop-shadow-lg">{slide.title}</h1>
                <Link href="/all-tiles" className="btn bg-white text-black hover:bg-gray-200 border-none rounded-none px-10 py-3 uppercase text-sm tracking-widest font-bold shadow-xl transition-all hover:scale-105">Find Out More</Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="bg-gray-100 text-gray-500 py-2 border-y border-gray-200 overflow-hidden whitespace-nowrap text-xs">
        <div className="animate-[marquee_25s_linear_infinite] inline-block w-max">
          <span className="mx-6 font-semibold tracking-widest uppercase">🚀 New Arrivals: Celestis Gold | 🌟 Weekly Feature: Geometric Patterns | ✨ Join the Community!</span>
          <span className="mx-6 font-semibold tracking-widest uppercase">🚀 New Arrivals: Celestis Gold | 🌟 Weekly Feature: Geometric Patterns | ✨ Join the Community!</span>
        </div>
      </div>

      <section className="py-16 px-6 max-w-7xl mx-auto text-center">
        <h2 className="text-2xl font-bold uppercase tracking-widest mb-4">Discover The Best Tiles Collection</h2>
        <p className="text-gray-500 text-sm max-w-4xl mx-auto mb-10 leading-relaxed">Porcelain, ceramics, and marble, explore our latest collections featuring rich textures, precision, and balance. Choose a wide range for classic and modern styling concepts to ensure durability and elegance in your spaces.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {featured.map((tile) => (
            <div key={tile.id} className="group cursor-pointer text-left">
              <div className="overflow-hidden mb-3 border border-gray-100">
                <img src={tile.image} alt={tile.title} className="w-full h-48 object-cover group-hover:scale-105 transition duration-700" />
              </div>
              <h3 className="font-bold text-sm mb-1">{tile.title}</h3>
              <div className="w-8 h-0.5 bg-gray-300 mb-2"></div>
              <Link href={`/tile/${tile.id}`} className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition">View Details</Link>
            </div>
          ))}
        </div>
        <Link href="/all-tiles" className="btn btn-sm btn-outline rounded-none border-gray-400 uppercase tracking-widest px-6 text-xs mt-4">Advanced Search</Link>
      </section>

      {/* ============================================================== */}
      {/* NEW ARRIVALS SECTION */}
      {/* ============================================================== */}
      <section className="py-16 px-6 max-w-7xl mx-auto text-center border-t border-gray-100 bg-gray-50/50">
        <h2 className="text-2xl font-bold uppercase tracking-widest mb-10">New Arrivals</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {newArrivals.map((tile) => (
            <div key={tile.id} className="group text-left flex flex-col">
              <div className="overflow-hidden mb-4 relative shadow-sm border border-gray-50">
                <img src={tile.image} alt={tile.title} className="w-full h-65 object-cover group-hover:scale-105 transition duration-700" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-500"></div>
                <span className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 tracking-widest uppercase shadow-md">NEW</span>
              </div>
              <h3 className="font-bold text-[15px] mb-1.5 text-gray-900">{tile.title}</h3>
              <button 
                onClick={handleCategoryClick} 
                className="text-xs text-blue-600 hover:text-blue-800 uppercase tracking-widest mt-auto font-bold text-left transition-colors"
              >
                VIEW DETAILS
              </button>
            </div>
          ))}
        </div>
        
        <Link href="/all-tiles?filter=new" className="btn btn-neutral rounded-none bg-[#233249] hover:bg-[#151f2d] text-white px-10 py-3 uppercase tracking-widest text-xs shadow-lg transition-colors">
          Discover All New
        </Link>
      </section>

      <section className="py-16 px-6 max-w-7xl mx-auto text-center border-t border-gray-100">
        <h2 className="text-2xl font-bold uppercase tracking-widest mb-10">Explore Tiles Collections By Category</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {categories.map((cat, i) => (
            <div key={i} className="group text-left flex flex-col">
              <div className="overflow-hidden mb-4 relative shadow-sm border border-gray-50">
                <img src={cat.img} alt={cat.name} className="w-full h-65 object-cover group-hover:scale-105 transition duration-700" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-500"></div>
              </div>
              <h3 className="font-bold text-[15px] mb-1.5 text-gray-900">{cat.name}</h3>
              <button 
                onClick={handleCategoryClick} 
                className="text-xs text-blue-600 hover:text-blue-800 uppercase tracking-widest mt-auto font-bold text-left transition-colors"
              >
                VIEW DETAILS
              </button>
            </div>
          ))}
        </div>
        
        <Link href="/all-tiles" className="btn btn-neutral rounded-none bg-[#233249] hover:bg-[#151f2d] text-white px-10 py-3 uppercase tracking-widest text-xs shadow-lg transition-colors">Discover All</Link>
      </section>

      <section className="py-16 px-6 max-w-5xl mx-auto text-center border-t border-gray-100 mt-6">
        <h2 className="text-2xl font-bold uppercase tracking-widest mb-4">Why Choose Elegant Surfaces?</h2>
        <p className="text-gray-500 text-sm max-w-3xl mx-auto mb-12">We maintain rigorous manufacturing standards to ensure the highest quality ceramics. Our commitment to excellence, modern designs, and sustainable practices make us the leading choice for your interior solutions.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex flex-col items-center"><MdOutlineComputer className="text-5xl mb-3 text-gray-700" /><h3 className="font-bold text-sm uppercase">Latest Tech</h3></div>
          <div className="flex flex-col items-center"><FaRegBuilding className="text-5xl mb-3 text-gray-700" /><h3 className="font-bold text-sm uppercase">Display Center</h3></div>
          <div className="flex flex-col items-center"><FaMedal className="text-5xl mb-3 text-gray-700" /><h3 className="font-bold text-sm uppercase">Premium Quality</h3></div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 mb-16">
        <div className="w-full h-100 md:h-150 relative bg-cover bg-center flex items-center justify-center cursor-pointer group shadow-2xl" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1584622781867-1c140bf24ab7?q=80&w=1920&auto=format&fit=crop')" }}>
          <div className="absolute inset-0 bg-linear-to-r from-black/80 to-transparent"></div>
          <div className="absolute top-4 left-4 z-10 flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold text-xs text-black">ES</div><p className="text-white text-sm font-semibold">Technical Porcelain Tiles | Timeless Elegance</p></div>
          <div className="relative z-10 w-full flex justify-center md:justify-end md:pr-32 items-center">
             <div className="flex flex-col items-center md:items-end">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center hover:scale-110 transition shadow-xl mb-4 md:absolute md:left-1/2 md:-translate-x-1/2"><FaPlay className="text-white text-xl ml-1" /></div>
                <div className="text-right mt-20 md:mt-0"><h2 className="text-white text-2xl md:text-5xl font-serif drop-shadow-lg font-light italic">A SERIES OF</h2><h1 className="text-white text-4xl md:text-7xl font-sans font-bold tracking-widest drop-shadow-lg uppercase">Timeless<br/>Elegance</h1><p className="text-white text-sm md:text-md mt-4 tracking-wider bg-black/40 px-4 py-1 inline-block">SHOWCASING THE FEATURES OF TECHNICAL PORCELAIN</p></div>
             </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#f5f5f5] px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl font-bold uppercase tracking-widest mb-16">Popular</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center"><div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm"><RiHandCoinLine className="text-4xl text-gray-700" /></div><h3 className="font-bold text-sm uppercase mb-3">Care Guide</h3><p className="text-gray-500 text-xs leading-relaxed max-w-62.5">Learn tips to maintain the pristine look of your tiles.</p></div>
            <div className="flex flex-col items-center"><div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm"><MdOutlineHelpOutline className="text-4xl text-gray-700" /></div><h3 className="font-bold text-sm uppercase mb-3">FAQ & Info</h3><p className="text-gray-500 text-xs leading-relaxed max-w-62.5">Get all your questions answered.</p></div>
            <div className="flex flex-col items-center"><div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm"><MdOutlineArticle className="text-4xl text-gray-700" /></div><h3 className="font-bold text-sm uppercase mb-3">News & Events</h3><p className="text-gray-500 text-xs leading-relaxed max-w-62.5">Stay updated with our latest news.</p></div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* ✅ SUSTAINABILITY */}
      {/* ============================================================== */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold uppercase tracking-widest text-gray-900">Sustainability In Action</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 h-auto lg:h-125">
          
          <div className="w-full lg:w-[60%] relative group overflow-hidden rounded-2xl shadow-xl">
            <img src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Sustainable Architecture" />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent"></div>
            
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="bg-white/10 backdrop-blur-md p-8 rounded-full shadow-2xl border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-all duration-500">
                 <FaLeaf className="text-green-400 text-6xl drop-shadow-lg" />
               </div>
            </div>

            <div className="absolute bottom-8 left-8 right-8">
              <h3 className="text-white text-2xl md:text-3xl font-serif font-bold tracking-wide mb-2">Committed to the Earth.</h3>
              <p className="text-gray-300 text-sm font-medium tracking-wide">Pioneering zero-waste manufacturing processes.</p>
            </div>
          </div>

          <div className="w-full lg:w-[40%] flex flex-col gap-8 h-full">
            
            <div className="h-[45%] relative group overflow-hidden rounded-2xl shadow-lg">
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" alt="Green Interior" />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors duration-500"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                <span className="text-green-400 font-bold tracking-widest text-xs mb-2 uppercase drop-shadow-md">Our Vision</span>
                <h3 className="text-white font-bold tracking-widest text-xl uppercase border-b-2 border-green-400 pb-2 drop-shadow-md">Greener Tomorrow</h3>
              </div>
            </div>

            <div className="h-[55%] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 p-8 flex flex-col justify-center relative overflow-hidden group">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-green-50 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-500"></div>
              
              <h3 className="font-bold text-xl text-gray-900 mb-3 tracking-tight z-10">Our Purpose</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 z-10 pr-4">
                Sustainability is not just a buzzword. We actively reduce our carbon footprint, recycle water, and source eco-friendly raw materials to ensure a better world for future generations.
              </p>
              <button className="text-xs font-bold uppercase tracking-widest text-blue-600 hover:text-green-600 transition-colors text-left self-start z-10 flex items-center gap-2">
                Read Full Report &rarr;
              </button>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}