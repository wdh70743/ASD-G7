import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the login page header', () => {
  render(<App />);
  const loginTitle = screen.getByRole('heading', { name: /login/i });
  expect(loginTitle).toBeInTheDocument();
});
