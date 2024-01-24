import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { GamesPage } from './GamePage';
import { LoginPage } from './LoginPage';
import { SingleGame } from './SingleGame';
import { UsersPage } from './UsersPage';
import { SingleUserPage } from './SingleUserPage';
import { HomePage } from './HomePage';

interface MainContentProps {
  loggedIn: boolean;
  handleLogin: (username: string, password: string) => Promise<void>;
  handleRegister: (username: string, password: string) => Promise<void>;
  errorMsg: string;
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>;
}

export const MainContent: React.FC<MainContentProps> = ({
  loggedIn,
  handleLogin,
  handleRegister,
  errorMsg,
  setErrorMsg
}) => {
  return (
    <div className="bg-game-background bg-cover h-[100vh] px-6">
      <Routes>
        <Route path="/games" element={<GamesPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/user/:id" element={<SingleUserPage />} />
        <Route
          path="/credentials"
          element={
            loggedIn ? (
              <Navigate to="/games" />
            ) : (
              <LoginPage
                handleLogin={handleLogin}
                handleRegister={handleRegister}
                errorMsg={errorMsg}
                setErrorMsg={setErrorMsg}
              />
            )
          }
        />
        <Route path="/games/:id" element={<SingleGame />} />
      </Routes>
    </div>
  );
};
