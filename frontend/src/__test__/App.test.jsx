import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import App from '../App';

afterEach(() => {
  cleanup();
});

test('renders homepage', () => {
  render(<App />);
  const title = screen.getByText('Spend LESS AND Experience MORE');
  const title1 = screen.getByText('at ANYWHERE with AirBrB');
  const title2 = screen.getByText('Popular among our users');
  expect(title).toBeInTheDocument();
  expect(title1).toBeInTheDocument();
  expect(title2).toBeInTheDocument();
});

test('renders navbar', () => {
  render(<App />);
  const menu = screen.getByText('AirBrB');
  const search = screen.getByPlaceholderText('Start your search')
  expect(menu).toBeInTheDocument();
  expect(search).toBeInTheDocument();
})
