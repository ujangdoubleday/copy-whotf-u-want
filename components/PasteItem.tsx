'use client';

import { useState, useTransition } from 'react';
import { Paste } from '@/types/paste';
import { deletePaste } from '@/lib/actions';

interface PasteItemProps {
  paste: Paste;
}

export default function PasteItem({ paste }: PasteItemProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleDelete = () => {
    startTransition(async () => {
      await deletePaste(paste.id);
    });
  };

  return (
    <div className="bg-transparent rounded-lg sm:rounded-xl p-4 sm:p-6 border border-white/20 hover:border-white/40 transition-all">
      <div className="flex items-start justify-between gap-3 sm:gap-4">
        <div className="flex-1 min-w-0">
          <pre className="whitespace-pre-wrap break-words text-white font-mono text-xs sm:text-sm leading-relaxed">
            {paste.content}
          </pre>
          <p className="text-xs text-white/40 mt-3">
            {new Date(paste.createdAt).toLocaleString('en-US')}
          </p>
        </div>
        <div className="flex gap-1.5 sm:gap-2 flex-shrink-0">
          <button
            onClick={() => handleCopy(paste.content, paste.id)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors group focus:outline-none focus:ring-0"
            title="Copy"
          >
            {copiedId === paste.id ? (
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white/60 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </button>
          <button
            onClick={handleDelete}
            disabled={isPending}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors group focus:outline-none focus:ring-0 disabled:opacity-50"
            title="Delete"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white/60 group-hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
