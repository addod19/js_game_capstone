// import 'jest-canvas-mock';
import Player from './Player';


jest.mock('./Entity');

beforeEach(() => {
  Entity.mockClear();
});

test('test if Player called the class Entity', () => {
});

test('test if Player called a function from the class Entity', () => {
});