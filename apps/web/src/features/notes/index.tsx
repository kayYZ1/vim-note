import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import {
	DndContext,
	DragEndEvent,
	DragStartEvent,
	DragOverlay,
	closestCenter,
	useSensors,
	useSensor,
	PointerSensor,
} from '@dnd-kit/core';
import clsx from 'clsx';

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { db } from '@/lib/db';
import { Note } from '@/lib/interfaces';

import PrimaryMenu from './primary-menu';
import SecondaryMenu from './secondary-menu';
import DraggableNote from './draggable-note';
import DroppableArea from './components/droppable-area';

export default function Notes() {
	const [activeNote, setActiveNote] = useState<Note | null>(null);

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		})
	);

	const folders = useLiveQuery(() => db.folders.toArray());
	const notes = useLiveQuery(() => db.notes.toArray());

	if (!folders || !notes) return;

	const folderNoteIds = new Set(
		folders.flatMap((folder) => folder.notes.map((note) => note.id))
	);
	const singleNotes = notes.filter((note) => !folderNoteIds.has(note.id));

	const handleDragStart = (event: DragStartEvent) => {
		const noteId = event.active.id as string;

		const note = notes.find((n) => n.id === noteId);
		if (!note) return;

		setActiveNote(note);
	};

	const handleDragEnd = async (event: DragEndEvent) => {
		const { active, over } = event;
		if (!over) return;

		setActiveNote(null);

		const noteId = active.id as string;
		const targetFolderId = over.id as string;

		const sourceFolder = await db.folders
			.filter((folder) => folder.notes.some((note) => note.id === noteId))
			.first();

		if (sourceFolder) {
			sourceFolder.notes = sourceFolder.notes.filter(
				(note) => note.id !== noteId
			);
			await db.folders.put(sourceFolder);
		}

		if (targetFolderId !== 'root') {
			const targetFolder = await db.folders.get(targetFolderId);
			if (!targetFolder) return;

			const note = await db.notes.get(noteId);
			if (!note) return;

			targetFolder.notes.push(note);
			await db.folders.put(targetFolder);
		}
	};

	return (
		<DndContext
			collisionDetection={closestCenter}
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
			sensors={sensors}>
			<nav className='flex flex-col space-y-4 mt-6 flex-1'>
				<div
					className='space-y-2'
					id='notes-list'>
					<div className='flex items-center justify-between px-2 text-sm text-muted-foreground'>
						<span>Notes</span>
						<PrimaryMenu />
					</div>
					<Accordion type='multiple'>
						{folders.map((folder) => (
							<AccordionItem
								value={folder.name}
								key={folder.id}
								className='border-0'
								id='folder'>
								<AccordionTrigger className='px-2 text-sm'>
									<SecondaryMenu {...folder} />
								</AccordionTrigger>
								<AccordionContent className='relative px-6 before:absolute before:left-3.5 before:top-0 before:bottom-0 before:w-[2px] before:bg-gray-400 before:opacity-30'>
									<DroppableArea id={folder.id}>
										{folder.notes.length !== 0 ? (
											folder.notes.map((note) => (
												<DraggableNote
													key={note.id}
													note={note}
												/>
											))
										) : (
											<p className='p-4'>No notes</p>
										)}
									</DroppableArea>
								</AccordionContent>
							</AccordionItem>
						))}
						<DroppableArea id='root'>
							{singleNotes.map((note) => (
								<DraggableNote
									key={note.id}
									note={note}
								/>
							))}
						</DroppableArea>
					</Accordion>
				</div>
			</nav>
			<DragOverlay>
				{activeNote && (
					<DraggableNote
						note={activeNote}
						className={clsx(
							'border-2 shadow-lg opacity-90 pointer-events-none select-none',
							'border-gray-300 dark:border-gray-700',
							'bg-white dark:bg-gray-800'
						)}
					/>
				)}
			</DragOverlay>
		</DndContext>
	);
}
