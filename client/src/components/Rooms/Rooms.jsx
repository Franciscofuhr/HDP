import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { sendMessage } from "../../redux/actions";
import ChatRoom from "../ChatRoom/chatRoom";
import monito1 from "../../utils/monito1.png";
import monito2 from "../../utils/monito2.png";
import monito3 from "../../utils/monito3.png";
import monito4 from "../../utils/monito4.png";
import monito5 from "../../utils/monito5.png";
import monito6 from "../../utils/monito6.png";
import monito7 from "../../utils/monito7.png";
import monito8 from "../../utils/monito8.png";
import monito9 from "../../utils/monito9.png";
import monito10 from "../../utils/monito10.png";
import monito11 from "../../utils/monito11.png";
import monito12 from "../../utils/monito12.png";
import monito13 from "../../utils/monito13.png";
import WaitingRoom from "../WaitingRoom/WaitingRoom";
import s from "./Rooms.module.css"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function Game({ socket }) {
  let dispatch = useDispatch();
  const monkeysArray = [
    monito1,
    monito2,
    monito3,
    monito4,
    monito5,
    monito6,
    monito7,
    monito8,
    monito9,
    monito10,
    monito11,
    monito12,
    monito13,
  ];
  const user = useSelector((state) => state.user);
  const roomCode = useSelector((state) => state.roomCode);
  const roomMessages = useSelector((state) => state.messages);
  const userPicture = useSelector((state) => state.userPicture);
  const [usersRoom, setUsersRoom] = useState([]);
  const [dataFromRoom, setDataFromRoom] = useState({});
  const navigate = useNavigate()
  const [ownerRoom, setOwnerRoom] = useState(false)

  // console.log(usersRoom, "soy usersRoom");
  // {....,
  //    socket.id -> AAS23c:{
  //   name: socket.name,
  //   userPicture: socket.userPicture,
  //   points:0//donde se van sumando los puntos
  // };}
  const goBackHome = () => {
    socket.emit("out-of-room");
    navigate("/login");
  };
  const roomInformation = (roomInfo) => {
    // console.log("entreee", roomInfo);
    setDataFromRoom(roomInfo);
    let usersFromRoom = [];

    for (const key in roomInfo.users) {
      usersFromRoom = [
        ...usersFromRoom,
        {
          socketId:key,
          name: roomInfo.users[key].name,
          userPicture: roomInfo.users[key].userPicture,
        },
      ];
    }
    // console.log("roomInfo filtrados", usersFromRoom);
    setUsersRoom(usersFromRoom);
  };
  const handleUserConnectedOrDisc = ({users}) => {
    console.log("entro room", users);
    let usersFromRoom = [];
    let array = Object.keys(users).map((e) => {
      return e
    })    // [masuiad, opadh] true
    setOwnerRoom(users[socket.id].ownerRoom)
    for (const key in users) {
      console.log('userssssss room', users)
      // setOwnerRoom(users[key].ownerRoom)
      usersFromRoom = [
        ...usersFromRoom,
        {
          name: users[key].name,
          userPicture: users[key].userPicture,
        },
      ];
      // console.log("roomInfo filtrados", usersFromRoom);
    }
    setUsersRoom(usersFromRoom);
  };
console.log(ownerRoom)
  function userConnect(user, roomCode, userPicture) {
    socket.emit("room-info");
  }
  const handleChatMessage = (message) => {
    dispatch(sendMessage(message));
    // console.log("roomMessages", roomMessages);
  };
  console.log(roomCode, 'soyRoomcodeee')

  const handleNavigate = () => {
   navigate(`/playGame/${roomCode}`);
   socket.emit("asking-cards")
  };

  socket.on("start-game", handleNavigate );

  

  useEffect(() => {
    userConnect();
  }, []);

  // const navigate = useNavigate()
  // useEffect(() => {
  //   socket.on('start-game', navigate(`/playGame/${roomCode}`))
  // }, [click]);

  useEffect(() => {

    socket.on("room-info", roomInformation);
    socket.on("user-connected", handleUserConnectedOrDisc);

    //   // socket.on("", handleUsers);

    socket.on("user-disconnected", handleUserConnectedOrDisc);

    socket.on("chat-message", handleChatMessage);
    

    return () => {
      
      socket.off("chat-message");
      socket.off("user-disconnected");

      // socket.off("user connected");
      // socket.off("users");
      // socket.off("private message");
      // socket.off("user disconnected");
    };
  }, []);

  return (
    <div className={s.backgroundRooms} style={{height:'100vh', display:'flex', justifyContent:'space-between', flexDirection:'column', width:'100%' }}>
      <div className="contenedorArriba">
        <div onClick={()=>goBackHome()} className={s.logohover}>
            <h3 className={s.hdp}>
              H.D.P.
              <img
                src="https://www.seekpng.com/png/full/760-7604712_middle-finger-emoticon-fuck-you.png"
                style={{ maxHeight: "30px", marginLeft: "5px" }}
              />
            </h3>

        </div>
            <Link to="/help">
              {" "}
              <img
                src="https://cdn-icons-png.flaticon.com/512/189/189665.png"
                alt=""
                className="loguito"
              />
            </Link>
          </div>
      {/* <div style={{display:"flex", justifyContent:'center',width:"100"}}>
        <h4>{roomCode}</h4>
      </div> */}
      <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around', alignItems:'flex-end', marginBottom:'0px'}}>
        <div style={{ width: "600px", height:'470px', marginBottom:'50px'}}>
          <WaitingRoom usersRoom={usersRoom} monkeysArray={monkeysArray} roomCode={roomCode} socket={socket}/>
        </div>
        <div style={{ width: "420px", height:'530px' }}>
          <ChatRoom
            socket={socket}
            user={user}
            roomCode={roomCode}
            roomMessages={roomMessages}
            dispatch={dispatch}
            userPicture={userPicture}
            monkeysArray={monkeysArray}
            usersRoom={usersRoom}
          />
        </div>
      </div>
    </div>
  );
}
