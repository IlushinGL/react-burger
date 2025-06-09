const apiIngredients_x = 'api/ingredients';

describe('Кнопка Оформить заказ', () => {
	beforeEach(() => {
		cy.intercept('GET', apiIngredients_x, {
			fixture: 'get-ingrediets-success',
		}).as('getIngrediets');
		cy.visit('/');
		cy.wait(['@getIngrediets']);
		cy.get('[data-testid=burger-constructor-info]')
			.contains('Оформить заказ')
			.as('buttonOrder');
		cy.get('[data-testid=constructor-bun-top]').as('burgerTopBun');
		cy.get('[data-testid=constructor-filling]').as('burgerFilling');
		cy.get('[data-testid=constructor-bun-bottom]').as('burgerBottomBun');
		cy.get('[data-testid=ingredient_bun01]').as('sourceBun');
		cy.get('[data-testid=ingredient_main01]').as('sourceMain');
		cy.get('[data-testid=ingredient_sauce01]').as('sourceSauce');
	});
	it('Недоступна, если булка не указана.', () => {
		cy.get('@sourceMain').trigger('dragstart');
		cy.get('@burgerFilling').trigger('drop');
		cy.get('@sourceSauce').trigger('dragstart');
		cy.get('@burgerFilling').trigger('drop');
		cy.get('@buttonOrder').invoke('prop', 'disabled').should('eq', true);
	});
	it('Если булка указана, кнопка доступна даже без соусов и начинок.', () => {
		cy.get('@sourceBun').trigger('dragstart');
		cy.get('@burgerBottomBun').trigger('drop');
		cy.get('@buttonOrder').invoke('prop', 'disabled').should('eq', false);
	});
	it('При нажатии отправляет заказ на сервер и открывает модальное окно состояния заказа.', () => {
		cy.get('@sourceBun').trigger('dragstart');
		cy.get('@burgerBottomBun').trigger('drop');
		cy.get('@sourceMain').trigger('dragstart');
		cy.get('@burgerFilling').trigger('drop');
		cy.get('@sourceSauce').trigger('dragstart');
		cy.get('@burgerFilling').trigger('drop');
		cy.get('@buttonOrder').invoke('prop', 'disabled').should('eq', false);
	});
});
