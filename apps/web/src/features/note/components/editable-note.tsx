import { useRef, useEffect, useState, KeyboardEvent } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import NoteActions from './note-actions';

export default function EditableNote() {
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const [content, setContent] = useState('**Hello** _World_!');
	const [isEditing, setIsEditing] = useState(true);

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Tab') {
			setIsEditing(false);
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
	}, []);

	return (
		<div
			className='w-full h-full'
			onKeyDown={handleKeyDown}>
			<NoteActions>
				{isEditing ? (
					<textarea
						ref={textAreaRef}
						value={content}
						onChange={(e) => setContent(e.target.value)}
						onBlur={() => setIsEditing(false)}
						autoFocus
						className='w-full h-full min-h-400 text-base rounded-md focus:outline-none focus:border-transparent resize-none overflow-hidden'
					/>
				) : (
					<div
						className='prose prose-sm max-w-none'
						onClick={() => setIsEditing(true)}>
						<ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
					</div>
				)}
			</NoteActions>
		</div>
	);
}
