import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllRooms, joinRoomId, newRoomReset, userInfo } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import aaa from "../../image/aaa.png";

import s from "./joinRoom.module.css";
import { Modal, Button, Form } from "react-bootstrap";

const JoinRoom = ({ socket }) => {
  const dispatch = useDispatch();
  const [allRooms, setAllRooms] = useState({});
  const [allRoomsAvailable, setAllRoomsAvailable] = useState([]); // sala1:{...}
  const [password, setPassword] = useState("");

  const userPicture = useSelector((state) => state.userPicture);
  const user = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);

  const passwordOnChange = (e) => {
    return setPassword(e.target.value);
  };

  const intialFunction = () => {
    socket.emit("all-rooms");
    
  };
  const separateRooms = (rooms) => {
    let filterRoom = [];
    if (rooms == {}) {
      return;
    }
    for (const key in rooms) {
      if (
        Object.keys(rooms[key].users).length < 10 &&
        rooms[key].status === "available" &&
        rooms[key].privacy === "public"
      ) {
        filterRoom = [...filterRoom, [key]];
        console.log("rooms filtrados", filterRoom);
      }
    }
    setAllRoomsAvailable(filterRoom);
  };
  useEffect(() => {
    intialFunction();
    socket.on("all-rooms", (rooms) => {
      setAllRooms(rooms);

      separateRooms(rooms);
    });

    return () => {
      socket.off("all-rooms");
    };
  }, []);
  let navigate = useNavigate();

  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState("");
  // useEffect(() => {
  //   dispatch(getAllRooms());
  // }, [dispatch]);

  // const allRooms = allRoomsArray
  //   .filter((e) => e.players >= 10)
  //   .map((e) => e.code);
  console.log(allRoomsAvailable);
  const joinRoomRandom = (e) => {
    if (!allRoomsAvailable.length) {
      return alert("No Hay ninguna sala disponible!");
    }
    e.preventDefault();
    
    const randomRoom = Math.random() * (allRoomsAvailable.length - 1); //numero aleatorio de entre las rooms
    const random = Math.round(randomRoom); //numero aleatorio de entre las rooms
    
    socket.emit("join-room", { idRoom: allRoomsAvailable[random] });
    socket.emit("new-user");
    
    dispatch(joinRoomId(allRoomsAvailable[random], false));
    navigate(`/play/${allRoomsAvailable[random]}`);
    
  };
  // console.log(allRooms);
  const onChange = (e) => {
    setRoomId(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(allRooms, "entro");
    if (!roomId) {
      setError("Ingrese el nombre de una sala");
      return;
    }
    if (!allRooms[roomId]) {
      setError("No se encontro ninguna sala");
      return;
    }
    if (allRooms[roomId].status !== "available") {
      setError("Dormiste, el juego ya inicio");
      return;
    }
    if (allRooms[roomId].privacy === "private") {
      setShowModal(true);
      return;
    }
    socket.emit("join-room", { idRoom: roomId });
    socket.emit("new-user");
    dispatch(joinRoomId(roomId, false));
    navigate(`/play/${roomId}`);
  };

  const joinRoom = () => {
    if (allRooms[roomId].password !== password) {
      return;
    } else {
      
      socket.emit("join-room", { idRoom: roomId });
      socket.emit("new-user");
      dispatch(joinRoomId(roomId, false));
      navigate(`/play/${roomId}`);
    }
  };

  return (
    <div className={s.backgroundJoinRoom}>
      <div>
        {/* {allRoomsAvailable?.map((e) => {
          for (const key in e) {
            return (
              <div>
                <h5>{key}</h5>
              </div>
            );
          }
        })} */}
      </div>
      <div className={s.contenedorArriba}>
        <h3>
          H.D.P.
          <img
            src="https://www.seekpng.com/png/full/760-7604712_middle-finger-emoticon-fuck-you.png"
            style={{ maxHeight: "30px", marginLeft: "5px" }}
          />
        </h3>
        <Link to="/help">
          {" "}
          <img
            src="https://cdn-icons-png.flaticon.com/512/189/189665.png"
            alt=""
            className={s.loguito}
          />
        </Link>
      </div>
      <div className={s.contenedorAbajo}>
        <div style={{ height: "100%" }}>
          <img
            className={s.monito}
            style={{ height: "600px" }}
            src={aaa}
            alt=""
          />
        </div>
        <div className={s.btnContainer}>
          {" "}
          {/* ESTE */}
          <div className={s.Joinbtncont}>
            <button onClick={(e) => joinRoomRandom(e)} className={s.buttonJoin}>
              Unirse a sala aleatoria
            </button>
          </div>
          <div className={s.containerInput}>
            <form onSubmit={(e) => onSubmit(e)} className={s.formJoin}>
              <input
              className={s.joinInput}
                type="text"
                name="roomCode"
                value={roomId}
                placeholder="Ingrese el código de la sala"
                onChange={(e) => onChange(e)}
              />
            {error ? <h5 className={s.error}>{error}</h5> : null}

              <button type="submit" className={s.buttonJoin1} >Unirse</button>
            </form>
            <Modal
              show={showModal}
              onHide={handleClose}
              size="sm"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Ingrese a la sala</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h5>Contraseña:</h5>
                <input
                  type="text"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => passwordOnChange(e)}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cerrar
                </Button>
                <Button variant="primary" onClick={joinRoom}>
                  Unirse
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>{" "}
        {/* CIERRA ACA */}
      </div>{" "}
      {/* ACA CIERRA CONTENEDOR_ABAJO */}
    </div>
  );
};

export default JoinRoom;
