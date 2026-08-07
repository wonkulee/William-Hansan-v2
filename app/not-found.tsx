export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-zinc-900 px-6 py-24">
      <h1 className="text-4xl font-light tracking-tight mb-4">404 - Page Not Found</h1>
      <p className="text-zinc-500 mb-8 font-light">The page you are looking for does not exist.</p>
      <a 
        href="/" 
        className="px-6 py-3 border border-zinc-900 text-xs uppercase tracking-widest text-zinc-900 hover:bg-zinc-900 hover:text-white transition-colors"
      >
        Return Home
      </a>
    </div>
  );
}
