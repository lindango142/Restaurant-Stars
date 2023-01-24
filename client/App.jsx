import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainContainer from './containers/MainContainer.jsx';
import Login from './components/Login.jsx'

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/main' element={<MainContainer/>} />
        </Routes>
      </div>
    );
  }
}

export default App;