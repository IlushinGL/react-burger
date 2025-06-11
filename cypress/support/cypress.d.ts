import './commands';

declare global {
	namespace Cypress {
		interface Chainable {
			prepareIngredients(): void;
			visitHome(): void;
			prepareUser(): void;
		}
	}
}
