import { useNavigate } from 'react-router';
import { useDraggable } from '@dnd-kit/core';
import { StickyNote } from 'lucide-react';

import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { Note } from '@/lib/interfaces';

import DeleteNote from './components/delete-note';

export default function DraggableNote({
	note,
	className = '',
}: {
	note: Note;
	className?: string;
}) {
	const navigate = useNavigate();
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: note.id,
	});

	return (
		<ContextMenu>
			<ContextMenuTrigger>
				<div
					ref={setNodeRef}
					{...attributes}
					{...listeners}
					className={`flex items-center px-2 text-sm rounded-md cursor-pointer py-1 ${className} hover:bg-accent`}
					onClick={() => navigate(`/note/${note.id}`)}
					style={{
						transform: transform
							? `translate3d(${transform.x}px, ${transform.y}px, 0)`
							: 'none',
					}}>
					<StickyNote className='h-4 w-4 mr-2' />
					<span>{note.title}</span>
				</div>
			</ContextMenuTrigger>
			<ContextMenuContent className='w-40 p-1 shadow-md rounded-lg border'>
				<ContextMenuItem asChild>
					<DeleteNote note={note} />
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	);
}
