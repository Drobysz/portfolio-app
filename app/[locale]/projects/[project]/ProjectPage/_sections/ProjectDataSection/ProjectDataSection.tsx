import projects from "@/data_json/project_intro_info.json";
import { BlockOne, BlockTwo } from "./_components/index";
import s from "./style.module.scss"
import { Project } from "@/interfaces";

export const ProjectDataSection = ({ project }: { project: Project })=> {
    return (
        <section className={s.project_section_wrapper}>
            <BlockOne 
                period={project.period ?? ""}
                description={project.description ?? ""}
            />
            <BlockTwo 
                project={project}
            />
        </section>
    );
};
