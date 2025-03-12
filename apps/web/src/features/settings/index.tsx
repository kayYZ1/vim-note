import { useThemeToggle } from '@/shared/hooks/use-theme';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function Settings() {
	const { theme, toggleTheme } = useThemeToggle();

	return (
		<div className='container mx-auto p-6 max-w-3xl'>
			<h1 className='text-2xl font-bold mb-6'>Settings</h1>
			<Card className='mb-6'>
				<CardHeader>
					<CardTitle>Display Settings</CardTitle>
				</CardHeader>
				<CardContent className='space-y-4'>
					<div className='flex items-center justify-between'>
						<Label htmlFor='dark-mode'>Dark Mode</Label>
						<Switch
							id='dark-mode'
							checked={theme === 'dark'}
							onCheckedChange={toggleTheme}
						/>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
