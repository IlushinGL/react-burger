import type {} from '../support/cypress';

describe('App открывается так, что', () => {
	beforeEach(() => {
		cy.prepareIngredients();
		cy.visitHome();
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
	it('Клик на элементе списка: открывается модальное окно свойств соответствующего игредиента > модальное окно закрывается при нажатии Х.', () => {
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

describe('Кнопка Оформить заказ', () => {
	beforeEach(() => {
		cy.prepareIngredients();
		cy.prepareUser();
		cy.visitHome();
	});
	it('Недоступна, если булка не указана.', () => {
		cy.get('@sourceMain').trigger('dragstart');
		cy.get('@burgerFilling').trigger('drop');
		cy.get('@sourceSauce').trigger('dragstart');
		cy.get('@burgerFilling').trigger('drop');
		cy.get('@buttonOrder').invoke('prop', 'disabled').should('eq', true);
	});
	it('Доступна, если булка указана (даже без соусов и начинок).', () => {
		cy.get('@sourceBun').trigger('dragstart');
		cy.get('@burgerBottomBun').trigger('drop');
		cy.get('@buttonOrder').invoke('prop', 'disabled').should('eq', false);
	});
	it('Клик: заказ отправляется на сервер > открывается модальное окно состояния заказа > окно закрывается при нажатии Х > текущий заказ обнуляется.', () => {
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
