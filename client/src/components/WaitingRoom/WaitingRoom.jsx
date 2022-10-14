import React from "react";
import s from "./WaitingRoom.module.css";
import aaa from "../../image/aaa.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import monitoFigma from "../../utils/monito figma.png";
import { useEffect } from "react";

export default function WaitingRoom({
  usersRoom,
  monkeysArray,
  roomCode,
  socket,
}) {
  console.log(usersRoom, "soy usersroommmm");
  // [....,
  //    {
  //   name: socket.name,
  //   userPicture: socket.userPicture,
  //   points:0//donde se van sumando los puntos
  // };]
  useEffect(() => {

    socket.on("start-game",(conditional)=>{
      if(conditional===true){
        navigate(`/playGame/${roomCode}`)
      }
    });
    

    return () => {
      socket.off("start-game")
      
    };
  }, []);
  const navigate = useNavigate();
  const handleStart = () => {
    socket.emit("start-game", { room: roomCode });
    // navigate(`/playGame/${roomCode}`)
  };

  return (
    <div className={s.waitingContainer}>
      <div>
        <p className={s.jugadores}> Jugadores {usersRoom.length}/10 </p>
      </div>
      <div className={s.containerAbajo}>
        <div className={s.contenedorScroll}>
          <div className={s.jugadoresContainer}>
            <ul style={{display:'flex', alignContent:'center', flexDirection:'column'}}>
              {usersRoom.length
                ? usersRoom.map((e) => {
                    return (
                      <div style={{display:'flex', alignContent:'center', flexDirection:'column'}} >
                        <li className={s.playerTag}>
                          <div
                            style={{
                              height: "50px",
                              width: "50px",
                              borderRadius: "100px",
                              backgroundColor: "#D9D9D9",
                              margin: "5px",
                            }}
                          >
                            <img
                              src={monkeysArray[e.userPicture]}
                              alt=""
                              className={s.img}
                            />
                          </div>
                          <p className={s.username}>{e.name}</p>
                        </li>
                      </div>
                    );
                  })
                : null}
            </ul>
          </div>
        </div>
        <div className={s.monitoContainer}>
          {/* <Link to={`/playGame/${roomCode}`}> */}
            {}
            <button onClick={(e)=>{handleStart(e)}} className={s.btn}>
              Quiero jugar!
            </button>
          {/* </Link> */}
          <img src={monitoFigma} alt="" className={s.monito} />
        </div>
      </div>
    </div>
  );
}
