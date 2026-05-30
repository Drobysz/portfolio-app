import { Dispatch, SetStateAction } from "react";

export type NotificationStatus = "error" | "alert" | "success" | "none";

export interface AppNotification {
    status: NotificationStatus;
    text: string;
}

export interface Coords {
    x: number;
    y: number;
}

export interface AppContextProps {
    isVisible: boolean;
    isMenuOpened: boolean;
    notification: AppNotification;
    mouseGuide: Coords | null;
    mouseText: string;

    setVisible: Dispatch<SetStateAction<boolean>>;
    setMenuOpened: Dispatch<SetStateAction<boolean>>;
    setNotification: Dispatch<SetStateAction<AppNotification>>;
    setMouseGuide: Dispatch<SetStateAction<Coords | null>>;
    setMouseText: Dispatch<SetStateAction<string>>;
};