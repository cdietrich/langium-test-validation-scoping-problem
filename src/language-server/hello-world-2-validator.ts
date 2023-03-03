import { ValidationAcceptor, ValidationChecks } from 'langium';
import { HelloWorld2AstType, Person } from './generated/ast';
import type { HelloWorld2Services } from './hello-world-2-module';

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: HelloWorld2Services) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.HelloWorld2Validator;
    const checks: ValidationChecks<HelloWorld2AstType> = {
        Person: validator.checkPersonStartsWithCapital
    };
    registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class HelloWorld2Validator {

    checkPersonStartsWithCapital(person: Person, accept: ValidationAcceptor): void {
        if (person.name) {
            const firstChar = person.name.substring(0, 1);
            if (firstChar.toUpperCase() !== firstChar) {
                accept('error', 'Person name should start with a capital.', { node: person, property: 'name' });
            }
        }
    }

}
