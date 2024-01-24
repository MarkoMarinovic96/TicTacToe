import React from 'react';
import { useField } from '../hook/index';
import { MouseEventHandler } from 'react';

interface RegisterPageProps {
  handleRegister: (username: string, password: string) => Promise<void>;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({
  handleRegister
}) => {
  const username = useField('text');
  const password = useField('password');

  const handleRegisterFormSubmit: MouseEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    try {
      await handleRegister(username.value, password.value);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div>
      <h2>Register Page</h2>
      <form onSubmit={handleRegisterFormSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type={username.type}
            id="username"
            value={username.value}
            onChange={username.onChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type={password.type}
            id="password"
            value={password.value}
            onChange={password.onChange}
            required
          />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};
