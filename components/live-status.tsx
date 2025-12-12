'use client';

export function LiveStatus() {
  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        LIVE BLOCKCHAIN
      </div>
    </div>
  );
}