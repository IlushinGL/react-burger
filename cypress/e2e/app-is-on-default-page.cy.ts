const apiIngredients = 'api/ingredients';

describe('App открывается', () => {
	before(() => {
		cy.intercept('GET', apiIngredients, {
			fixture: 'get-ingrediets-success',
		}).as('getIngrediets');
		cy.visit('/');
		cy.wait(['@getIngrediets']);
		cy.get('[data-testid=constructor-bun-top]').as('burgerTopBun');
		cy.get('[data-testid=constructor-filling]').as('burgerFilling');
		cy.get('[data-testid=constructor-bun-bottom]').as('burgerBottomBun');
	});
	it('домашняя страница App должна быть конструктором бургера', () => {
		cy.get('[data-testid=burger-constructor]').should('be.visible');
		cy.get('@burgerTopBun').should('be.visible');
		cy.get('@burgerFilling').should('be.visible');
		cy.get('@burgerBottomBun').should('be.visible');
	});
});
