import { defineConfig } from 'cypress';

export default defineConfig({
	e2e: {
		baseUrl: 'http://localhost:4173',
		supportFile: false,
		specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
		video: false,
		screenshotOnRunFailure: true,
		retries: { runMode: 0, openMode: 0 },
		experimentalMemoryManagement: true,
	}
});