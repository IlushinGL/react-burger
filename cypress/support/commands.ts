//<reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('prepareIngredients', () => {
	cy.intercept('GET', 'api/ingredients', {
		fixture: 'get-ingrediets-success',
	});
});

Cypress.Commands.add('prepareUser', () => {
	window.localStorage.setItem('accessToken', JSON.stringify('tst-accessToken'));
	cy.intercept('POST', 'api/auth/token', {
		fixture: 'get-token-success',
	});
	cy.intercept('GET', 'api/auth/user', {
		fixture: 'get-user-success',
	}).as('getUser');
	cy.intercept('POST', 'api/orders', {
		fixture: 'get-order-success',
	});
});

Cypress.Commands.add('visitHome', () => {
	cy.visit('/');
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
