import { Project } from "@/interfaces";
import { CursorProps } from "../../types";

export interface ProjectPanelProps extends React.HTMLAttributes<HTMLDivElement> {
    currentProject: Project;
    index: number;
    setPosition: ( PosProps : CursorProps )=> void;
};