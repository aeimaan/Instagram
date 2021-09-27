import React from 'react';
import Navbar from "./components/Navbar.js";
import "./App.css";
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './components/screens/home.js';
import Signup from './components/screens/Signup.js';
import Profile from './components/screens/Profile.js';
import Login from './components/screens/Login.js';


function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Route exact path="/">
        <Home />
      </Route>

      <Route path="/login">
        <Login />
      </Route>

      <Route path="/signup">
        <Signup />
      </Route>

      <Route path="/profile">
        <Profile />
      </Route>

    </BrowserRouter>

  );
}

export default App;
