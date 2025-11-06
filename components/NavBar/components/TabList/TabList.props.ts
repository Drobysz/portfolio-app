import { CursorPosition } from "@/components/NavBar/NavBarProps.interface";

export interface TabListProps {
	setPosition: ( PosProps : CursorPosition )=> void;
	setPositionClicked: ( PosProps : CursorPosition )=> void;
}