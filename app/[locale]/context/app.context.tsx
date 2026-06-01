'use client'

import { createContext, ReactNode, useState } from "react";
import { AppContextProps, AppNotification, Coords } from "./app.interface";

export const AppContext = createContext<AppContextProps>({
    isVisible: false,
    isMenuOpened: false,
    notification: { status: "none", text: "" },
    mouseGuide: null,
    mouseText: "",

    setVisible: ()=> {},
    setMenuOpened: ()=> {},
    setNotification: ()=> {},
    setMouseGuide: ()=> {},
    setMouseText: ()=> {}
});

export const AppContextProvider = ({children}: {children: ReactNode})=> {
    const [ isVisible, setVisible ] = useState(false);
    const [isMenuOpened, setMenuOpened] = useState(false);
    const [mouseGuide, setMouseGuide] = useState<Coords | null>(null);
    const [mouseText, setMouseText] = useState("");
    const [notification, setNotification] = useState<AppNotification>({ status: "none", text: "" });

    return (
        <AppContext.Provider
            value={{
                isVisible: isVisible,
                isMenuOpened,
                notification,
                mouseGuide,
                mouseText,

                setVisible,
                setMenuOpened,
                setMouseGuide,
                setMouseText,
                setNotification
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
