'use client'

import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

interface AppContextProps {
    isVisible: boolean;
    isMenuOpened: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>
    setMenuOpened: Dispatch<SetStateAction<boolean>>
};

export const AppContext = createContext<AppContextProps>({
    isVisible: false,
    isMenuOpened: false,
    setVisible: ()=> {},
    setMenuOpened: ()=> {},
});

export const AppContextProvider = ({children}: {children: ReactNode})=> {
    const [ isVisible, setVisible ] = useState(false);
    const [isMenuOpened, setMenuOpened] = useState(false);


    return (
        <AppContext.Provider
            value={{
                isVisible: isVisible,
                isMenuOpened,
                setVisible,
                setMenuOpened
            }}
        >
            {children}
        </AppContext.Provider>
    );
};