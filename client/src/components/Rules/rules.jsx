import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import png18 from '../../utils/+18.png'
import s from './rules.module.css'
import monito from '../../utils/monito.png'
import arrowLeft from '../../utils/arrow.png'


export default function Rules() {


    return (
        <div className={s.container}>
            <div className={s.backAndName}>
                <div>
                    <Link to="/"><img src={arrowLeft} alt="Back home" className={s.arrowLeft} /></Link>
                </div>
                <div className={s.logo}>
                    <h1 className={s.hdp}>H.D.P</h1>
                    <img style={{ width: '30px' }} src="https://www.seekpng.com/png/full/760-7604712_middle-finger-emoticon-fuck-you.png" alt="" />
                </div>
            </div>
            <div className={s.textmonito}>
                <div className={s.rulescont}>
                    <div className={s.text}>
                        <div className={s.rulesTitleAnd}>
                        <p style={{ fontWeight: '500' }} className={s.reglas}>REGLAS</p>
                        <div>
                        {/* marginRight: '25px', marginBottom: '25px' */}
                        <img src={png18} alt='+18' style={{ width: '50px', marginTop:'20px' }} />
                        </div>

                        </div>
                        <p>
                            La cosa es fácil: se reparten <b>10 cartas de respuesta a cada jugador</b> . <br />
                            La persona que crea la sala es el <b>HDP</b> inicial. En su turno el HDP asigna una carta de inicio de frase, cada uno de los demás jugadores tiene que eligir una carta de respuesta de su mano y seleccionarla.
                            La idea es jugar la respuesta más divertida, absurda, disparatada (?) o bardera que tenga.<br />
                            Una vez que todos seleccionen una respuesta, <b>el HDP elije</b>  la que más le gustó ya sea por que lo hizo reír más, porque fue la más zarpada o por la razón que se le cante.<br />
                            El que haya jugado esa carta <b>gana un punto</b>.<br />
                            Al finalizar el turno se le reparten cartas hasta volver a tener 10.<br />
                            El siguiente turno es igual pero el HDP será el jugador que está a la izquierda del anterior. Y así susesivamente...<br />
                            Se juega hasta que todos los jugadores hayan sido HDP.<br />
                            <b>Ganará el jugador que haya conseguido más puntos</b>.
                        </p>
                    </div>

                </div>
                <div className={s.contmonito}>
                    <img src={monito} alt="" style={{ height: '600px' }} className={s.monito} />
                </div>
            </div>

        </div>
    )
}