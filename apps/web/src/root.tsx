import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';

import { useThemeToggle } from './shared/hooks/use-theme';
import ToggleTheme from './components/toggle-theme';
import SettingsList from './components/settings-list';
import CommandSearch from './components/command-search';
import NewNote from './components/new-note';
import FeaturesList from './components/features-list';
import Notes from './features/notes';

export default function RootLayout() {
	const [isCommandSearchOpen, setIsCommandSearchOpen] = useState(false);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isNewNoteOpen, setIsNewNote] = useState(false);

	const { theme, toggleTheme } = useThemeToggle();

	const location = useLocation();

	useEffect(() => {
		const now = new Date();
		const hours = now.getHours();
		const shouldBeDark = hours >= 18 || hours < 6;

		if (shouldBeDark && theme !== 'dark') {
			toggleTheme();
		} else if (!shouldBeDark && theme !== 'light') {
			toggleTheme();
		}
	}, [theme, toggleTheme]);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'f' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setIsCommandSearchOpen((prev) => !prev);
			}
			if (e.key === 'b' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setIsSidebarOpen((prev) => !prev);
			}
			if (e.key === 'm' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setIsNewNote((prev) => !prev);
			}
			if (e.key === 'Escape') {
				setIsCommandSearchOpen(false);
				setIsNewNote(false);
			}
		};

		setIsCommandSearchOpen(false);
		setIsNewNote(false);

		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [location.pathname]);

	return (
		<div
			className='min-h-screen bg-background font-primary'
			onContextMenu={(e) => e.preventDefault()}>
			{/* Header */}
			<header className='px-8 py-4'>
				<div className='flex items-center justify-between px-4 py-3'>
					<Sheet
						open={isSidebarOpen}
						onOpenChange={setIsSidebarOpen}>
						<SheetTrigger asChild>
							<Button
								variant='ghost'
								size='icon'>
								<Menu className='h-5 w-5' />
							</Button>
						</SheetTrigger>
						<SheetContent
							side='left'
							className='w-[200px] sm:w-[400px]'>
							<div className='flex flex-col p-4'>
								<div className='space-y-2 pb-4 border-b px-2'>
									<SheetTitle className='text-2xl font-bold'>
										vim-note
									</SheetTitle>
									<SheetDescription className='text-sm text-muted-foreground'>
										Add folders & create notes
									</SheetDescription>
								</div>
								<div className='py-4 space-y-2'>
									<FeaturesList />
									<Notes />
									<SettingsList />
								</div>
							</div>
						</SheetContent>
					</Sheet>
					<ToggleTheme />
				</div>
			</header>
			{/* Main Content */}
			<main className='container mx-auto max-w-4xl'>
				<CommandSearch
					isOpen={isCommandSearchOpen}
					onOpenChange={setIsCommandSearchOpen}
				/>
				<NewNote
					isOpen={isNewNoteOpen}
					onOpenChange={setIsNewNote}
				/>
				<Outlet />
			</main>
		</div>
	);
}
