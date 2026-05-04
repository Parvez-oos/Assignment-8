"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function UpdateProfile() {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  // State management
  const [name, setName] = useState(() => session?.user?.name ?? "");
  const [image, setImage] = useState(() => session?.user?.image ?? "");
  const [mobile, setMobile] = useState("");
  const [age, setAge] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");
  const [permanentAddress, setPermanentAddress] = useState("");

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const loadingToast = toast.loading("Updating profile...");

    const { error } = await authClient.updateUser({
      name,
      image,
      // @ts-expect-error: custom fields are not part of the default auth schema
      mobile,
      age,
      currentAddress,
      permanentAddress
    });

    if (error) {
      toast.error(error.message ?? "Update failed", {
        id: loadingToast,
      });
    } else {
      toast.success("Profile Updated Successfully!", {
        id: loadingToast,
      });
      router.push("/my-profile");
    }
  };

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center p-4 md:p-10 bg-cover bg-center bg-no-repeat transition-all"
      style={{ 
        backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069')" 
      }}
    >
      
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>

      <div className="relative w-full max-w-3xl bg-white/95 backdrop-blur-md shadow-2xl rounded-3xl overflow-hidden border border-white/20">
        <div className="p-6 md:p-12">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-800 border-b pb-4">Update Profile</h2>
            <p className="text-gray-500 mt-2 text-sm italic">Please fill in the details you wish to change.</p>
          </div>

          <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            
            
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-600 ml-1">Full Name</label>
              <input
                type="text"
                placeholder="e.g. Shawal Shawon"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-600 ml-1">Mobile Number</label>
              <input
                type="tel"
                placeholder="+880 1XXX-XXXXXX"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>

            
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-600 ml-1">Age</label>
              <input
                type="number"
                placeholder="Years"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-600 ml-1">Profile Image URL</label>
              <input
                type="url"
                placeholder="https://..."
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>

            
            <div className="md:col-span-2 flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-600 ml-1">Current Address</label>
              <textarea
                placeholder="Enter your current residential address"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all min-h-20 resize-none"
                value={currentAddress}
                onChange={(e) => setCurrentAddress(e.target.value)}
              />
            </div>

            
            <div className="md:col-span-2 flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-600 ml-1">Permanent Address</label>
              <textarea
                placeholder="Enter your permanent address"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all min-h-20 resize-none"
                value={permanentAddress}
                onChange={(e) => setPermanentAddress(e.target.value)}
              />
            </div>

            
            <div className="md:col-span-2 pt-6 flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/30 transition-all active:scale-[0.98]"
              >
                Update Profile Now
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="px-8 py-4 text-gray-500 hover:text-gray-800 hover:bg-gray-100 font-semibold rounded-2xl transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}