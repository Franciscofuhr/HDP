import React, { useState } from "react";
import { Link } from "react-router-dom";
import paraloco from "../../image/para loco.png";
import aaa from "../../image/aaa.png";
import "./landing.css";
import { Modal, Button } from "react-bootstrap";

const Landing = () => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);

  return (
    <div className="landing">
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
      <div className="contenedorDivs">
        <div style={{ width: "50%" }}>
          <h3 className="titulo" style={{ marginTop: "90px" }}>
            El juego ideal para tu
          </h3>
          <h3 className="titulo"> niño interior</h3>
          <p className="subTitulo">(Si tu niño interior es un HDP)</p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <Link to="/login">
              <button className="Bottom-Link">
                Jugá hasta donde te la banques!
              </button>
            </Link>
            <div className="Content-Bottoms">
              <button
                onClick={() => setShowModal(true)}
                className="Bottom-sponsor"
              >
                <img
                  style={{
                    maxHeight: "40px",
                    maxWidth: "40px",
                    filter: "invert(100%)",
                  }}
                  src={"https://cdn-icons-png.flaticon.com/512/2/2235.png"}
                />
                <div style={{ marginLeft: "8px" }}>
                  <p style={{ margin: "0", padding: "0" }}>Download on the </p>
                  <p style={{ margin: "0", padding: "0", fontWeight: "700" }}>
                    AppStore
                  </p>
                </div>
              </button>
              <Modal
                show={showModal}
                onHide={handleClose}
                aria-labelledby="contained-modal-title-vcenter"
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
                centered
              >
                {/* <Modal.Header closeButton>
                  <Modal.Title>Pará loco, todavía no está listo</Modal.Title>
                </Modal.Header> */}
                <Modal.Body style={{ width: "100%", padding: "0px" }}>
                  <img
                    style={{ padding: "0px", width: "100%" }}
                    src={paraloco}
                    alt=""
                  />
                </Modal.Body>
                {/* <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                  </Button>
                </Modal.Footer> */}
              </Modal>
              <button
                onClick={() => setShowModal(true)}
                className="Bottom-sponsor"
              >
                <img
                  style={{
                    maxHeight: "40px",
                    maxWidth: "40px",
                    filter: "invert(100%)",
                  }}
                  src={"https://cdn-icons-png.flaticon.com/512/732/732208.png"}
                />
                <div style={{ marginLeft: "8px" }}>
                  <p style={{ margin: "0", padding: "0" }}>GET IT ON </p>
                  <p style={{ margin: "0", padding: "0", fontWeight: "700" }}>
                    GooglePlay
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div style={{ height: "100%" }}>
          <img src={aaa} className="monito" />
        </div>
      </div>
    </div>
  );
};

export default Landing;
