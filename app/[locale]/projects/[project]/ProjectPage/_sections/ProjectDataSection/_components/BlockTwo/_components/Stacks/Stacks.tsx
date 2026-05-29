import { Stack } from "@/interfaces";
import { StackBody, SkillsList, StackTitleBody } from "./_components/index"

export const Stacks = ({ stacks }: { stacks: Stack[] })=> {
    return (
        <StackBody>
            {stacks.map( ( {name, technologies}, idx )=> {
                const technologiesList = technologies?.split(/,\s*/).map((item) => item.trim()).filter(Boolean);

                return (
                    <div 
                        className="flex gap-3 max-[650px]:flex-col"
                        key={`id-${idx}-${name}`}
                    >
                        <StackTitleBody>
                            {name}
                        </StackTitleBody>
                        <SkillsList 
                            list={technologiesList ?? []} 
                        />
                    </div>
                )
            })}
        </StackBody>
    );
};