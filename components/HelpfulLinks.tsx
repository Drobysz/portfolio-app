import { WobbleContainer } from "./WoobleContainer";
import Image from "next/image";

export const HelpfulLinks = ()=>{
    return (
        <section
            className="grid grid-cols-3 gap-6 mb-50" 
        >
            <WobbleContainer 
                className="col-span-2 h-[350px]"
                href="https://github.com/Drobysz"
                color="rosy"
            >
                <h3 className="text-white font-bold text-7xl">GitHub</h3>
                <Image 
                    src="/help_links/github.png"
                    className="absolute -bottom-30 -right-[20%] rounded-2xl"
                    width={600}
                    height={300}
                    alt="service img"
                />
            </WobbleContainer>
            <WobbleContainer color="blue">
                <h3 className="text-white font-bold text-7xl">Enjoy the site</h3>
            </WobbleContainer>
            <WobbleContainer 
                className="col-span-3 h-[300px]"
                href="https://www.linkedin.com/in/alexander-drobyshevski-9656b2330/?trk=opento_sprofile_topcard"
                color="pinkish"
            >
                <h3 className="text-white font-bold text-7xl">My LinkedIn</h3>
                <Image 
                    src="/help_links/linkedin.png"
                    className="absolute -bottom-30 -right-[5%] rounded-2xl"
                    width={600}
                    height={300}
                    alt="service img"
                />
            </WobbleContainer>
        </section>
    );
};