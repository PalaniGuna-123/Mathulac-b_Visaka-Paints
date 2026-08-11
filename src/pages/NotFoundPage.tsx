import { Link } from '../routes/Router';
import { Home } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-5 py-24 text-center">
      <div className="max-w-md">
        <div className="font-display text-8xl md:text-9xl text-magenta font-extrabold tracking-tighter">
          404
        </div>
        <h2 className="font-display text-3xl md:text-4xl text-white mt-4">Page Not Found</h2>
        <p className="text-white/65 mt-3 text-sm leading-relaxed">
          The page you are looking for might have been moved, renamed, or does not exist.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold bg-magenta hover:bg-hotpink text-white shadow-xl transition-all"
          >
            <Home className="w-4 h-4" /> Back to Home
          </Link>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold glass text-white hover:bg-white/20 transition-all"
          >
            View Products
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
