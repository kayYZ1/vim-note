import { Cloud, Keyboard, Notebook, Settings } from 'lucide-react';
import { useLiveQuery } from 'dexie-react-hooks';

import { db } from '@/lib/db';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from '@/components/ui/command';

export default function CommandSearch() {
	const notes = useLiveQuery(() => db.notes.toArray());

	if (!notes) {
		return;
	}

	return (
		<div className='fixed inset-x-0 top-20 z-50 flex justify-center'>
			<Command className='rounded-lg border shadow-md w-md'>
				<CommandInput placeholder='Type a command or search...' />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading='Suggestions'>
						{notes.map((note) => (
							<CommandItem key={note.id}>
								<Notebook className='mr-2 h-4 w-4' />
								<span>{note.title}</span>
							</CommandItem>
						))}
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading='Settings'>
						<CommandItem>
							<Settings className='mr-2 h-4 w-4' />
							<span>Settings</span>
						</CommandItem>
						<CommandItem>
							<Cloud className='mr-2 h-4 w-4' />
							<span>Synchronization</span>
						</CommandItem>
						<CommandItem>
							<Keyboard className='mr-2 h-4 w-4' />
							<span>Bindings</span>
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</Command>
		</div>
	);
}
