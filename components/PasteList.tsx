import { getPastes } from '@/lib/actions';
import PasteItem from '@/components/PasteItem';

export default async function PasteListServer() {
  const pastes = await getPastes();

  if (pastes.length === 0) {
    return (
      <div className="text-center py-12 sm:py-16 bg-transparent rounded-xl sm:rounded-2xl border border-white/20">
        <div className="text-white/30 mb-2">
          <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p className="text-sm sm:text-base text-white/40">
          No data yet. Start by adding text above.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {pastes.map((paste) => (
        <PasteItem key={paste.id} paste={paste} />
      ))}
    </div>
  );
}
