import { BackgroundLines }  from "@/components/index";
import { ProjectIntro, ProjectsFeed } from "./_sections/index";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Here you can get acquainted with projects of beginning developer Alexander Drobysz",
};

export default function ProjectPage (){
    return (
        <>
            <ProjectIntro />
            <ProjectsFeed />
            <BackgroundLines className="-z-10"/>
        </>
    );
};