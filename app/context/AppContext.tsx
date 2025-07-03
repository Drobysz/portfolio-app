'use client'

import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

interface AppContextProps {
    isVisible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>
};

export const AppContext = createContext<AppContextProps>({
    isVisible: false,
    setVisible: ()=> {}
});

export const AppContextProvider = ({children}: {children: ReactNode})=> {
    const [ isVisible, setVisible ] = useState(false);

    return (
        <AppContext.Provider
            value={{
                isVisible: isVisible,
                setVisible
            }}
        >
            {children}
        </AppContext.Provider>
    );
};