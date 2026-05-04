import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-[#1a202c] text-gray-300 py-16 text-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        
        
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-wider flex items-center gap-2">
            <span className="text-4xl">E</span> Elegant <br /> Surfaces
          </h2>
          <p className="text-gray-400 mt-4">FOLLOW US</p>
          <div className="flex gap-4 text-lg">
            <a href="#" className="p-2 border border-gray-600 rounded-full hover:bg-white hover:text-black transition"><FaFacebookF /></a>
            <a href="#" className="p-2 border border-gray-600 rounded-full hover:bg-white hover:text-black transition"><FaTwitter /></a>
            <a href="#" className="p-2 border border-gray-600 rounded-full hover:bg-white hover:text-black transition"><FaInstagram /></a>
            <a href="#" className="p-2 border border-gray-600 rounded-full hover:bg-white hover:text-black transition"><FaLinkedinIn /></a>
          </div>
          <div className="mt-6 space-y-2 text-gray-400">
            <p className="flex items-center gap-2"><FiPhone /> + 800099005</p>
            <p className="flex items-center gap-2"><MdEmail /> info@ceramics.com</p>
          </div>
        </div>

        
        <div>
          <h3 className="text-white font-semibold mb-4 uppercase tracking-widest">Collections</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white transition">All Products</a></li>
            <li><a href="#" className="hover:text-white transition">Onyx Effect</a></li>
            <li><a href="#" className="hover:text-white transition">Display Order</a></li>
            <li><a href="#" className="hover:text-white transition">Classic Profile</a></li>
            <li><a href="#" className="hover:text-white transition">Latest Collection</a></li>
            <li><a href="#" className="hover:text-white transition">Special Occasions</a></li>
          </ul>
        </div>

        
        <div>
          <h3 className="text-white font-semibold mb-4 uppercase tracking-widest">About Us</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white transition">About Us</a></li>
            <li><a href="#" className="hover:text-white transition">Who Choose Us</a></li>
            <li><a href="#" className="hover:text-white transition">News and Events</a></li>
            <li><a href="#" className="hover:text-white transition">FAQ</a></li>
            <li><a href="#" className="hover:text-white transition">Our Projects</a></li>
          </ul>
        </div>

        
        <div>
          <h3 className="text-white font-semibold mb-4 uppercase tracking-widest">Resources</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
            <li><a href="#" className="hover:text-white transition">Store Locator</a></li>
            <li><a href="#" className="hover:text-white transition">Tile Calculator</a></li>
          </ul>
        </div>

       
        <div>
          <h3 className="text-white font-semibold mb-4 uppercase tracking-widest">Corporate Office</h3>
          <p className="text-gray-400 leading-relaxed mb-4">
            204/ Plot 1 Floor 5 Block 02,<br />
            Gulshan Avenue Ext, Bangladesh.
          </p>
          <h3 className="text-white font-semibold mb-2 uppercase tracking-widest mt-6">Factory</h3>
          <p className="text-gray-400 leading-relaxed">
            Damua Palapar, Sreepur<br />
            Bangladesh.
          </p>
        </div>

      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center text-gray-500">
        <p>© 2023 Elegant Surfaces Limited. All rights reserved.</p>
        <p>Privacy Policy — Terms and Conditions</p>
      </div>
    </footer>
  );
}