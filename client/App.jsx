import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainContainer from './containers/MainContainer.jsx';

const App = () => {
  return(
    <div>
      <Routes>
        <Route path='/' element={<MainContainer/>} />
      </Routes>
    </div>
  );
}

export default App;