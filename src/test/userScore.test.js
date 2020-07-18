import Model from './Model';

describe('User score is present or not', () => {
  it(' Can Set user score ', () => {
    Model.score = '400';
    expect(Model.score).toBe('400');
  });

  it(' Can catch a wrong user score  ', () => {
    Model.score = '';
    expect(Model.score).not.toBe('200');
  });
});
