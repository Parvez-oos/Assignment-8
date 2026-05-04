import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-xl mt-4 text-gray-600">Oops! Page not found.</p>
      <Link href="/" className="btn btn-neutral mt-6">Return Home</Link>
    </div>
  );
}