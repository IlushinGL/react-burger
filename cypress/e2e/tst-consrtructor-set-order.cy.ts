const apiIngredients_x = 'api/ingredients';
const apiUser = 'api/auth/user';
const apiToken = 'api/auth/token';
const apiOrder = 'api/orders';

describe('Кнопка Оформить заказ', () => {
	beforeEach(() => {
		cy.intercept('GET', apiIngredients_x, {
			fixture: 'get-ingrediets-success',
		}).as('getIngrediets');
		window.localStorage.setItem(
			'accessToken',
			JSON.stringify('tst-accessToken')
		);
		cy.intercept('POST', apiToken, {
			fixture: 'get-token-success',
		});
		cy.intercept('GET', apiUser, {
			fixture: 'get-user-success',
		}).as('getUser');
		cy.intercept('POST', apiOrder, {
			fixture: 'get-order-success',
		});
		cy.visit('/');
		// cy.wait(['@getIngrediets']);
		// cy.wait('@getUser');
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
	it('Если булка указана, доступна даже без соусов и начинок.', () => {
		cy.get('@sourceBun').trigger('dragstart');
		cy.get('@burgerBottomBun').trigger('drop');
		cy.get('@buttonOrder').invoke('prop', 'disabled').should('eq', false);
	});
	it('При нажатии заказ отправляется на сервер и открывается модальное окно состояния заказа. Модальное окно закрывается при нажатии Х. Текущий заказ обнуляется.', () => {
		cy.get('@sourceBun').trigger('dragstart');
		cy.get('@burgerBottomBun').trigger('drop');
		cy.get('@sourceMain').trigger('dragstart');
		cy.get('@burgerFilling').trigger('drop');
		cy.get('@sourceSauce').trigger('dragstart');
		cy.get('@burgerFilling').trigger('drop');
		cy.get('@buttonOrder').invoke('prop', 'disabled').should('eq', false);
		cy.get('@buttonOrder').click();
		cy.get('[data-testid=modal-detailes]').as('modalDetales');
		cy.get('@modalDetales').should('be.visible');
		cy.get('@modalDetales').contains('Тестовый бургер');
		cy.get('[data-testid=modal-detailes-x]').click();
		cy.get('@modalDetales').should('not.exist');
		cy.get('@buttonOrder').invoke('prop', 'disabled').should('eq', true);
	});
});
