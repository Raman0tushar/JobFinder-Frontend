import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-8xl md:text-9xl font-extrabold text-indigo-600 mb-4">404</h1>
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Page Not Found</h2>
      <p className="text-xl text-gray-600 mb-10 max-w-lg">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-indigo-600 text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-indigo-700 transition shadow-lg"
      >
        Back to Home
      </Link>
    </div>
  );
}