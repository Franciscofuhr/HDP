import React from "react";
import aaa from "../../image/aaa.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import monitoFigma from "../../utils/monito figma.png";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import './EndGame.css'
import winnerSound from "../../utils/crowd-cheer-ii-6263.mp3"
export default function EndGame({ socket }) {
  const winnerGame = useSelector((state) => state.gameWinner);
  const roomCode = useSelector((state) => state.roomCode);
  const navigate = useNavigate();
  const goBackHome = () => {
    socket.emit("out-of-room");
    navigate("/login");
  };
  const playAgain = () => {
    socket.emit("restart-game");
    navigate(`/play/${roomCode}`); //
  };
  const sound=new Audio(winnerSound)
  useEffect(() => {
    socket.on("restart-game", () => {
      navigate(`/play/${roomCode}`); //
    });
    sound.play()
    return () => {
      socket.off("restart-game");
      sound.pause();
      sound.currentTime = 0;
    };
  });
  return (
    <div className="container">
      <h3 className="title">
              H.D.P.
              <img
                src="https://www.seekpng.com/png/full/760-7604712_middle-finger-emoticon-fuck-you.png"
                style={{ maxHeight: "30px", marginLeft: "5px" }}
              />
      </h3>
      <div className="container-endgame">
        <div>
            <img
              style={{ height: "650px" }}
              src={aaa}
              alt=""
            />
        </div>
        <div>
        <h2 className="winner" style={{backgroundColor: 'rgba(200, 38, 191, 0)', textAlign: 'start', fontSize: '50px'}}> Bueno...</h2>
      
      {/* <h1>{winnerGame} es el más HDP</h1> */}
      <h2 className="winner"> {winnerGame} es el más HDP</h2>
      <div className='container-btn'>
      <button onClick={() => playAgain()} className='btn-endGame'>Jugar de nuevo</button>
      <button onClick={() => goBackHome()} className='btn-endGame' style={{backgroundColor:'rgba(200, 38, 191, 0)'}}>Volver al Inicio</button>
      </div>
        </div>
      </div>
    </div>
  );
}
