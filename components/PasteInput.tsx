'use client';

import { useState, useTransition } from 'react';
import { createPaste } from '@/lib/actions';

export default function PasteInput() {
  const [content, setContent] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    startTransition(async () => {
      const result = await createPaste(content);
      if (result.success) {
        setContent('');
      }
    });
  };

  return (
    <div className="bg-transparent rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-white/20">
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Paste or type something here..."
          className="w-full h-32 sm:h-40 px-3 sm:px-4 py-2 sm:py-3 border border-white/30 rounded-lg bg-transparent text-white placeholder-white/40 focus:outline-none focus:ring-0 focus:border-white resize-none text-sm sm:text-base"
        />
        <button
          type="submit"
          disabled={isPending || !content.trim()}
          className="mt-4 w-full bg-white hover:bg-white/80 text-black font-medium py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white focus:outline-none focus:ring-0 text-sm sm:text-base"
        >
          {isPending ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
}
