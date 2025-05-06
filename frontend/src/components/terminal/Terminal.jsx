export function Terminal({ children }) {
  return (
    <div className="w-full max-w-3xl bg-black text-white rounded-xl overflow-hidden h-96 shadow-lg font-mono">
      <div className="flex items-center px-4 py-3 bg-zinc-800 border-b border-zinc-700">
        <div className="flex space-x-2">
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
          <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
        </div>
      </div>
      <div className="p-4 space-y-1 text-sm">{children}</div>
    </div>
  );
}
