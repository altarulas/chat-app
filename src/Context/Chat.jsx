import { createContext, useContext, useReducer } from "react";

import { AuthContext } from "./Auth";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
    const { currentUser } = useContext(AuthContext);

    const INITIAL_STATE = {
        chatId: "null",
        user: {},
        showChat: false,
    };

    const chatReducer = (state, action) => {
        switch (action.type) {
            case "SHOW_CHAT":
                return {
                    user: action.payload,
                    chatId:
                        currentUser.uid > action.payload.uid
                            ? currentUser.uid + action.payload.uid
                            : action.payload.uid + currentUser.uid,
                    showChat: true,
                };

            case "LOGOUT":
                return {
                    user: action.payload,
                    chatId:
                        currentUser.uid > action.payload.uid
                            ? currentUser.uid + action.payload.uid
                            : action.payload.uid + currentUser.uid,
                    showChat: false,
                };

            // eslint-disable-next-line no-fallthrough
            default:
                return state;
        }
    };



    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

    return (
        <ChatContext.Provider value={{ data: state, dispatch }}>
            {children}
        </ChatContext.Provider>
    );
};