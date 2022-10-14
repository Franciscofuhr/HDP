import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Game from './components/Rooms/Rooms'
import Rules from './components/Rules/rules';
import Landing from './components/Landing/landing';
import Login from './components/Login/login';
import JoinRoom from './components/JoinRoom/JoinRoom';
import {io} from "socket.io-client";
import { useEffect } from 'react';
import PlayGame from './components/PlayGame/PlayGame';
import EndGame from './components/EndGame/EndGame';

const socket = io("http://localhost:3002", { autoConnect: false });

function App() {
  // socket.onAny((event, ...args) => {
  //   console.log(event, args);
  // });
  
  function userConnect() {
    
    socket.connect();
    
    
  }
 
  useEffect(() => {
    userConnect();
  }, []);
  useEffect(() => {
    socket.on("connection", () => {
      console.log("Connected");
    });

    return () => {
      socket.off("connection");
    };
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Landing />} />
        <Route path='/play/:id' element={<Game socket={socket}/>} />
        <Route path='/login' element={<Login socket={socket} />} />
        <Route path='/help' element={<Rules />} />
        <Route path='/joinRoom' element={<JoinRoom socket={socket}/>} />
        <Route path='/playGame/:id' element={<PlayGame socket={socket}/>} />
        <Route path='/endGame/:id' element={<EndGame socket={socket}/>} />

      </Routes>
    </div>
  );
}

export default App;
