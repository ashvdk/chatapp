import { combineReducers } from "redux";
import ChatList from "../components/ChatList";

const login = (state = { user: null }, action) => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

const selectChat = (state = { selectedChat: null }, action) => {
  switch (action.type) {
    case "selectedtochat":
      return {
        ...state,
        selectedChat: action.payload,
      };
    default:
      return state;
  }
};

const appReducer = combineReducers({
  login,
  selectChat,
});

const rootReducer = (state, action) => {
  // Clear all data in redux store to initial.
  if (action.type === "logout") {
    state = undefined;
  }
  return appReducer(state, action);
};
export default rootReducer;
