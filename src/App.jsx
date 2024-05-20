// App.js
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Comonent/login'; // Corrected import path
import ChatRoom from './Comonent/chatroom'; // Corrected import path

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    setLoggedIn(true);
    setUsername(localStorage.getItem('username'));
  };

  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} /> {/* Wrapped Login component in Route */}
            <Route path="/" element={loggedIn ? <ChatRoom username={username} /> : <Login onLogin={handleLogin} />} /> {/* Wrapped in Route */}
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
