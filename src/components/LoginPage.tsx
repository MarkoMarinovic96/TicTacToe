import React, { useState } from 'react';
import { MouseEventHandler } from 'react';
import { useField } from '../hook/index';
import { Spinner } from './Spinner';

interface LoginPageProps {
  handleLogin?: (username: string, password: string) => Promise<void>;
  handleRegister?: (username: string, password: string) => Promise<void>;
  errorMsg?: string;
  setErrorMsg?: React.Dispatch<React.SetStateAction<string>>;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  handleLogin,
  handleRegister,
  errorMsg,
  setErrorMsg
}) => {
  const [register, setRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const username = useField('text');
  const password = useField('password');
  const usernameRegister = useField('text');
  const passwordRegister = useField('password');

  const handleLoginFormSubmit: MouseEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      if (handleLogin) {
        await handleLogin(username.value, password.value);
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterFormSubmit: MouseEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      if (handleRegister) {
        await handleRegister(usernameRegister.value, passwordRegister.value);
      }
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {!register ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <form onSubmit={handleLoginFormSubmit} className="mb-4">
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-black"
              >
                Username:
              </label>
              <input
                type={username.type}
                id="username"
                value={username.value}
                onChange={username.onChange}
                required
                className="mt-1 p-2 border rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-black"
              >
                Password:
              </label>
              <input
                type={password.type}
                id="password"
                value={password.value}
                onChange={password.onChange}
                required
                className="mt-1 p-2 border rounded w-full"
              />
            </div>
            <div className="relative">
              <div className="flex flex-col items-center ">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Login
                </button>
                {errorMsg && (
                  <span className="text-red-500 text-sm mt-2">{errorMsg}</span>
                )}
              </div>

              <p className="mt-2 text-sm text-black">
                Don't have an account? Register here.
              </p>
              <button
                type="button"
                onClick={() => {
                  if (setErrorMsg) {
                    setErrorMsg('');
                  }

                  setRegister((old) => !old);
                }}
                className="text-black-400 mt-2 underline focus:outline-none hover:text-gray-800"
              >
                Register
              </button>
              {isLoading && <Spinner />}
            </div>
          </form>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Register</h2>
          <form onSubmit={handleRegisterFormSubmit} className="mb-4">
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-black"
              >
                Username:
              </label>
              <input
                type={usernameRegister.type}
                id="username"
                value={usernameRegister.value}
                onChange={usernameRegister.onChange}
                required
                className="mt-1 p-2 border rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-black"
              >
                Password:
              </label>
              <input
                type={passwordRegister.type}
                id="password"
                value={passwordRegister.value}
                onChange={passwordRegister.onChange}
                required
                className="mt-1 p-2 border rounded w-full"
              />
            </div>
            <div>
              <div className="flex flex-col items-center">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Register
                </button>
                {errorMsg && (
                  <span className="text-red-500 text-sm mt-2">{errorMsg}</span>
                )}
              </div>

              <p className="mt-2 text-sm text-black">
                You have an account? Login here.
              </p>
              <button
                type="button"
                onClick={() => {
                  if (setErrorMsg) {
                    setErrorMsg('');
                  }
                  setRegister((old) => !old);
                }}
                className="text-black-400 mt-2 underline focus:outline-none hover:text-gray-800"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
