'use client'

import { useRef } from "react";
import { Bubletext } from "./index"
import { useScroll, useSpring, useTransform, motion, MotionValue } from "framer-motion";

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
            className="flex flex-col relative gap-60 justify-center mb-180"
        >
            <Line 
                scaleY={scaleY}
                background={background}
            />
            <Bubletext 
                text="History in timeline" 
                className="self-center text-white text-8xl"
            />
            <div     
                className="flex flex-col gap-180"
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
            <div className="flex gap-12 items-center sticky top-0">
                <div 
                className="h-2 w-2 bg-neutral-800 p-2 rounded-full border border-neutral-700 ring-10 ring-black"
                />
                <h2 className="text-7xl text-neutral-500 font-bold">
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
                <h3 className="text-white text-4xl">
                    {title}
                </h3>
                <p className="text-transparent bg-gradient-to-br from-white to-gray-400 bg-clip-text">
                    {description}
                </p>
            </div>
            <div 
                className="w-[80%] h-[300px] rounded-4xl border-4 border-neutral-600"
                style={{
                    backgroundImage: `url(/history/${img}.png)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />
        </div> 
    );
};

const data = [
    { 
        date: "2020",
        title: "Olympiade",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc neque tellus, faucibus in magna et, hendrerit euismod magna. Donec viverra pulvinar erat a rutrum. Proin feugiat blandit maximus. Cras eros risus, sodales vel malesuada et, fringilla in velit. Vivamus ornare enim vitae purus rutrum ullamcorper. Nullam lacinia congue ex, vulputate suscipit velit mollis at. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla eu euismod metus. Suspendisse a nibh vulputate, commodo turpis vitae, blandit purus. Pellentesque pretium congue consequat. Fusce vehicula tellus eros, et congue purus tristique in.",
        img: "Olympiade" 
    },
    { 
        date: "2024 May",
        title: "E-Commerce, Telegram bots, Freelance, Self-education",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc neque tellus, faucibus in magna et, hendrerit euismod magna. Donec viverra pulvinar erat a rutrum. Proin feugiat blandit maximus. Cras eros risus, sodales vel malesuada et, fringilla in velit. Vivamus ornare enim vitae purus rutrum ullamcorper. Nullam lacinia congue ex, vulputate suscipit velit mollis at. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla eu euismod metus. Suspendisse a nibh vulputate, commodo turpis vitae, blandit purus. Pellentesque pretium congue consequat. Fusce vehicula tellus eros, et congue purus tristique in.",
        img: "Bot" 
    },
    { 
        date: "2024-2025",
        title: "Joining to IUT de Marne-la-Vallé",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc neque tellus, faucibus in magna et, hendrerit euismod magna. Donec viverra pulvinar erat a rutrum. Proin feugiat blandit maximus. Cras eros risus, sodales vel malesuada et, fringilla in velit. Vivamus ornare enim vitae purus rutrum ullamcorper. Nullam lacinia congue ex, vulputate suscipit velit mollis at. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla eu euismod metus. Suspendisse a nibh vulputate, commodo turpis vitae, blandit purus. Pellentesque pretium congue consequat. Fusce vehicula tellus eros, et congue purus tristique in.",
        img: "IUT" 
    },
    { 
        date: "2025-present",
        title: "Self-education",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc neque tellus, faucibus in magna et, hendrerit euismod magna. Donec viverra pulvinar erat a rutrum. Proin feugiat blandit maximus. Cras eros risus, sodales vel malesuada et, fringilla in velit. Vivamus ornare enim vitae purus rutrum ullamcorper. Nullam lacinia congue ex, vulputate suscipit velit mollis at. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla eu euismod metus. Suspendisse a nibh vulputate, commodo turpis vitae, blandit purus. Pellentesque pretium congue consequat. Fusce vehicula tellus eros, et congue purus tristique in.",
        img: "Self-education" 
    },
];