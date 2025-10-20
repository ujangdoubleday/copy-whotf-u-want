'use server';

import { revalidatePath } from 'next/cache';
import { redis } from '@/lib/redis';
import { Paste } from '@/types/paste';

const PASTES_KEY = 'pastes';

export async function getPastes(): Promise<Paste[]> {
  try {
    const data = await redis.hgetall(PASTES_KEY);
    
    // convert hash to array and sort by createdAt (newest first)
    const pastes: Paste[] = Object.values(data)
      .map(item => JSON.parse(item as string))
      .sort((a, b) => b.createdAt - a.createdAt);

    return pastes;
  } catch (error) {
    console.error('Get pastes error:', error);
    return [];
  }
}

export async function createPaste(content: string) {
  try {
    if (!content || content.trim() === '') {
      return { error: 'Content is required' };
    }

    const id = Date.now().toString();
    const paste: Paste = {
      id,
      content: content.trim(),
      createdAt: Date.now(),
    };

    await redis.hset(PASTES_KEY, id, JSON.stringify(paste));
    
    revalidatePath('/');
    
    return { success: true, paste };
  } catch (error) {
    console.error('Create paste error:', error);
    return { error: 'Failed to create paste' };
  }
}

export async function deletePaste(id: string) {
  try {
    if (!id) {
      return { error: 'ID is required' };
    }

    await redis.hdel(PASTES_KEY, id);
    
    revalidatePath('/');
    
    return { success: true };
  } catch (error) {
    console.error('Delete paste error:', error);
    return { error: 'Failed to delete paste' };
  }
}
