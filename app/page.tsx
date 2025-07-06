import { ColorfulSquaresBackground, TypeWriterEffectText, ContainerTextFlip } from "@/components/index";
import { Timeline } from "./content/Timeline";
import { HelpfulLinks } from "./content/HelpfulLinks";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "History",
    description: "Here you can review the completed journey that Alexander has taken",
};

export default function Home() {
  const skills: string[] = [ 
    "Next.js", "React", "Tailwind", "Sass", "Framer-motion", "Docker",
    "Three.js", "Docker", "Amazon S3", "PHP", "Laravel", "Redis",
    "MySQL", "SQLite" 
  ];

  return (
    <>
      <section className="h-[90vh] relative w-full overflow-hidden bg-[#0a0a0a] flex flex-col items-center justify-center rounded-4xl mb-20">
        <div className="absolute inset-0 w-full h-full z-20 bg-radial from-transparent via-[#0a0a0a]/20 via-30% to-[#0a0a0a]/98 to-75% inset-shadow-3xl pointer-events-none" />
        <ColorfulSquaresBackground />

        <div className="flex flex-col gap-6">
          <TypeWriterEffectText>
            Site of Alexander Drobysz
          </TypeWriterEffectText>
          <div className="flex gap-2 items-center justify-center">
            <p className="text-center text-2xl text-transparent bg-gradient-to-br from-white to-gray-400 bg-clip-text relative z-20">
              I can work with
            </p>
            <ContainerTextFlip 
              words={skills}
            />
          </div>
        </div> 
      </section>
      <Timeline />
      <HelpfulLinks />
    </>
  );
}
