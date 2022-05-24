import React from 'react';

import Login from './components/Login'
import Auth from './components/Auth'
import { Outlet } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Auth>
        <Outlet />
      </Auth>
    </div>
  );
}

export default App;
