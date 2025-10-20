export default function LoadingPastes() {
  return (
    <div className="space-y-3 sm:space-y-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-transparent rounded-lg sm:rounded-xl p-4 sm:p-6 border border-white/20 animate-pulse"
        >
          <div className="flex items-start justify-between gap-3 sm:gap-4">
            <div className="flex-1">
              <div className="h-4 bg-white/10 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-white/10 rounded w-1/2"></div>
              <div className="h-3 bg-white/10 rounded w-24 mt-3"></div>
            </div>
            <div className="flex gap-1.5 sm:gap-2">
              <div className="w-9 h-9 bg-white/10 rounded-lg"></div>
              <div className="w-9 h-9 bg-white/10 rounded-lg"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
