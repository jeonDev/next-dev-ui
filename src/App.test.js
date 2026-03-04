import { render, screen } from '@testing-library/react';
import App from './App';

test('renders brand name', () => {
  render(<App />);
  const linkElement = screen.getByText(/NEXT-DEV/i);
  expect(linkElement).toBeInTheDocument();
});
