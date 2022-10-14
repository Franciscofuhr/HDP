import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { joinRoomId, newRoomReset, userInfo } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
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
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import s from "./login.module.css";
import generator from "../../functions/generateCode";
import aaa from "../../image/aaa.png";
import { Modal, Button, Form } from "react-bootstrap";
import { useEffect } from "react";

const Login = ({ socket }) => {
  const leaveRooms = () => {
    socket.emit("out-of-room");
    dispatch(newRoomReset());
  };
  useEffect(() => {
    leaveRooms();
  });
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [selected, setSelected] = useState("public");
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(""); //name
  const [indiceImage, setIndiceImage] = useState(0);
  // const [monitoPicture, setMonitoPicture] = useState(monkeysArray[0]);
  const users = useSelector((state) => state.user);
  const roomCode = useSelector((state) => state.roomCode);
  console.log(users, "user", roomCode, "room");

  const handleClose = () => setShowModal(false);
  const handleShow = () => {
    if (!user) {
      return;
    }
    setPassword(null);
    setShowModal(true);
  };
  const onChange = (e) => {
    return setUser(e.target.value);
  };
  const passwordOnChange = (e) => {
    return setPassword(e.target.value);
  };
  const onChangeStatus = (e) => {
    if (e.target.value === "public") {
      setPassword(null);
      setSelected("public");
    } else {
      setSelected("private");
    }
  };

  const joinRoom = () => {
    if (!user) {
      return;
    }
    dispatch(userInfo({ name: user, picture: indiceImage }));
    socket.emit("user-created", { name: user, userPicture: indiceImage }); //emite datos del usuario para el perfil de socket
    navigate(`/joinRoom`);
  };

  const createRoom = () => {
    if (!user) {
      return;
    }
    let room = generator(6);
    dispatch(userInfo({ name: user, picture: indiceImage }));
    dispatch(joinRoomId(room));
    socket.emit("user-created", {
      name: user,
      userPicture: indiceImage,
      idRoom: room,
    }); //emite datos del usuario para el perfil de socket
    socket.emit("new-user", password);

    navigate(`/play/${room}`); //
  };
  return (
    <div className={s.backgroundlogin}>
      <div>
        <div>
          <div className="contenedorArriba">
            <div className="logo">
              <h1 className="hdp">H.D.P</h1>
              <img
                style={{ width: "30px" }}
                src="https://www.seekpng.com/png/full/760-7604712_middle-finger-emoticon-fuck-you.png"
                alt=""
              />
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
        </div>
        <div className={s.contenedorAbajo}>
          <div style={{ height: "100%" }}>
            <img
              className={s.monito}
              // style={{ height: "600px" }}
              src={aaa}
              alt=""
            />
          </div>
          <div className={s.entrar}>
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={0}
              slidesPerView={1}
              navigation
              onSlideChange={(e) => setIndiceImage(e.realIndex)}
              onSwiper={(swiper) => console.log(swiper)}
              loop={true}
              style={{
                width: "250px",
                backgroundColor: "#6F5E70",
                borderRadius: "20px",
                height: "170px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <SwiperSlide>
                <img
                  style={{ width: "250px", marginLeft: "15px" }}
                  src={monito1}
                  alt=""
                />
              </SwiperSlide>
              <SwiperSlide>
                <img style={{ width: "150px" }} src={monito2} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img style={{ width: "150px" }} src={monito3} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img style={{ width: "150px" }} src={monito4} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img style={{ width: "150px" }} src={monito5} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img style={{ width: "150px" }} src={monito6} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img style={{ width: "150px" }} src={monito7} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img style={{ width: "200px" }} src={monito8} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img style={{ width: "150px" }} src={monito9} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img style={{ width: "150px" }} src={monito10} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img style={{ width: "150px" }} src={monito11} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img style={{ width: "250px" }} src={monito12} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  style={{ width: "200px", marginLeft: "30px" }}
                  src={monito13}
                  alt=""
                />
              </SwiperSlide>
            </Swiper>
            <input
              type="text"
              name="name"
              value={user}
              placeholder="Nombre de usuario"
              onChange={(e) => onChange(e)}
              className={s.input}
            />
            <div className={s.btncontainer}>
              <button
                onClick={joinRoom}
                className={s.button}
                style={{ marginTop: "70px" }}
              >
                Unirse a una sala
              </button>
              <button className={s.button} onClick={handleShow}>
                Crear sala
              </button>
              <Modal
                show={showModal}
                onHide={handleClose}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title className={s.modalTitle}>
                    Configure su sala
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body
                  style={{ display: "flex", justifyContent: "center", flexDirection:'column' }}
                >
                  <div>
                    <label style={{ marginRight: "20px" }}>
                      <input
                        type="radio"
                        value="public"
                        name="privacy"
                        onChange={(e) => onChangeStatus(e)}
                      />{" "}
                      Sala pública
                    </label>
                    <label style={{ marginRight: "20px" }}>
                      <input
                        type="radio"
                        value="private"
                        name="privacy"
                        onChange={(e) => onChangeStatus(e)}
                      />{" "}
                      Sala privada
                    </label>
                  </div>
                  {selected === "private" ? (
                    <input
                    className={s.inputpsw}
                      type="text"
                      placeholder="Contraseña"
                      value={password}
                      onChange={(e) => passwordOnChange(e)}
                    />
                  ) : null}
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={handleClose}
                    className={s.buttonCerrar}
                  >
                    Cerrar
                  </Button>
                  <Button
                    variant="primary"
                    onClick={createRoom}
                    className={s.buttonCrear}
                  >
                    Crear Sala
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
