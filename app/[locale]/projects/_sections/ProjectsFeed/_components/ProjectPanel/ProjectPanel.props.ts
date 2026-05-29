import { Project } from "@/interfaces";
import { CursorProps } from "../../types";

export interface ProjectPanelProps {
    currentProject: Project;
    index: number;
    setPosition: ( PosProps : CursorProps )=> void;
};