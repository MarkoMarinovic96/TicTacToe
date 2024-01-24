import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { postLogin } from './api/login';
import { postRegister } from './api/register';
import { storage } from './lib/storage';
import { Navigation } from './components/Navigation';
import { MainContent } from './components/MainContent';
import { postLogout } from './api/logout';

function App() {
  const [loggedIn, setLoggedIn] = useState(!!storage.getToken());
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (username: string, password: string) => {
    setErrorMsg('');
    try {
      const response = await postLogin({ username, password });

      storage.setToken(response.token);
      storage.setUserId(response.username);

      setLoggedIn(true);
    } catch (error: any) {
      setErrorMsg(error.message);
      console.error('Login failed:', error);
    }
  };

  const handleRegister = async (username: string, password: string) => {
    setErrorMsg('');
    try {
      await postRegister(username, password);
      const response = await postLogin({ username, password });

      storage.setToken(response.token);
      storage.setUserId(response.username);

      setLoggedIn(true);
    } catch (error: any) {
      setErrorMsg(error.message);
      console.error('Registration failed:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await postLogout();
      storage.clearToken();
      storage.clearUserId();
      setLoggedIn(false);
      window.location.replace('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="App">
      <Router>
        <Navigation loggedIn={loggedIn} handleLogout={handleLogout} />
        <MainContent
          loggedIn={loggedIn}
          handleLogin={handleLogin}
          handleRegister={handleRegister}
          errorMsg={errorMsg}
          setErrorMsg={setErrorMsg}
        />
      </Router>
    </div>
  );
}

export default App;
