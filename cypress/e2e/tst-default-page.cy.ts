const apiIngredients = 'api/ingredients';

describe('App открывается так, что', () => {
	beforeEach(() => {
		cy.intercept('GET', apiIngredients, {
			fixture: 'get-ingrediets-success',
		}).as('getIngrediets');
		cy.visit('/');
		cy.wait(['@getIngrediets']);
		cy.get('[data-testid=constructor-bun-top]').as('burgerTopBun');
		cy.get('[data-testid=constructor-filling]').as('burgerFilling');
		cy.get('[data-testid=constructor-bun-bottom]').as('burgerBottomBun');
		cy.get('[data-testid=ingredient_bun01]').as('sourceBun');
		cy.get('[data-testid=ingredient_main01]').as('sourceMain');
		cy.get('[data-testid=ingredient_sauce01]').as('sourceSauce');
	});
	it('домашней страницей App является конструктор бургера', () => {
		cy.get('[data-testid=burger-constructor]').should('be.visible');
		cy.get('@burgerTopBun').should('be.visible');
		cy.get('@burgerFilling').should('be.visible');
		cy.get('@burgerBottomBun').should('be.visible');
	});
	it('конструктор содержит список всех загруженных ингредиентов', () => {
		cy.get('@sourceBun').should('exist');
		cy.get('@sourceMain').should('exist');
		cy.get('@sourceSauce').should('exist');
	});
	it('клик на элементе списка открывает модальное окно свойств игредиента', () => {
		cy.get('@sourceBun').click();
		cy.get('[data-testid=ingredient-detailes]').should('be.visible');
	});
});
