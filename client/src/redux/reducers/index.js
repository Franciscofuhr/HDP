const initialState = {
  user: "",
  roomCode: "",
  userPicture: 0,
  messages: [],
  allRooms: [],
  usersRoom: [],
  roomInfo: {},
  gameWinner: "",
};

export default function RootReducer(state = initialState, action) {
  switch (action.type) {
    case "NEW_USER":
      console.log(action.payload.name, "payload en reducer");
      return {
        ...state,
        user: action.payload.name,
        userPicture: action.payload.picture,
      };
    case "NEW_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case "NEW_ROOM_RESET":
      return {
        ...state,
        messages: [],
        roomCode: "",
        usersRoom: [],
        roomInfo: {},
        gameWinner: "",
      };
    case "JOIN_ROOM":
      return {
        ...state,
        roomCode: action.payload,
      };
    case "ALL_ROOM":
      return {
        ...state,
        allRooms: action.payload,
      };
    case "CARD_PLAYED":
      let users = [...state.usersRoom];
      action.payload?.map((cardInf) => {
        for (let i = 0; i < users.length; i++) {
          if (users[i].key === cardInf.socketId) {
            users[i].selectCard = cardInf.card;
          }
        }
      });
      return {
        ...state,
        usersRoom: [...users],
      };
    case "USER_CONNECT":
      let deletePlayer = [...state.usersRoom];
      console.log(action.payload, "king");
      let filterArray = deletePlayer.filter((elem) => {
        console.log(elem.key, "soy ?king");
        return elem.key !== action.payload;
      });

      return {
        ...state,
        usersRoom: [...filterArray],
      };
    case "USERS_ROOM":
      let usersFromRoom = [];

      for (const key in action.payload.users) {
        usersFromRoom = [
          ...usersFromRoom,
          {
            key: key,
            name: action.payload.users[key].name,
            userPicture: action.payload.users[key].userPicture,
            points: action.payload.users[key].points,
            selectCard: false,
            cardRoundWinner: false,
            kingRound: false,
          },
        ];
      }
      return {
        ...state,
        usersRoom: [...usersFromRoom],
      };
    case "CARD_WINNER":
      let userss = [...state.usersRoom];
      for (let i = 0; i < userss.length; i++) {
        if (userss[i].key === action.payload) {
          userss[i].cardRoundWinner = true;
        }
      }
      return {
        ...state,
        usersRoom: [...userss],
      };
    case "KING_ROUND":
      let king = [...state.usersRoom];
      console.log(king, "king");
      for (let i = 0; i < king.length; i++) {
        if (king[i].key === action.payload) {
          king[i].kingRound = true;
        }
      }

      return {
        ...state,
        usersRoom: [...king],
      };
    case "DELETE_KING":
      let deleteKing = [...state.usersRoom];
      console.log(king, "king");
      deleteKing.filter((elem) => {
        return elem.key !== action.payload;
      });

      return {
        ...state,
        usersRoom: [...deleteKing],
      };
    case "GAME_WINNER":
      

      return {
        ...state,
        gameWinner: action.payload,
      };
    default:
      return state;
  }
}
