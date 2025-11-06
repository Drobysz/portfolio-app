import { useRef, useState } from "react";
import { SMobj } from "./SMBlock.props";
import { useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { SMtag, SMicon, SMbody } from "./components/index";

export const SMBlock = ({
    title,
    link,
    img,
    mouseX
}: SMobj)=> {
    const ref = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState(false);

    const distance = useTransform(mouseX, (horizontalCoordindate)=> {
        const border = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

        return horizontalCoordindate - (border!.x + border!.width/2);
    });

    const blockTransform = useTransform(
        distance,
        [-150, 0, 150],
        [50, 80, 50]
    );

    const iconTransform = useTransform(
        distance,
        [-150, 0, 150],
        [50, 80, 50]
    );

    const transition = {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    };

    const blockSize = useSpring(blockTransform, transition);
    const iconSize = useSpring(iconTransform, transition);

    return (
        <Link
            href={link}
            target="_blank"
        >
            <SMbody
                ref={ref}
                blockSize={blockSize}
                setHovered={setHovered}
            >
                {hovered && <SMtag title={title}/>}
                <SMicon
                    img={img}
                    iconSize={iconSize}
                />
            </SMbody>
        </Link>  
    );
};