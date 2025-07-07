'use client'

import { useRef } from "react";
import { Bubletext } from "@/components/index"
import { useScroll, useSpring, useTransform, motion, MotionValue } from "framer-motion";
import data from "@/data_json/timeline_data.json";

export const Timeline = ()=> {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref
    });
    const scaleY = useSpring(scrollYProgress);
    const background = useTransform(scrollYProgress,
        [0, 1],
        ['#0F1EF0', '#A9389F']
    );

    return (
        <section 
            ref={ref} 
            className="flex flex-col relative gap-60 justify-center mb-180 max-[890px]:gap-30"
        >
            <Line 
                scaleY={scaleY}
                background={background}
            />
            <Bubletext 
                text="History in timeline" 
                className="text-center font-extralight text-white text-8xl max-[890px]:text-7xl max-[590px]:text-5xl max-[420px]:text-4xl"
            />
            <div     
                className="flex flex-col gap-180 max-[600px]:gap-130 max-[390px]:gap-160"
            >
                {data.map((timeBlock, index)=> (
                    <div
                        key={`id-${index}`}
                        className="relative grid grid-cols-2 h-[200px]"
                    >
                       <DateTitle date={timeBlock.date}/>
                       <InfoBlock 
                            title={timeBlock.title}
                            description={timeBlock.description}
                            img={timeBlock.img}
                       />
                    </div>
                ))}
            </div>
        </section>
    );
};

const Line = ({
    scaleY,
    background
}: {
    scaleY: MotionValue<number>;
    background: MotionValue<string>;
})=> {
    return (
        <motion.div 
            className="w-1 h-[107%] absolute top-40 origin-top left-1.5 rounded-full"
            style={{
                scaleY: scaleY,
                background: background
            }}
        >
            <motion.div 
                className="h-full bg-linear-to-b from-15% from-black to-transparent z-20"
            />
        </motion.div>
    );
};

const DateTitle = ({date}: {date: string})=> {
    return (
        <div>
            <div className="flex gap-12 items-center sticky top-20 max-[600px]:gap-6">
                <div 
                className="h-2 w-2 bg-neutral-800 p-2 rounded-full border border-neutral-700 ring-10 ring-black"
                />
                <h2 className="text-7xl text-neutral-500 font-bold max-[600px]:text-4xl max-[390px]:text-2xl">
                    {date}
                </h2>
            </div>    
        </div>
    );
};

const InfoBlock = (
{
    title,
    description, 
    img
}: {
    title: string,
    description: string,
    img: string
})=> {
    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-8">
                <h3 className="text-white text-4xl max-[600px]:text-2xl max-[390px]:text-lg">
                    {title}
                </h3>
                <p className="text-transparent bg-gradient-to-br from-white to-gray-400 bg-clip-text max-[600px]:text-xs">
                    {description}
                </p>
            </div>
            <div 
                className="w-[80%] h-[300px] rounded-4xl border-4 border-neutral-600 max-[390px]:rounded-2xl max-[390px]:h-[100px] max-[600px]:h-[150px] max-[600px]:rounded-3xl max-[900px]:h-[200px]"
                style={{
                    backgroundImage: `url(history/${img}.png)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />
        </div> 
    );
};