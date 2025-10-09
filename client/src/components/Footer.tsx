import { Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="relative py-8 px-6 border-t border-slate-800">
      <div className="absolute inset-0 bg-slate-900" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center space-y-4">
          <p className="text-slate-400 flex items-center justify-center gap-2">
            Built with
            <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
            by <span className="text-cyan-400 font-semibold">Amol Shende</span>
          </p>
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
