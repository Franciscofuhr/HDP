import axios from "axios";

// export function createGame(obj){
//     // return async function (dispatch){
//         let post = await axios.post('http://localhost:3001/user', obj)
//     //     //console.log('soy post.data',post.data)
//     //     return dispatch({
//     //       type: 'NEW_USER',
//     //       payload: post.data,
//     //     })
//     // }
// }
export function userInfo(info) {
  return {
    type: "NEW_USER",
    payload: info,
  };
}

export function sendMessage(message) {
  return {
    type: "NEW_MESSAGE",
    payload: message,
  };
}
export function newRoomReset() {
  return {
    type: "NEW_ROOM_RESET",
    
  };
}
export function joinRoomId(room, create = true) {
  return async function (dispatch) {
    return dispatch({
      type: "JOIN_ROOM",
      payload: room,
    });
  };
}

export function cardPlayed(arrayCards) {
  console.log(arrayCards,"carte entregada")
  return {
    type: "CARD_PLAYED",
    payload: arrayCards,
  }
}

export function cardWinner(idWinner) {
  console.log('cardWinner')
  return {
    type: "CARD_WINNER",
    payload: idWinner,
  }
}
export function kingRoundSetting(idKing) {
  console.log('entro a king round giiiil')
  return {
    type: "KING_ROUND",
    payload: idKing,
  }
}

export function userConnectedOrDisc(userId) {
  console.log(userId,'hola')
  return {
    type: "USER_CONNECT",
    payload: userId, 
  };
}

export function roomInformation(roomInfo) {
  return {
    type: "USERS_ROOM",
    payload: roomInfo,
  };
}

export function DeleteKing(userId) {
  return {
    type: "DELETE_KING",
    payload: userId,
  };
}
export function gameWinner(userName) {
  return {
    type: "GAME_WINNER",
    payload: userName,
  };
}
