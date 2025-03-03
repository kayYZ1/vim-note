import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { toast } from 'sonner';
import { db } from '@/lib/db';

export function useNote(noteId: string) {
	const [content, setContent] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [isEditing, setIsEditing] = useState(true);

	// Fetch note content
	useLiveQuery(async () => {
		try {
			setIsLoading(true);
			const note = await db.notes.get(noteId);
			if (note && note.content) {
				setContent(note.content);
			} else {
				setContent('Start typing...');
			}
		} catch (error) {
			console.error(error);
			toast.error('Failed to fetch note content');
		} finally {
			setIsLoading(false);
		}
	}, [noteId]);

	// Save note content
	const saveNote = async (newContent = content) => {
		try {
			await db.notes.update(noteId, { content: newContent });
			return true;
		} catch (error) {
			console.error(error);
			toast.error('Failed to save note');
			return false;
		}
	};

	return {
		content,
		setContent,
		isLoading,
		isEditing,
		setIsEditing,
		saveNote,
	};
}
