import React from 'react';
import { Link } from 'react-router-dom';
import { MouseEventHandler } from 'react';

interface NavigationProps {
  loggedIn: boolean;
  handleLogout: MouseEventHandler<HTMLSpanElement>;
}

export const Navigation: React.FC<NavigationProps> = ({
  loggedIn,
  handleLogout
}) => {
  return (
    <div className="bg-blue-500 p-4">
      <div className="flex items-center justify-end space-x-4">
        {loggedIn && (
          <Link
            to="/games"
            className=" cursor-pointer text-white font-bold text-3xl"
          >
            Games
          </Link>
        )}
        {loggedIn && (
          <Link
            to="/users"
            className=" cursor-pointer text-white font-bold text-3xl"
          >
            Users
          </Link>
        )}

        {loggedIn ? (
          <span
            onClick={handleLogout}
            className="cursor-pointer text-white font-bold text-3xl"
          >
            Logout
          </span>
        ) : (
          <>
            <Link
              to="/credentials"
              className="cursor-pointer text-white font-bold text-3xl"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
