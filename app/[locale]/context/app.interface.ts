import { Dispatch, SetStateAction } from "react";

export type NotificationStatus = "error" | "alert" | "success" | "none";

export interface AppNotification {
    status: NotificationStatus;
    text: string;
}

export interface AppContextProps {
    isVisible: boolean;
    isMenuOpened: boolean;
    notification: AppNotification;

    setVisible: Dispatch<SetStateAction<boolean>>
    setMenuOpened: Dispatch<SetStateAction<boolean>>
    setNotification: Dispatch<SetStateAction<AppNotification>>;
};