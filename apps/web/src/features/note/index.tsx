import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useLiveQuery } from 'dexie-react-hooks';
import { ArrowRight } from 'lucide-react';

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import { db } from '@/lib/db';
import EditableNote from './components/editable-note';
import EditNote from './edit-note';

export default function Note() {
	const { id } = useParams<{ id: string }>();
	const note = useLiveQuery(async () => {
		if (!id) return null;
		return await db.notes.get(id);
	}, [id]);

	useEffect(() => {
		if (id) {
			localStorage.setItem('lastViewed', JSON.stringify(id));
		}
	}, [id]);

	if (!note) {
		return;
	}

	return (
		<div className='py-4 px-2'>
			<div className='flex justify-between'>
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>Notes</BreadcrumbItem>
						<BreadcrumbSeparator>
							<ArrowRight />
						</BreadcrumbSeparator>
						<BreadcrumbItem>{note.title}</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
				<p className='text-muted-foreground'>{note.date}</p>
			</div>
			<section className='flex flex-col py-4 gap-4'>
				<span className='flex justify-between'>
					<h1 className='font-semibold text-3xl'>{note.title}</h1>
					<EditNote note={note} />
				</span>
				<h3 className='text-xl backdrop-opacity-95'>{note.description}</h3>
				<div className='text-muted-foreground text-justify'>
					<EditableNote noteId={id as string} />
				</div>
			</section>
		</div>
	);
}
