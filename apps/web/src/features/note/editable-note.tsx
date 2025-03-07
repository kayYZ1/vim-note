import { useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkBreaks from 'remark-breaks';

import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';

import { useNote } from './hooks/use-note';
import { useAI } from './hooks/use-ai';
import { useShortcuts } from './hooks/use-shortcuts';
import { useImageUpload } from './hooks/use-image-upload';
import NoteActions from './components/note-actions';
import { mdComponents } from './components/md-components';

export default function EditableNote({ noteId }: { noteId: string }) {
	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	const { content, setContent, isEditing, setIsEditing, saveNote, clearNote } =
		useNote(noteId);

	const { isGenerating, generateContent, cleanup: cleanupAI } = useAI();

	const { fileInputRef, handleImageUpload, triggerImageUpload } =
		useImageUpload({
			onError: (message) => toast.error(message),
		});

	// Handle keyboard shortcuts
	const { handleKeyDown } = useShortcuts({
		onEscape: async () => {
			setIsEditing(false);
			await saveNote();
		},
		onInsertMode: () => setIsEditing(true),
		isEditing,
		textAreaRef,
	});

	const handleGenerateAI = () => {
		if (isGenerating) {
			cleanupAI();
			return;
		}

		// Store original content
		const originalContent = content;

		generateContent(
			originalContent,
			(generatedText: string) => {
				setContent(originalContent + '\n\n' + generatedText);
			},
			async (finalGeneratedText: string) => {
				// Save the final content
				const finalContent = originalContent + '\n\n' + finalGeneratedText;
				setContent(finalContent);
				await saveNote(finalContent);
			}
		);
	};

	const handleImageSelected = async (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = e.target.files?.[0];
		if (!file) return;

		if (!isEditing) {
			setIsEditing(true);
			// Small delay to make sure the textarea is rendered
			await new Promise((resolve) => setTimeout(resolve, 50));
		}

		// Get cursor position
		const textArea = textAreaRef.current;
		const cursorPosition = textArea ? textArea.selectionEnd : content.length;

		const newContent = await handleImageUpload(file, content, cursorPosition);

		if (newContent) {
			setContent(newContent);
			await saveNote(newContent);
			toast.success('Image inserted successfully');

			// Reset file input to allow selecting the same file again
			if (fileInputRef.current) {
				fileInputRef.current.value = '';
			}
		}
	};

	useEffect(() => {
		const textArea = textAreaRef.current;
		const adjustHeight = () => {
			if (textArea) {
				textArea.style.height = 'auto';
				textArea.style.height = `${textArea.scrollHeight}px`;
			}
		};

		textArea?.addEventListener('input', adjustHeight);
		adjustHeight();

		return () => {
			textArea?.removeEventListener('input', adjustHeight);
		};
	}, [isEditing]);

	return (
		<div className='w-full h-full'>
			<input
				type='file'
				ref={fileInputRef}
				style={{ display: 'none' }}
				accept='image/*'
				onChange={handleImageSelected}
			/>
			<NoteActions
				onGenerateAI={handleGenerateAI}
				onImageUpload={triggerImageUpload}
				onClearNote={clearNote}
				isGenerating={isGenerating}>
				<div className='relative w-full'>
					<div className='absolute top-0 right-0 text-xs rounded-bl-md z-10'>
						{isGenerating
							? '---GENERATING---'
							: isEditing
								? '---INSERT MODE---'
								: '---PREVIEW MODE---'}
					</div>

					{isEditing && !isGenerating ? (
						<textarea
							ref={textAreaRef}
							value={content}
							onChange={(e) => setContent(e.target.value)}
							className='w-full h-full min-h-96 text-base focus:outline-none focus:border-transparent resize-none overflow-hidden break-words'
							onKeyDown={handleKeyDown}
							onBlur={async () => {
								setIsEditing(false);
								await saveNote();
							}}
						/>
					) : (
						<div className='prose prose-sm w-full break-words'>
							<ReactMarkdown
								remarkPlugins={[remarkGfm, remarkBreaks, remarkMath]}
								rehypePlugins={[rehypeKatex]}
								components={mdComponents}>
								{content}
							</ReactMarkdown>
						</div>
					)}
				</div>
			</NoteActions>
			<Toaster />
		</div>
	);
}
