import projects from "@/data_json/project_intro_info.json";
import { ProjectDataObj } from "./ProjectDataSection.interface";
import { BlockOne, BlockTwo } from "./components/index";
import styles from "./ProjectDataSection.module.scss"

export const ProjectDataSection = ({ projectData }: ProjectDataObj)=> {
    const img = projects.find( p=> p.pagename === projectData.pagename )!.img;

    return (
        <section className={styles.project_section_wrapper}>
            <BlockOne 
                date={projectData.date}
                description={projectData.description}
            />
            <BlockTwo 
                projectData={projectData}
                img={img}
            />
        </section>
    );
};
