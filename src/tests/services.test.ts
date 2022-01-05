import { calculateWinner } from '../app/services';

test('empty', () => {
  expect(calculateWinner([])).toBe(null);
});

test('horizontal X wins', () => {
    expect(calculateWinner([
      'X', 'X', 'X',
      'O', 'O', '',
      '', '', ''
    ])).toBe('X');
});

test('vertical O wins', () => {
  expect(calculateWinner([
    'X', 'X', 'O',
    'X', 'X', 'O',
    '', '', 'O'
  ])).toBe('O');
});

test('nobody wins', () => {
  expect(calculateWinner([
    'X', 'X', 'O',
    'O', 'O', 'X',
    'X', 'O', 'X'
  ])).toBe(null);
});

test('diagonal X wins', () => {
  expect(calculateWinner([
    'X', 'X', 'O',
    'O', 'X', 'O',
    'X', 'O', 'X'
  ])).toBe('X');
});
