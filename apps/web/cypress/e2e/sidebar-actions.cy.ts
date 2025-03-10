describe('Test sidebar actions', () => {
	beforeEach(() => {
		cy.clearAllCookies();
		cy.clearLocalStorage();
		cy.clearAllSessionStorage();
		cy.visit('/');
	});

	it('should open the sidebar and create new folder', () => {
		cy.get('[data-slot="sheet-trigger"]').should('be.visible').click();

		cy.get('[id="sidebar-action"]', { timeout: 10000 })
			.should('be.visible')
			.click();

		cy.get('[id="create-folder"]', { timeout: 10000 })
			.should('be.visible')
			.should('contain.text', 'Folder')
			.click();

		cy.get('[data-slot="input"]', { timeout: 10000 })
			.should('be.visible')
			.type('New Folder Test');

		cy.get('[type="submit"]')
			.should('be.visible')
			.should('contain.text', 'Create')
			.click();
	});

	it('should open the sidebar and create a new note', () => {
		cy.get('[data-slot="sheet-trigger"]').should('be.visible').click();

		cy.get('[id="sidebar-action"]', { timeout: 10000 })
			.should('be.visible')
			.click();

		cy.get('[id="create-note"]', { timeout: 10000 })
			.should('be.visible')
			.should('contain.text', 'Note')
			.click();

		cy.get('[id="title"]', { timeout: 10000 })
			.should('be.visible')
			.type('New Note Test');

		cy.get('[id="description"]', { timeout: 10000 })
			.should('be.visible')
			.type('Description for New Note Test');

		cy.get('[type="submit"]')
			.should('be.visible')
			.should('contain.text', 'Create')
			.click();
	});
});
