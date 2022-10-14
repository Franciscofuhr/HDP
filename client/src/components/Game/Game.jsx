import React, { useState } from "react";
import { useEffect } from "react";




const Game = ({ socket }) => {
    

    useEffect(() => {
        socket.on("room-info", roomInformation);
        socket.on("user-connected", handleUserConnectedOrDisc);
    
        //   // socket.on("", handleUsers);
    
        socket.on("user-disconnected", handleUserConnectedOrDisc);
    
        socket.on("chat-message", handleChatMessage);
    
        return () => {
          socket.off("connection");
          socket.off("chat-message");
          // socket.off("user connected");
          // socket.off("users");
          // socket.off("private message");
          // socket.off("user disconnected");
        };
      }, []);


    return (
      <div >
        
      </div>
    );
  };
  
  export default Game;