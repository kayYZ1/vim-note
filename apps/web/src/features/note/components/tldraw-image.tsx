import { Pencil, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';

export default function TldrawImage() {
	return (
		<div className='relative w-full'>
			<img
				src={'https://placehold.co/600x400'}
				alt={'Tldraw example image'}
				className='w-full max-w-full h-auto py-2'
			/>
			<div className='absolute bottom-4 right-4 flex gap-2'>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant='secondary'
								size='icon'
								className='rounded-full shadow-md'>
								<Pencil size={16} />
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>Edit</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant='secondary'
								size='icon'
								className='rounded-full shadow-md'>
								<Download size={16} />
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>Download</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>
		</div>
	);
}
