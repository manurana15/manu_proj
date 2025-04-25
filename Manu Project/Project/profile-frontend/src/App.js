import React from 'react';
import Register from './components/Register';
import Login from './components/Login';
import ProfileForm from './components/ProfileForm';
import ProfileList from './components/ProfileList';
import './App.css';

function App() {
  return (
<div className="container">
  <h1>Profile App</h1>
  <Register />
  <Login />
  <ProfileForm />
  <ProfileList />
</div>
  );
}

export default App;
