'use client'

import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";
import { AppContextProps, AppNotification } from "./app.interface";

export const AppContext = createContext<AppContextProps>({
    isVisible: false,
    isMenuOpened: false,
    notification: { status: "none", text: "" },

    setVisible: ()=> {},
    setMenuOpened: ()=> {},
    setNotification: () => {}
});

export const AppContextProvider = ({children}: {children: ReactNode})=> {
    const [ isVisible, setVisible ] = useState(false);
    const [isMenuOpened, setMenuOpened] = useState(false);
    const [notification, setNotification] = useState<AppNotification>({ status: "none", text: "" });


    return (
        <AppContext.Provider
            value={{
                isVisible: isVisible,
                isMenuOpened,
                notification,

                setVisible,
                setMenuOpened,
                setNotification
            }}
        >
            {children}
        </AppContext.Provider>
    );
};