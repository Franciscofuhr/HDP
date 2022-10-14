import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ChatRoom from "../ChatRoom/chatRoom";
import { useDispatch } from "react-redux";
import {
  cardPlayed,
  cardWinner,
  gameWinner,
  kingRoundSetting,
  roomInformation,
  sendMessage,
  userConnectedOrDisc,
} from "../../redux/actions";
import s from "./PlayGame.module.css";
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
import "./PlayGame.css";
import { useNavigate } from "react-router-dom";
import HorizontalScroll from "react-scroll-horizontal";
import playCard from "../../utils/flipcard-91468.mp3"
import soundWinRound from "../../utils/winRoundSound.mp3"
import Countdown from '../Timer/Timer.jsx'

export default function PlayGame({ socket }) {
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const roomCode = useSelector((state) => state.roomCode);
  const roomMessages = useSelector((state) => state.messages);
  const userPicture = useSelector((state) => state.userPicture);
  const usersRoom = useSelector((state) => state.usersRoom);
  const roomInfo = useSelector((state) => state.roomInfo);
  const [dataFromRoom, setDataFromRoom] = useState({});
  const [vote, setVote] = useState(true);
  const [kingChooses, setKingChooses] = useState(false);
  const givecard= new Audio(playCard)
  const [iAmKingRound, setIAmKingRound] = useState(false);
  const [kingRound, setKingRound] = useState({});
  const [blackCard, setBlackCard] = useState("");
  const winround=new Audio(soundWinRound)
  winround.volume=0.5
  givecard.volume=0.5

  const dispatch = useDispatch();
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
  const gameCards = (gameCardss) => {
    // console.log("entrooooooooooooooooo", gameCardss);
    setCards(gameCardss);
    
  };
  useEffect(() => {
    socket.emit("asking-cards");
    socket.emit("room-info");
    socket.on("asking-cards", gameCards);
  }, []);
  useEffect(() => {
    socket.on("ask-for-cards", () => {
      socket.emit("asking-cards");
    });
    socket.on("room-info", userRoomInformation);
    // socket.on("user-connected", handleUserDisconnected);
    socket.on("user-disconnected", handleUserDisconnected);
    socket.on("king-choose", () => {
      console.log("entre yo");
      setIAmKingRound(true);
    });

    socket.on("king-round", ({ blackCard, kingId }) => {
      console.log(kingId, blackCard);
      dispatch(kingRoundSetting(kingId));
      setIAmKingRound(false);
      setKingRound(kingId);
      setBlackCard(blackCard[0]);
    });
    socket.on("play-card", cardPlay); 
    socket.on("winner-card", winnerRound); 

    socket.on("chat-message", handleChatMessage);
    socket.on("king-chooses", kingStartChoosing);
    socket.on("start-round", resetRound);
    socket.on("end-game", endGame);

    return () => {
      socket.off("connection");
      socket.off("chat-message");
    };
  }, []);
  const endGame = (nameWinnerGame) => {
    dispatch(gameWinner(nameWinnerGame));
    navigate(`/endGame/${roomCode}`);
  };
  const winnerRound = (info) => {
    console.log("me llego", info);
    dispatch(cardWinner(info.winner));
    winround.play()
  };
  const resetRound = (room) => {
    setKingChooses(false);
    setIAmKingRound(false);
    dispatch(roomInformation(room));
    setVote(false);
    givecard.play()
  };
  const cardPlay = (arrayCards) => {
    dispatch(cardPlayed(arrayCards));
  };
  const userRoomInformation = (roomInfo) => {
    dispatch(roomInformation(roomInfo));
  };
  const handleUserDisconnected = ({ socketid }) => {
    console.log(socketid);
    dispatch(userConnectedOrDisc(socketid));
  };

  const handleChatMessage = (message) => {
    dispatch(sendMessage(message));
  };
  const selectCard = (card) => {
    if (iAmKingRound) {
      return;
    }
    if (vote === false) {
      
      socket.emit("play-cards", { room: roomCode, card: card });
      setVote(true);
    }
  };

  const kingStartChoosing = () => {
    console.log("el rey tiene que votar");
    setKingChooses(true);
  };
  const kingChoice = (card) => {
    setKingChooses(false);
    socket.emit("king-choice", card);
  };

  console.log(usersRoom, "soy US");

  return (
    <div className="landing"  >
      {
        !blackCard ?  <Countdown kingChooses={kingChooses} startingSeconds={11} boolean={false}></Countdown> : 
        kingChooses ? <Countdown kingChooses={kingChooses} startingSeconds={45} boolean={true}></Countdown> :
         <Countdown kingChooses={kingChooses} startingSeconds={45} boolean={false}></Countdown>
      }
     
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className={s.blackCard} style={{ marginLeft: "15px", marginTop: "15px" }}>
          {blackCard ? <h1 className={s.blackCardText}>{blackCard}</h1> : null}
          {usersRoom
            ? usersRoom.map((e) => {
                return (
                  <div className={s.monitoYnombre}>
                    {e.kingRound ? (
                      <div className={s.pestañaInf}>
                        {/* <img src={monkeysArray[e.userPicture]} alt="" style={{width:'25px'}} /> */}
                        <p className={s.nombreKing}>{e.name}</p>
                      </div>
                    ) : null}
                  </div>
                );
              })
            : null}
        </div>
        <div
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          {usersRoom
            ? usersRoom.map((e) => {
                return (
                  <div
                    style={{
                      width: "240px",
                      borderRadius: "10px",
                      height: "180px",
                      paddingTop: "20px",
                      marginLeft: "15px",
                      marginBottom: "10px",
                    }}
                  >
                    {/*carta ganadora*/}
                    {e.selectCard && e.cardRoundWinner ? (
                      <div
                        style={{
                          backgroundColor: "rgba(71, 186, 0, 1)",
                          borderRadius: "10px",
                          paddingTop: "20px",
                          paddingBottom: "20px",
                          height: "180px",
                        }}
                      >
                        <div
                          style={{
                            margin: "0 15px",
                            backgroundColor: "rgba(217, 217, 217, 1)",
                            borderRadius: "20px",
                            paddingRight: "15px",
                            paddingTop: "10px",
                            height: "140px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "flex-end",
                              height: "40px",
                            }}
                          >
                            <h5>{e.name}</h5>
                          </div>
                          <div style={{ height: "100%" }}>
                            <div
                              style={{
                                width: "100%",
                                fontSize: "18px",
                                textAlign: "center",
                                fontFamily: "Jockey One, sans-serif",
                                marginBottom: "20px",
                              }}
                            >
                              {e.selectCard}
                            </div>
                            {kingChooses && iAmKingRound ? (
                              <div
                                style={{
                                  height: "100%",
                                  alignItems: "flex-end",
                                }}
                              >
                                <button
                                  style={{
                                    padding: "3px 15px",
                                    border: "none",
                                    backgroundColor: "rgba(33, 35, 80, 1)",
                                    color: "white",
                                    borderRadius: "10px",
                                  }}
                                  onClick={() =>
                                    kingChoice({
                                      card: e.selectCard,
                                      name: e.name,
                                      socketId: e.key,
                                    })
                                  }
                                >
                                  Seleccionar
                                </button>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    ) : e.kingRound ? (
                      // REyy
                      <div
                        style={{
                          backgroundColor: "black",
                          borderRadius: "10px",
                          paddingTop: "20px",
                          paddingBottom: "20px",
                          height: "180px",
                        }}
                      >
                        <div
                          style={{
                            margin: "0 15px",
                            backgroundColor: "rgba(217, 217, 217, 1)",
                            borderRadius: "20px",
                            paddingRight: "15px",
                            paddingTop: "10px",
                            height: "100px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "flex-end",
                              height: "40px",
                            }}
                          >
                            <h5>{e.name}</h5>
                          </div>
                          {/* <h5>{e.points}</h5> */}
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-beetwen",
                              height: "122%",
                              alignItems: "flex-end",
                            }}
                          >
                            <img
                              src={monkeysArray[e.userPicture]}
                              alt=""
                              style={{
                                objectFit: "cover",
                                height: "140px",
                                maxWidth: "110px",
                              }}
                            />
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                paddingBottom: "15px",
                              }}
                            >
                              {e.points == 0 ? null : e.points == 1 ? (
                                <img
                                  src="https://www.seekpng.com/png/full/760-7604712_middle-finger-emoticon-fuck-you.png"
                                  style={{
                                    maxHeight: "20px",
                                    marginLeft: "5px",
                                  }}
                                />
                              ) : e.points == 2 ? (
                                <div>
                                  <img
                                    src="https://www.seekpng.com/png/full/760-7604712_middle-finger-emoticon-fuck-you.png"
                                    style={{
                                      maxHeight: "20px",
                                      marginLeft: "5px",
                                    }}
                                  />
                                  <img
                                    src="https://www.seekpng.com/png/full/760-7604712_middle-finger-emoticon-fuck-you.png"
                                    style={{
                                      maxHeight: "20px",
                                      marginLeft: "5px",
                                    }}
                                  />
                                </div>
                              ) : e.points == 3 ? (
                                <div>
                                  <img
                                    src="https://www.seekpng.com/png/full/760-7604712_middle-finger-emoticon-fuck-you.png"
                                    style={{
                                      maxHeight: "20px",
                                      marginLeft: "5px",
                                    }}
                                  />
                                  <img
                                    src="https://www.seekpng.com/png/full/760-7604712_middle-finger-emoticon-fuck-you.png"
                                    style={{
                                      maxHeight: "20px",
                                      marginLeft: "5px",
                                    }}
                                  />
                                  <img
                                    src="https://www.seekpng.com/png/full/760-7604712_middle-finger-emoticon-fuck-you.png"
                                    style={{
                                      maxHeight: "20px",
                                      marginLeft: "5px",
                                    }}
                                  />
                                </div>
                              ) : e.points == 4 ? (
                                <div>
                                  <img
                                    src="https://www.seekpng.com/png/full/760-7604712_middle-finger-emoticon-fuck-you.png"
                                    style={{
                                      maxHeight: "20px",
                                      marginLeft: "5px",
                                    }}
                                  />
                                  <img
                                    src="https://www.seekpng.com/png/full/760-7604712_middle-finger-emoticon-fuck-you.png"
                                    style={{
                                      maxHeight: "20px",
                                      marginLeft: "5px",
                                    }}
                                  />
                                  <img
                                    src="https://www.seekpng.com/png/full/760-7604712_middle-finger-emoticon-fuck-you.png"
                                    style={{
                                      maxHeight: "20px",
                                      marginLeft: "5px",
                                    }}
                                  />
                                  <img
                                    src="https://www.seekpng.com/png/full/760-7604712_middle-finger-emoticon-fuck-you.png"
                                    style={{
                                      maxHeight: "20px",
                                      marginLeft: "5px",
                                    }}
                                  />
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        {/* <h5>{e.key}</h5> */}
                      </div>
                    ) : e.selectCard ? (
                      //ELIGIO
                      <div
                        style={{
                          backgroundColor: "rgba(200, 38, 191, 1)",
                          borderRadius: "10px",
                          paddingTop: "20px",
                          paddingBottom: "20px",
                          height: "180px",
                        }}
                      >
                        {kingChooses ? (
                          <div
                            style={{
                              margin: "0 15px",
                              backgroundColor: "rgba(217, 217, 217, 1)",
                              borderRadius: "20px",
                              paddingRight: "15px",
                              paddingTop: "10px",
                              height: "140px",
                            }}
                          >
                            <div
                              style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "flex-end",
                                height: "40px",
                              }}
                            >
                              <h5>{e.name}</h5>
                            </div>
                            <div style={{ height: "100%" }}>
                              <div
                                style={{
                                  width: "100%",
                                  fontSize: "18px",
                                  textAlign: "center",
                                  fontFamily: "Jockey One, sans-serif",
                                  marginBottom: "10px",
                                }}
                              >
                                {e.selectCard}
                              </div>
                              {kingChooses && iAmKingRound ? (
                                <div
                                  style={{
                                    height: "100%",
                                    alignItems: "flex-end",
                                  }}
                                >
                                  <button
                                    style={{
                                      padding: "3px 15px",
                                      border: "none",
                                      backgroundColor: "rgba(33, 35, 80, 1)",
                                      color: "white",
                                      borderRadius: "10px",
                                    }}
                                    onClick={() =>
                                      kingChoice({
                                        card: e.selectCard,
                                        name: e.name,
                                        socketId: e.key,
                                      })
                                    }
                                  >
                                    Seleccionar
                                  </button>
                                </div>
                              ) : null}
                            </div>
                          </div>
                        ) : (
                          <div
                            style={{
                              margin: "0 15px",
                              backgroundColor: "rgba(217, 217, 217, 1)",
                              borderRadius: "20px",
                              paddingRight: "15px",
                              paddingTop: "10px",
                              height: "100px",
                            }}
                          >
                            <div
                              style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "flex-end",
                                height: "40px",
                              }}
                            >
                              <h5>{e.name}</h5>
                            </div>
                            {/* {kingChooses ? 
                      <div style={{width: '150px', fontSize: '20px', textAlign: 'center', fontFamily: 'Jockey One, sans-serif'}}>{e.selectCard}</div> 
                        :  */}
                            <div
                              style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-beetwen",
                                height: "122%",
                                alignItems: "flex-end",
                              }}
                            >
                              <img
                                src={monkeysArray[e.userPicture]}
                                alt=""
                                style={{
                                  objectFit: "cover",
                                  height: "140px",
                                  maxWidth: "110px",
                                }}
                              />
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  paddingBottom: "15px",
                                }}
                              >
                                {e.points == 0 ? null : e.points == 1 ? (
                                  <img
                                    src="https://www.seekpng.com/png/full/760-7604712_middle-finger-emoticon-fuck-you.png"
                                    style={{
                                      maxHeight: "20px",
                                      marginLeft: "5px",
                                    }}
                                  />
                                ) : e.points == 2 ? (
                                  <div>
                                    <img
                                      src="https://www.seekpng.com/png/full/760-7604712_middle-finger-emoticon-fuck-you.png"
                                      style={{
                                        maxHeight: "20px",
                                        marginLeft: "5px",
                                      }}
                                    />
                                    <img
                                      src="https://www.seekpng.com/png/full/760-7604712_middle-finger-emoticon-fuck-you.png"
                                      style={{
                                        maxHeight: "20px",
                                        marginLeft: "5px",
                                      }}
                                    />
                                  </div>
                                ) : e.points == 3 ? (
                                  <div>
                                    <img
                                      src="https://www.seekpng.com/png/full/760-7604712_middle-finger-emoticon-fuck-you.png"
                                      style={{
                                        maxHeight: "20px",
                                        marginLeft: "5px",
                                      }}
                                    />
                                    <img
                                      src="https://www.seekpng.com/png/full/760-7604712_middle-finger-emoticon-fuck-you.png"
                                      style={{
                                        maxHeight: "20px",
                                        marginLeft: "5px",
                                      }}
                                    />
                                    <img
                                      src="https://www.seekpng.com/png/full/760-7604712_middle-finger-emoticon-fuck-you.png"
                                      style={{
                                        maxHeight: "20px",
                                        marginLeft: "5px",
                                      }}
                                    />
                                  </div>
                                ) : e.points == 4 ? (
                                  <div>
                                    <img
                                      src="https://www.seekpng.com/png/full/760-7604712_middle-finger-emoticon-fuck-you.png"
                                      style={{
                                        maxHeight: "20px",
                                        marginLeft: "5px",
                                      }}
                                    />
                                    <img
                                      src="https://www.seekpng.com/png/full/760-7604712_middle-finger-emoticon-fuck-you.png"
                                      style={{
                                        maxHeight: "20px",
                                        marginLeft: "5px",
                                      }}
                                    />
                                    <img
                                      src="https://www.seekpng.com/png/full/760-7604712_middle-finger-emoticon-fuck-you.png"
                                      style={{
                                        maxHeight: "20px",
                                        marginLeft: "5px",
                                      }}
                                    />
                                    <img
                                      src="https://www.seekpng.com/png/full/760-7604712_middle-finger-emoticon-fuck-you.png"
                                      style={{
                                        maxHeight: "20px",
                                        marginLeft: "5px",
                                      }}
                                    />
                                  </div>
                                ) : null}
                              </div>

                              {/* <h5>{e.key}</h5> */}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      //PENDING
                      <div
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.31)",
                          borderRadius: "10px",
                          paddingTop: "20px",
                          paddingBottom: "20px",
                          height: "180px",
                        }}
                      >
                        <div
                          style={{
                            margin: "0 15px",
                            backgroundColor: "rgba(217, 217, 217, 1)",
                            borderRadius: "20px",
                            paddingRight: "15px",
                            paddingTop: "10px",
                            height: "100px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "flex-end",
                              height: "40px",
                            }}
                          >
                            <h5>{e.name}</h5>
                          </div>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-beetwen",
                              height: "122%",
                              alignItems: "flex-end",
                            }}
                          >
                            <img
                              src={monkeysArray[e.userPicture]}
                              alt=""
                              style={{
                                objectFit: "cover",
                                height: "140px",
                                maxWidth: "110px",
                              }}
                            />

                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                paddingBottom: "15px",
                              }}
                            >
                              {e.points == 0 ? null : e.points == 1 ? (
                                <img
                                  src="https://www.seekpng.com/png/full/760-7604712_middle-finger-emoticon-fuck-you.png"
                                  style={{
                                    maxHeight: "20px",
                                    marginLeft: "5px",
                                  }}
                                />
                              ) : e.points == 2 ? (
                                <div>
                                  <img
                                    style={{
                                      maxHeight: "20px",
                                      marginLeft: "5px",
                                    }}
                                    src="https://www.seekpng.com/png/full/760-7604712_middle-finger-emoticon-fuck-you.png"
                                  />
                                  <img
                                    src="https://www.seekpng.com/png/full/760-7604712_middle-finger-emoticon-fuck-you.png"
                                    style={{
                                      maxHeight: "20px",
                                      marginLeft: "5px",
                                    }}
                                  />
                                </div>
                              ) : e.points == 3 ? (
                                <div>
                                  <img
                                    src="https://www.seekpng.com/png/full/760-7604712_middle-finger-emoticon-fuck-you.png"
                                    style={{
                                      maxHeight: "20px",
                                      marginLeft: "5px",
                                    }}
                                  />
                                  <img
                                    src="https://www.seekpng.com/png/full/760-7604712_middle-finger-emoticon-fuck-you.png"
                                    style={{
                                      maxHeight: "20px",
                                      marginLeft: "5px",
                                    }}
                                  />
                                  <img
                                    src="https://www.seekpng.com/png/full/760-7604712_middle-finger-emoticon-fuck-you.png"
                                    style={{
                                      maxHeight: "20px",
                                      marginLeft: "5px",
                                    }}
                                  />
                                </div>
                              ) : e.points == 4 ? (
                                <div>
                                  <img
                                    src="https://www.seekpng.com/png/full/760-7604712_middle-finger-emoticon-fuck-you.png"
                                    style={{
                                      maxHeight: "20px",
                                      marginLeft: "5px",
                                    }}
                                  />
                                  <img
                                    src="https://www.seekpng.com/png/full/760-7604712_middle-finger-emoticon-fuck-you.png"
                                    style={{
                                      maxHeight: "20px",
                                      marginLeft: "5px",
                                    }}
                                  />
                                  <img
                                    src="https://www.seekpng.com/png/full/760-7604712_middle-finger-emoticon-fuck-you.png"
                                    style={{
                                      maxHeight: "20px",
                                      marginLeft: "5px",
                                    }}
                                  />
                                  <img
                                    src="https://www.seekpng.com/png/full/760-7604712_middle-finger-emoticon-fuck-you.png"
                                    style={{
                                      maxHeight: "20px",
                                      marginLeft: "5px",
                                    }}
                                  />
                                </div>
                              ) : e.points == 5 ? (
                                <div>
                                  <img
                                    src="https://www.seekpng.com/png/full/760-7604712_middle-finger-emoticon-fuck-you.png"
                                    style={{
                                      maxHeight: "20px",
                                      marginLeft: "5px",
                                    }}
                                  />
                                  <img
                                    src="https://www.seekpng.com/png/full/760-7604712_middle-finger-emoticon-fuck-you.png"
                                    style={{
                                      maxHeight: "20px",
                                      marginLeft: "5px",
                                    }}
                                  />
                                  <img
                                    src="https://www.seekpng.com/png/full/760-7604712_middle-finger-emoticon-fuck-you.png"
                                    style={{
                                      maxHeight: "20px",
                                      marginLeft: "5px",
                                    }}
                                  />
                                  <img
                                    src="https://www.seekpng.com/png/full/760-7604712_middle-finger-emoticon-fuck-you.png"
                                    style={{
                                      maxHeight: "20px",
                                      marginLeft: "5px",
                                    }}
                                  />
                                  <img
                                    src="https://www.seekpng.com/png/full/760-7604712_middle-finger-emoticon-fuck-you.png"
                                    style={{
                                      maxHeight: "20px",
                                      marginLeft: "5px",
                                    }}
                                  />
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>

                        {/* <h5>{e.key}</h5> */}
                      </div>
                    )}
                    {/* {e.selectCard ? (
                    <div style={{ backgroundColor: "black" }}>
                      <h5>{e.name}</h5>
                      <h5>{e.points}</h5>
                      <h5>{e.key}</h5>
                      <h5>{e.selectCard}</h5>
                      {kingChooses && iAmKingRound ? (
                        <button
                          onClick={() =>
                            kingChoice({
                              card: e.selectCard,
                              name: e.name,
                              socketId: e.key,
                            })
                          }
                        >
                          Seleccionar
                        </button>
                      ) : null}
                    </div>
                  ) : (
                    <div style={{ backgroundColor: "red" }}>
                      <h5>{e.name}</h5>
                      <h5>{e.points}</h5>
                      <h5>{e.key}</h5>
                    </div>
                  )} */}
                  </div>
                );
              })
            : null}
        </div>
      </div>
      
      <div className={s.chatAndCards}>

    
          < div className={s.Whitecards}>
            {cards?.map((elem) => {
              return (
                <div className="selectCards">
                  <div style={{ height: "210px", wordBreak:"break-word", textAlign:"start"}} >
                    <h3 className={s.textCard} style={{ fontSize: "22px" }}>
                      {elem.charAt(0).toUpperCase() + elem.slice(1)}
                    </h3>
                  </div>
                  <div className="selectBoton" style={{ height: "30px" }}>
                    {vote === false && !iAmKingRound && !kingChooses ? (
                      <button
                        className="button"
                        onClick={() => selectCard(elem)}
                      >
                        Seleccionar{" "}
                      </button>
                    ) : (
                      <button
                        className="button"
                        disabled
                        style={{ backgroundColor: "grey" }}
                        onClick={() => selectCard(elem)}
                      >
                        Seleccionar{" "}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
     
      <div style={{ width: "400px", height: "480px",marginRight:"30px" }}>
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
