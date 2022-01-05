import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Game from './main';

test('renders Game, checks squares and Board too', () => {
  render(<Game />);
  const gameElement = screen.getByTestId('game');
  expect(gameElement).toBeInTheDocument();

  const boardElement = screen.getByTestId('board');
  expect(boardElement).toBeInTheDocument();

  const squareElements = screen.getAllByTestId('square');
  expect(squareElements).toHaveLength(9);
});

test('clicks two squares', () => {
  render(<Game />);
  const squareElements = screen.getAllByTestId('square');
  const firstSquareElement = squareElements[0];
  const secondSquareElement = squareElements[1];
  fireEvent.click(firstSquareElement);
  expect(screen.getByText('X')).toBeInTheDocument();
  fireEvent.click(secondSquareElement);
  expect(screen.getByText('O')).toBeInTheDocument();
});

test('winner', () => {
  render(<Game />);
  const squareElements = screen.getAllByTestId('square');
  fireEvent.click(squareElements[0]);
  fireEvent.click(squareElements[3]);
  fireEvent.click(squareElements[1]);
  fireEvent.click(squareElements[4]);
  fireEvent.click(squareElements[2]);
  expect(screen.getByText('Winner: X')).toBeInTheDocument();
});
