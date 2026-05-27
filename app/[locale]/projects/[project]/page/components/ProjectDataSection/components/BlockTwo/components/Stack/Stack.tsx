import { ProjectDataProps } from "../../../../ProjectDataSection.interface";
import { StackBody, SkillsList, StackTitleBody } from "./components/index"

export const Stack = ({ projectData }: {projectData: ProjectDataProps})=> {
    const stacks = [ 
        "Front-end", 
        "Back-end", 
        "Devops", 
    ];

    return (
        <StackBody>
            {Object.entries(projectData.stacks).map( ( [category, list], idx )=> (
                <div 
                    className="flex gap-3 max-[650px]:flex-col"
                    key={`id-${category}`}
                >
                    <StackTitleBody>
                        {stacks[idx]}
                    </StackTitleBody>
                    <SkillsList list={list} />
                </div>
            ))}
        </StackBody>
    );
};