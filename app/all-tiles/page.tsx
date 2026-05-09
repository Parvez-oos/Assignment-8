"use client";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";


interface Tile {
  id: string | number;
  title: string;
  image: string;
  description?: string;
}


function GalleryContent() {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setLoading(true);
  };

  useEffect(() => {
    
    fetch("/api/tiles")
      .then((res) => res.json())
      .then((data: Tile[]) => { 
        
        let processedData = data;

        
        if (search) {
          
          processedData = data.filter(tile => 
            tile.title.toLowerCase().includes(search.toLowerCase())
          );
        } else if (filter === "new") {
          
          processedData = data.slice(-12).reverse();
        }

        setTiles(processedData);
        setLoading(false); 
      })
      .catch((err) => {
        console.error("Error fetching tiles:", err);
        setLoading(false); 
      });
  }, [search, filter]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8">
        {filter === "new" && !search ? "New Arrivals" : "The Gallery"}
      </h1>
      
      <div className="flex justify-center mb-10">
        <input 
          type="text" 
          placeholder="Search by title..." 
          className="input input-bordered w-full max-w-lg rounded-none shadow-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none"
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      {loading ? (
        <div className="flex justify-center"><span className="loading loading-spinner loading-lg text-blue-600"></span></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tiles.map((tile) => (
            <div key={tile.id} className="card bg-base-100 shadow-md rounded-none border group">
              <figure className="overflow-hidden bg-gray-50">
                <img src={tile.image} alt={tile.title} className="h-56 w-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </figure>
              <div className="card-body p-5">
                <h2 className="card-title text-md text-gray-900 font-bold">{tile.title}</h2>
                <div className="card-actions justify-end mt-4">
                  <Link href={`/tile/${tile.id}`} className="btn btn-sm btn-neutral bg-gray-900 hover:bg-black rounded-none w-full text-white tracking-widest uppercase text-xs shadow-md">
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
          {/* Fallback if no tiles found */}
          {tiles.length === 0 && (
             <div className="col-span-full text-center text-gray-500 py-10 flex flex-col items-center">
                <span className="text-4xl mb-4">🔍</span>
                <p>No tiles found matching your criteria.</p>
             </div>
          )}
        </div>
      )}
    </div>
  );
}


export default function AllTiles() {
  return (
    <Suspense fallback={<div className="flex justify-center min-h-screen items-center"><span className="loading loading-spinner loading-lg text-blue-600"></span></div>}>
      <GalleryContent />
    </Suspense>
  );
}