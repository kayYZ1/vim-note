describe('Test sidebar actions', () => {
	beforeEach(() => {
		cy.clearAllCookies();
		cy.clearLocalStorage();
		cy.clearAllSessionStorage();
		cy.visit('/');
	});

	it('should open the sidebar and create new folder', () => {
		cy.get('[data-slot="sheet-trigger"]').should('be.visible').click();

		cy.get('[id="sidebar-action"]').should('be.visible').click();

		cy.get('[id="create-folder"]')
			.should('be.visible')
			.should('contain.text', 'Folder')
			.click();

		cy.get('[data-slot="input"]').should('be.visible').type('New Folder Test');

		cy.get('[type="submit"]')
			.should('be.visible')
			.should('contain.text', 'Create')
			.click();
	});

	it('should open the sidebar and create a new note', () => {
		cy.get('[data-slot="sheet-trigger"]').should('be.visible').click();

		cy.get('[id="sidebar-action"]').should('be.visible').click();

		cy.get('[id="create-note"]')
			.should('be.visible')
			.should('contain.text', 'Note')
			.click();

		cy.get('[id="title"]').should('be.visible').type('New Note Test');

		cy.get('[id="description"]')
			.should('be.visible')
			.type('Description for New Note Test');

		cy.get('[type="submit"]')
			.should('be.visible')
			.should('contain.text', 'Create')
			.click();
	});
});
