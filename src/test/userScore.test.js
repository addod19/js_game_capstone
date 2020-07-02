import Model from './Model';

describe('Set up userName and score', () => {
    it('set a user name', () => {
        Model.userName = 'Daniel';
        expect(Model.userName).toBe('Daniel');
    });
})
