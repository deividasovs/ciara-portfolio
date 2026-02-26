import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders portfolio title', () => {
  render(<App />);
  const textElements = screen.getAllByText(/Ciara Burns\./i);
  expect(textElements[0]).toBeInTheDocument();
});
