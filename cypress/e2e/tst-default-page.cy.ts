const apiIngredients = 'api/ingredients';

describe('App открывается так, что', () => {
	beforeEach(() => {
		cy.intercept('GET', apiIngredients, {
			fixture: 'get-ingrediets-success',
		}).as('getIngrediets');

		cy.visit('/');
		// cy.wait(['@getIngrediets']);
		cy.get('[data-testid=constructor-bun-top]').as('burgerTopBun');
		cy.get('[data-testid=constructor-filling]').as('burgerFilling');
		cy.get('[data-testid=constructor-bun-bottom]').as('burgerBottomBun');
		cy.get('[data-testid=ingredient_bun01]').as('sourceBun');
		cy.get('[data-testid=ingredient_main01]').as('sourceMain');
		cy.get('[data-testid=ingredient_sauce01]').as('sourceSauce');
	});
	it('Домашней страницей App является конструктор бургера.', () => {
		cy.get('[data-testid=burger-constructor]').should('be.visible');
		cy.get('@burgerTopBun').should('be.visible');
		cy.get('@burgerFilling').should('be.visible');
		cy.get('@burgerBottomBun').should('be.visible');
	});
	it('Конструктор содержит список всех загруженных ингредиентов.', () => {
		cy.get('@sourceBun').should('exist');
		cy.get('@sourceMain').should('exist');
		cy.get('@sourceSauce').should('exist');
	});
	it('Клик на элементе списка открывает модальное окно свойств соответствующего игредиента. Модальное окно закрывается при нажатии Х.', () => {
		cy.get('@sourceBun').click();
		cy.get('[data-testid=modal-detailes]').as('modalDetales');
		cy.get('@modalDetales').should('be.visible');
		cy.get('@modalDetales').contains('Булка');
		cy.get('[data-testid=modal-detailes-x]').click();
		cy.get('@modalDetales').should('not.exist');
	});
	it('Булки можно перетащить на верх заказа.', () => {
		cy.get('@sourceBun').trigger('dragstart');
		cy.get('@burgerTopBun').trigger('drop');
		cy.get('@burgerTopBun').contains('Булка');
		cy.get('@burgerBottomBun').contains('Булка');
	});
	it('Булки можно перетащить в низ заказа.', () => {
		cy.get('@sourceBun').trigger('dragstart');
		cy.get('@burgerBottomBun').trigger('drop');
		cy.get('@burgerTopBun').contains('Булка');
		cy.get('@burgerBottomBun').contains('Булка');
	});
	it('Булки нельзя перетащить в середину заказа.', () => {
		cy.get('@sourceBun').trigger('dragstart');
		cy.get('@burgerFilling').trigger('drop');
		cy.get('@burgerFilling').should('not.contain', 'Булка');
	});
	it('Другие ингредиенты можно перетащить в середину заказа.', () => {
		cy.get('@sourceMain').trigger('dragstart');
		cy.get('@burgerFilling').trigger('drop');
		cy.get('@burgerFilling').contains('Котлета');
	});
	it('Другие ингредиенты нельзя перетащить на верх заказа.', () => {
		cy.get('@sourceMain').trigger('dragstart');
		cy.get('@burgerTopBun').trigger('drop');
		cy.get('@burgerTopBun').should('not.contain', 'Котлета');
		cy.get('@burgerBottomBun').should('not.contain', 'Котлета');
	});
	it('Другие ингредиенты нельзя перетащить в низ заказа.', () => {
		cy.get('@sourceMain').trigger('dragstart');
		cy.get('@burgerBottomBun').trigger('drop');
		cy.get('@burgerTopBun').should('not.contain', 'Котлета');
		cy.get('@burgerBottomBun').should('not.contain', 'Котлета');
	});
});
