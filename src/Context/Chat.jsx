import { createContext, useContext, useReducer, useState } from "react";

import { AuthContext } from "./Auth";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    const INITIAL_STATE = {
        chatId: "null",
        user: {},
    };

    const [visible, setVisible] = useState(false);

    const chatReducer = (state, action) => {
        setVisible(true);
        switch (action.type) {
            case "CHANGE_USER":
                return {
                    user: action.payload,
                    chatId:
                        currentUser.uid > action.payload.uid
                            ? currentUser.uid + action.payload.uid
                            : action.payload.uid + currentUser.uid,
                };

            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

    return (
        <ChatContext.Provider value={{ data: state, dispatch, visible }}>
            {children}
        </ChatContext.Provider>
    );
};