import React from 'react';
import { render, screen } from '@testing-library/react';
import { LoginPage } from './LoginPage';

describe('<LoginPage />', () => {
  it('renders', () => {
    render(<LoginPage />);
    expect(screen.getByText('Login')).toBeInTheDocument();
  });
});
