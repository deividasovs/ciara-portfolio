import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders portfolio title', () => {
  render(<App />);
  const textElement = screen.getByText(/Ciara Burns./i);
  expect(textElement).toBeInTheDocument();
});
