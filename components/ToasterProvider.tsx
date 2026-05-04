"use client";

import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

export default function ToasterProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  if (!isMounted) return null;

  return <Toaster position="top-center" />;
}