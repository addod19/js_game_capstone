// import 'jest-canvas-mock';
import Player from './Player';
import Entity from './Entity';

jest.mock('./Entity');

beforeEach(() => {
  Entity.mockClear();
});


test('test if Player called the class Entity', () => {
  // eslint-disable-next-line no-unused-vars
  const player = new Player('SceneMain', 240, 320, 'sprPlayer');
  expect(Entity).toHaveBeenCalledTimes(1);
});

test('test if Player called a function from the class Entity', () => {
  const player = new Player('SceneMain', 240, 320, 'sprPlayer');
  player.explode(false);
  expect(player.explode).toHaveBeenCalledTimes(1);
});