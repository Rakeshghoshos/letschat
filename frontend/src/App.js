import React, { Component } from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Join from './components/join/Join';
import Chat from './components/chat/Chat';
import './App.css';

class App extends Component {
  render() {
    return (
     <BrowserRouter> 
        <Routes>
          <Route exact path='/' Component={Join}/>
          <Route exact path='/chat' Component={Chat}/>
        </Routes>
     </BrowserRouter>
    );
  }
}

export default App;
