"use client";
import { useEffect, useState, use } from "react";


interface Tile {
  id: string | number;
  title: string;
  image: string;
  price: number;
  currency: string;
  description: string;
  creator: string;
  style: string;
  dimensions: string;
  material: string;
  tags?: string[];
}


interface PageProps {
  params: Promise<{ id: string }>;
}

export default function TileDetails({ params }: PageProps) {
  // 3. Unwrap the params promise
  const resolvedParams = use(params);
  
  // 4. Set the state type to Tile | null
  const [tile, setTile] = useState<Tile | null>(null);

  useEffect(() => {
    fetch(`http://localhost:4000/tiles/${resolvedParams.id}`)
      .then(res => res.json())
      .then((data: Tile) => setTile(data))
      .catch(err => console.error("Error fetching tile:", err));
  }, [resolvedParams.id]);

  if (!tile) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 min-h-screen">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Visuals - Left */}
        <div className="w-full md:w-1/2">
          <img src={tile.image} alt={tile.title} className="w-full h-125 object-cover shadow-lg" />
        </div>
        
        {/* Info - Right */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">{tile.title}</h1>
          <p className="text-xl text-gray-600 mb-6 font-semibold">
            ${tile.price} {tile.currency}
          </p>
          <p className="text-gray-700 mb-4">{tile.description}</p>
          
          <div className="space-y-3 mt-4 border-t pt-4">
            <p><span className="font-bold">Creator:</span> {tile.creator}</p>
            <p><span className="font-bold">Style:</span> {tile.style}</p>
            <p><span className="font-bold">Dimensions:</span> {tile.dimensions}</p>
            <p><span className="font-bold">Material:</span> {tile.material}</p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {tile.tags?.map((tag, index) => (
              <span key={index} className="badge badge-neutral rounded-none p-3">
                {tag}
              </span>
            ))}
          </div>
          
          <button className="btn btn-primary rounded-none mt-8 w-48">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}