import { useReducer, createContext } from "react";

export const UserContext = createContext();

function listImages() {
  let temp = [];
  for (let i = 0; i <= 20; i++) {
    temp.push(`/Avatars/avatar_${i}.png`);
  }
  return temp;
}

const inintialUser = {
  user: {
    userId: "",
    userName: "",
    pin: Number,
    photoURL: "",
    time: "",
    // addedusers: [],
    // requestusers: [],
  },
  login: false,
  images: listImages(),
};
console.log("context called");
const reducer = (state, action) => {
  switch (action.type) {
    case "CREATEUSER":
      return {
        user: {
          userId: state.user.userId,
          userName: action.payload.userName,
          pin: action.payload.pin,
          photoURL: state.user.photoURL,
          time: action.payload.time,
          // addedusers: state.user.addedusers,
          // requestusers: state.user.requestusers,
        },
        login: state.login,
        images: state.images,
      };
    case "SETAVATAR":
      return {
        user: {
          userId: state.user.userId,
          userName: state.user.userName,
          pin: state.user.pin,
          photoURL: action.payload.photoURL,
          time: state.user.time,
          // addedusers: state.user.addedusers,
          // requestusers: state.user.requestusers,
        },
        login: state.login,
        images: state.images,
      };
    case "Login":
      return {
        user: {
          userId: action.payload.userId,
          userName: action.payload.userName,
          pin: action.payload.pin,
          photoURL: action.payload.photoURL,
          time: action.payload.time,
          // addedusers: action.payload.addedusers,
          // requestusers: state.user.requestusers,
        },
        login: true,
        images: state.images,
      };
    case "Logout":
      return {
        user: {
          userId: "",
          userName: "",
          pin: Number,
          photoURL: "",
          time: "",
          // addedusers: [],
          // requestusers: [],
        },
        login: false,
        images: state.images,
      };
      case "SETUSERID":
        return {
          user: {
            userId: action.payload.userId,
            userName: state.user.userName,
            pin:state.user.pin,
            photoURL: state.user.photoURL,
            time: state.user.time,
            // addedusers: state.user.addedusers,
            // requestusers: state.user.requestusers,
          },
          login: state.login,
          images: state.images,
        };
    default:
      return state;
  }
};

export const UserContextProvider = (props) => {
  const [state, dispath] = useReducer(reducer, inintialUser);

  return (
    <UserContext.Provider value={[state, dispath]}>
      {props.children}
    </UserContext.Provider>
  );
};
