import { useState } from 'react';
import Chat from './Chat';
// io is for establishing the connection.
import io from 'socket.io-client' ;
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom' ;
import { Login } from './Login';
import Register from './Register';

const socket = io.connect("https://chap-api-zids.onrender.com") ;

function App() {

   return (
      <Router>
        <Routes>
          <Route path={'/'} element={<Register/>}></Route>
          <Route path={'/login'} element={<Login/>}></Route>
          <Route path={'/chat'} element={<Chat socket={socket} username="" room=""/>}></Route>
        </Routes>
      </Router>
  );
}

export default App;
