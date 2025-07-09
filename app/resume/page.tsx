import { GlowingEffect, CardSpotlight } from "@/components/index";
import { Metadata } from "next";
import { AboutMe, Skills, Experience, Education, Contacts } from "./content/indexCV";
import cn from "classnames";
import { tronecal } from "@/fonts/fonts";

export const metadata: Metadata = {
    title: "Resumé",
    description: "Here you can familiarize with Alexander's resumé",
};

export default function ResumePage () {

    return(
        <>
            <section className="h-full w-full grid grid-cols-4 gap-4 py-7 max-[650px]:flex max-[650px]:flex-col">
                <ContactData />
                <CV />
            </section>
        </>
        
    )
};

const ContactData = ()=> {
    return (
        <GlowingEffect 
            className="col-span-1 relative min-w-[200px] h-[80vh] rounded-4xl max-[1110px]:col-span-2"
            glow
            disabled={false}
            spread={80}
        >
            <section
                className="relative h-full w-full border-2 p-3.5 bg-[#0e0e0e] rounded-[inherit] shadow-2xl"
            >
                <div 
                    className="h-full w-full flex flex-col items-center rounded-2xl bg-[#0a0a0a] shadow-[0px_0px_27px_0px_#2D2D2D] p-5 transition-all duration-300"
                >
                    <div
                        className="h-[300px] min-w-[200px] rounded-2xl mb-5 border-3 border-zinc-700"
                        style={{
                            backgroundImage: "url(/portfolio.jpeg)",
                            backgroundSize: "cover",
                        }}
                    />
                    <h3 className={cn("text-white mb-2", tronecal.className)}>Alexander DROBYSHEVSKY</h3>
                    <Contacts />
                </div>
            </section>
        </GlowingEffect>
    );
};

const CV = ()=> {
    return (
        <GlowingEffect 
            className="col-span-3 relative h-[80vh] rounded-4xl max-[1110px]:col-span-2"
            glow
            disabled={false}
            spread={80}
        >
            <section
                className="max-w-xs2 h-full w-full border-2 p-3.5 bg-[#0e0e0e] rounded-[inherit] shadow-2xl"
            >
                <div className="h-full shadow-[0px_0px_27px_0px_#2D2D2D] scroll-smooth rounded-xl overflow-y-scroll overflow-x-hidden">
                    <CardSpotlight className="flex flex-col gap-12 justify-between">
                        <AboutMe />
                        <Skills />
                        <Experience />
                        <Education />
                    </CardSpotlight>
                </div>
            </section>
        </GlowingEffect>
    );
};