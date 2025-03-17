import { GitGraph } from 'lucide-react';
import { Link } from 'react-router';

export default function FeaturesList() {
	return (
		<nav className='flex flex-col space-y-4 mt-auto'>
			<div className='space-y-2'>
				<div className='flex items-center justify-between px-2 text-sm text-muted-foreground'>
					<span>Features</span>
				</div>
				<div className='space-y-1'>
					<Link
						to='graph'
						className='w-full flex items-center gap-2 px-2 py-1 text-sm rounded-md hover:bg-accent'>
						<GitGraph className='h-4 w-4' />
						<span>Graph view</span>
					</Link>
				</div>
			</div>
		</nav>
	);
}
