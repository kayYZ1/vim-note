import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { db } from '@/lib/db';

export default function DeleteNote({ noteId }: { noteId: string }) {
	/* 
    ToDo: This needs to remove folders from notes if nested also clear up the images left in the database
  */

	return (
		<Dialog>
			<DialogTrigger asChild>
				<span
					className='flex items-center gap-3 px-3 py-2 text-sm cursor-pointer transition-colors rounded-md'
					id='delete-note'>
					<Trash2 className='h-5 w-5' />
					Delete note
				</span>
			</DialogTrigger>
			<DialogContent className='sm:max-w-sm'>
				<DialogHeader>
					<DialogTitle>Delete Note</DialogTitle>
					<DialogDescription>
						Are you sure you want to delete this note?
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className='sm:justify-end'>
					<DialogClose asChild>
						<Button
							type='submit'
							variant='default'
							onClick={async () => await db.notes.delete(noteId)}>
							Delete
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
