import { defineConfig } from 'cypress';

export default defineConfig({
	e2e: {
		baseUrl: 'https://vim-note-production.up.railway.app',
		//baseUrl: 'http://localhost:5173',
		supportFile: 'support/e2e.ts',
		specPattern: 'e2e/**/*.cy.{js,jsx,ts,tsx}',
		video: false,
		screenshotOnRunFailure: true,
		screenshotsFolder: 'screenshots',
		videosFolder: 'videos',
		retries: { runMode: 0, openMode: 0 },
		experimentalMemoryManagement: true,
	}
});