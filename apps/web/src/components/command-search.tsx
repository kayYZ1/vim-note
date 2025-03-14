import { Cloud, Keyboard, Settings, StickyNote } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useLiveQuery } from 'dexie-react-hooks';

import { db } from '@/lib/db';
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from '@/components/ui/command';

export default function CommandSearch({
	isOpen,
	onOpenChange,
}: {
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
}) {
	const navigate = useNavigate();

	const notes = useLiveQuery(() => db.notes.toArray());
	if (!notes) {
		return;
	}

	return (
		<CommandDialog
			open={isOpen}
			onOpenChange={onOpenChange}>
			<CommandInput placeholder='Search ...' />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup heading='Notes'>
					{notes.map((note) => (
						<CommandItem
							key={note.id}
							onSelect={() => navigate(`/note/${note.id}`)}>
							<StickyNote className='mr-2 h-4 w-4' />
							<span>{note.title}</span>
						</CommandItem>
					))}
				</CommandGroup>
				<CommandSeparator />
				<CommandGroup heading='Settings'>
					<CommandItem onSelect={() => navigate('/settings')}>
						<Settings className='mr-2 h-4 w-4' />
						<span>Settings</span>
					</CommandItem>
					<CommandItem onSelect={() => navigate('/settings/sync')}>
						<Cloud className='mr-2 h-4 w-4' />
						<span>Synchronization</span>
					</CommandItem>
					<CommandItem onSelect={() => navigate('/settings/bindings')}>
						<Keyboard className='mr-2 h-4 w-4' />
						<span>Bindings</span>
					</CommandItem>
				</CommandGroup>
			</CommandList>
		</CommandDialog>
	);
}
