import { useRef } from 'react';
import { useNavigate } from 'react-router';
import { nanoid } from 'nanoid';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

import { db } from '@/lib/db';
import { getCurrentDate } from '@/lib/utils';

export default function NewNote({
	isOpen,
	onOpenChange,
}: {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
}) {
	const navigate = useNavigate();
	const noteTitleRef = useRef<HTMLInputElement>(null);
	const noteDescriptionRef = useRef<HTMLInputElement>(null);

	const onCreateNote = async () => {
		if (!noteTitleRef.current?.value || !noteDescriptionRef.current?.value) {
			return;
		}

		const note = {
			id: nanoid(),
			title: noteTitleRef.current.value,
			description: noteDescriptionRef.current.value,
			date: getCurrentDate(),
		};

		await db.notes.add(note);
		onOpenChange(false);
		navigate(`/note/${note.id}`);
	};

	return (
		<Dialog
			open={isOpen}
			onOpenChange={onOpenChange}>
			<DialogContent className='sm:max-w-sm'>
				<DialogHeader>
					<DialogTitle>Note info</DialogTitle>
					<DialogDescription>Make it catchy :]</DialogDescription>
				</DialogHeader>
				<div className='grid gap-2'>
					<div className='grid gap-2'>
						<label
							htmlFor='title'
							className='text-sm font-medium'>
							Title
						</label>
						<Input
							id='title'
							type='text'
							ref={noteTitleRef}
							placeholder='Node.js'
							required={true}
						/>
					</div>
					<div className='grid gap-2'>
						<label
							htmlFor='description'
							className='text-sm font-medium'>
							Description
						</label>
						<Input
							id='description'
							type='text'
							ref={noteDescriptionRef}
							placeholder='Aczkolwiek za kazdym razem [...]'
							required={true}
						/>
					</div>
				</div>
				<DialogFooter className='sm:justify-end'>
					<DialogClose asChild>
						<Button
							type='submit'
							variant='default'
							onClick={onCreateNote}>
							Create
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
