import { BackgroundLines } from "@/components/animations/BackgroundLines";
import { ProjectIntro, ProjectsFeed } from "./_sections/index";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Here you can get acquainted with projects of beginning developer Alexander Drobysz",
};

export default function ProjectPage (){
    return (
        <div className="flex flex-col gap-15 max-[780px]:gap-5">
            <ProjectIntro />
            <ProjectsFeed />
            <BackgroundLines className="-z-10"/>
        </div>
    );
};
