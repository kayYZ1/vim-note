import { useState } from 'react';

import { useThemeToggle } from '@/shared/hooks/use-theme';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

export default function Settings() {
	const { theme, toggleTheme } = useThemeToggle();
	const [autoTheme, setAutoTheme] = useState(() => {
		return localStorage.getItem('autoTheme') || 'off';
	});
	const [selectedModel, setSelectedModel] = useState(() => {
		return (
			localStorage.getItem('model') || 'google/gemini-2.0-pro-exp-02-05:free'
		);
	});

	const handleModelChange = (value: string) => {
		setSelectedModel(value);
		localStorage.setItem('model', value);
	};

	const handleAutoThemeToggle = () => {
		const newAutoTheme = autoTheme === 'off' ? 'on' : 'off';
		setAutoTheme(newAutoTheme);
		localStorage.setItem('autoTheme', newAutoTheme);
	};

	return (
		<div className='container mx-auto p-6 max-w-3xl'>
			<h1 className='text-2xl font-bold mb-6'>Settings</h1>

			<Card className='mb-6'>
				<CardHeader>
					<CardTitle>Display Settings</CardTitle>
				</CardHeader>
				<CardContent className='space-y-4'>
					<div className='flex items-center justify-between'>
						<Label htmlFor='dark-mode'>Auto theme mode</Label>
						<Switch
							id='auto-mode'
							checked={autoTheme === 'on'}
							onCheckedChange={handleAutoThemeToggle}
						/>
					</div>
					<div className='flex items-center justify-between'>
						<Label htmlFor='dark-mode'>Dark Mode</Label>
						<Switch
							id='dark-mode'
							checked={autoTheme !== 'on' && theme === 'dark'}
							onCheckedChange={toggleTheme}
							disabled={autoTheme === 'on'}
						/>
					</div>
				</CardContent>
			</Card>

			<Card className='mb-6'>
				<CardHeader>
					<CardTitle>Language Model Settings</CardTitle>
				</CardHeader>
				<CardContent className='space-y-4'>
					<div className='flex items-center justify-between'>
						<Label htmlFor='model-select'>
							AI Model (Only free are currently available)
						</Label>
						<Select
							value={selectedModel}
							onValueChange={handleModelChange}>
							<SelectTrigger
								className='w-[180px]'
								id='model-select'>
								<SelectValue placeholder='Select a model' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='deepseek/deepseek-r1:free'>
									DeepSeek R1
								</SelectItem>
								<SelectItem value='deepseek/deepseek-chat:free'>
									DeepSeek V3
								</SelectItem>
								<SelectItem value='qwen/qwq-32b:free'>Qwen</SelectItem>
								<SelectItem value='meta-llama/llama-3.3-70b-instruct:free'>
									LLAMA 3.3
								</SelectItem>
								<SelectItem value='google/gemini-2.0-pro-exp-02-05:free'>
									Gemini 2.0
								</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
