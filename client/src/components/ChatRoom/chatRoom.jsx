import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../redux/actions";
import ch from "./chatRoom.module.css";

const ChatRoom = ({
  socket,
  roomCode,
  user,
  setRoomMessages,
  roomMessages,
  dispatch,
  userPicture,
  monkeysArray,
  usersRoom,
}) => {
  const arrayOfColors = [
    "#292D59",
    "#2EC0CF",
    "#639FD3",
    "#7278BB",
    "#9A7BDD",
    "#C826BF",
    "#CB5BE1",
    "#FED048",
  ];
  //"#212350",
  // pense aca que segun la posicion de array userRoom se le asigna un color distinto al background que tiene el mensaje
  //no esta hecho , cada mensaje tiene una propiedad de fromUser que esta en true si lo mando el usuario
  //(para identificar si el mensaje en el array es de la persona y meterlo a la derecha, como en wapp)

  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);
  function handleChange(e) {
    setMessage(e.target.value);
  }
  const submitMessage = (e) => {
    e.preventDefault();
    if (!message) {
      return;
    }
    console.log("entre aca en el submit1");
    dispatch(
      sendMessage({
        message: message,
        name: user,
        fromSelf: true,
        userPicture: userPicture,
      })
    );
    console.log("entre aca en el submit 2");
    setMessage("");
    socket.emit("send-chat-message", { room: roomCode, message: message });
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [roomMessages.length]);

  return (
    <div className={ch.backgroundchat}>
      <div
        className={ch.chatInfo}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1 className={ch.roomCode}>Sala: {roomCode}</h1>
      </div>
      <div className={ch.displayChat}>
        {roomMessages?.map((message) => {
          return message.fromSelf ? (
            <div className={ch.messageSelf}>
              <div
                className={ch.messageSelfContainer}
                style={{
                  backgroundColor:
                    arrayOfColors[
                      (message.userPicture + message.name.length) %
                        arrayOfColors.length
                    ],
                }}
              >
                <div className={ch.messageContainer}>
                  <p className={ch.message}>{message.message}</p>
                </div>
                <div className={ch.user}>
                  {/* <div> */}
                  <img
                    src={monkeysArray[message.userPicture]}
                    style={{ width: "40px" }}
                  />
                  {/* </div> */}
                  {/* <p >{message.name}</p> */}
                </div>
              </div>
            </div>
          ) : (
            <div className={ch.messageOther}>
              <div
                className={ch.messageOtherContainer}
                style={{
                  backgroundColor:
                    arrayOfColors[
                      (message.userPicture + message.name.length) %
                        arrayOfColors.length
                    ],
                }}
              >
                <div className={ch.user}>
                  <div>
                    <img
                      src={monkeysArray[message.userPicture]}
                      style={{ width: "40px" }}
                    />
                  </div>
                  {/* <div>
                  <p>{message.name}</p>
                </div> */}
                </div>
                <div className={ch.messageContainer}>
                  <p className={ch.message}>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef}></div>
      </div>
      <div className={ch.chatmessagecontainer}>
        <div className={ch.chatmessage}>
          <form onSubmit={(e) => submitMessage(e)}>
            <input
              name="message"
              placeholder="Escribi tu mensaje"
              onChange={(e) => handleChange(e)}
              value={message}
              className={ch.inputchat}
            ></input>
            <button
              type="submit"
              style={{
                border: "none",
                backgroundColor: "#D9D9D9",
                borderColor: "#D9D9D9",
                fontWeight: "semi-bold",
              }}
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
