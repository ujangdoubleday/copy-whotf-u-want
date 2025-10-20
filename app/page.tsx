import { Suspense } from 'react';
import PasteInput from '@/components/PasteInput';
import PasteListServer from '@/components/PasteList';
import LoadingPastes from '@/components/LoadingPastes';

export default function Home() {
  return (
    <div className="min-h-screen bg-black py-4 sm:py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <PasteInput />
        
        <Suspense fallback={<LoadingPastes />}>
          <PasteListServer />
        </Suspense>
      </div>
    </div>
  );
}
