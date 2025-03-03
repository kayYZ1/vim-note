import { useEffect, RefObject, KeyboardEvent } from 'react';

interface NoteKeyboardShortcutsProps {
	onEscape: () => void;
	onInsertMode: () => void;
	isEditing: boolean;
	textAreaRef: RefObject<HTMLTextAreaElement | null>;
}

export function useShortcuts({
	onEscape,
	onInsertMode,
	isEditing,
	textAreaRef,
}: NoteKeyboardShortcutsProps) {
	// Handle textarea key events
	const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Escape') {
			e.preventDefault();
			onEscape();
		}
	};

	// Handle global key events
	useEffect(() => {
		const handleDocumentKeyDown = (e: globalThis.KeyboardEvent) => {
			if (e.target === document.body) {
				if (e.key === 'i' || e.key === 'I') {
					e.preventDefault();
					onInsertMode();
				} else if (e.key === 'Escape') {
					e.preventDefault();
					onEscape();
				}
			}
		};

		document.addEventListener('keydown', handleDocumentKeyDown);
		return () => {
			document.removeEventListener('keydown', handleDocumentKeyDown);
		};
	}, [onEscape, onInsertMode]);

	useEffect(() => {
		if (isEditing && textAreaRef.current) {
			textAreaRef.current.focus();
		}
	}, [isEditing, textAreaRef]);

	return { handleKeyDown };
}
