import { JSX } from 'react';
import { Brain, Trash, Image, Pencil } from 'lucide-react';

import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuShortcut,
	ContextMenuTrigger,
} from '@/components/ui/context-menu';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';

interface NoteActionsProps {
	children: JSX.Element;
	onGenerateAI?: () => void;
	onImageUpload?: () => void;
	onDrawing?: () => void;
	onClearNote?: () => void;
}

export default function NoteActions({
	children,
	onGenerateAI,
	onImageUpload,
	onDrawing,
	onClearNote,
}: NoteActionsProps) {
	return (
		<ContextMenu>
			<ContextMenuTrigger>{children}</ContextMenuTrigger>
			<ContextMenuContent className='w-64'>
				<ContextMenuItem
					inset
					onSelect={onGenerateAI}>
					<span>Expand with AI</span>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<ContextMenuShortcut>
									<Brain className='h-4 w-4' />
								</ContextMenuShortcut>
							</TooltipTrigger>
							<TooltipContent>
								<p className='text-wrap'>
									Content written on the page will be your prompt
								</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</ContextMenuItem>
				<ContextMenuItem
					inset
					onSelect={onImageUpload}>
					Insert image
					<ContextMenuShortcut>
						<Image className='h-4 w-4' />
					</ContextMenuShortcut>
				</ContextMenuItem>
				<ContextMenuItem
					inset
					onSelect={onDrawing}>
					Insert drawing
					<ContextMenuShortcut>
						<Pencil className='h-4 w-4' />
					</ContextMenuShortcut>
				</ContextMenuItem>
				<ContextMenuItem
					inset
					onSelect={onClearNote}>
					Clear note
					<ContextMenuShortcut>
						<Trash className='h-4 w-4' />
					</ContextMenuShortcut>
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	);
}
