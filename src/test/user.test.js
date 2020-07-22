import Model from './Model';

describe('User name is present', () => {
  it(' Can Set username ', () => {
    Model.userName = 'Dan';
    expect(Model.userName).toBe('Dan');
  });

  it(' Can not set username ', () => {
    Model.userName = 'Dan';
    expect(Model.userName).not.toBe('Fred');
  });
});
