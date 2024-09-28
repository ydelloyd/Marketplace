import { GenericError } from './errorModel';

describe('GenericError Interface', () => {
    it('should have a reason property of type string', () => {
        const error: GenericError = { reason: 'Some error occurred' };
        expect(typeof error.reason).toBe('string');
    });

});