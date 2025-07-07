import { WobbleContainer } from "../../components/WoobleContainer";
import Image from "next/image";

export const HelpfulLinks = ()=>{
    return (
        <section
            className="grid grid-cols-3 gap-6 mb-50" 
        >
            <WobbleContainer 
                className="col-span-2 h-[350px] cursor-pointer max-[1080px]:h-[250px] max-[580px]:h-[150px] max-[350px]:col-span-3"
                href="https://github.com/Drobysz"
                color="rosy"
            >
                <h3 className="text-white font-bold text-7xl max-[580px]:text-5xl max-[350px]:text-3xl">GitHub</h3>
                <Image 
                    src="help_links/github.png"
                    className="absolute -bottom-30 -right-[20%] rounded-2xl max-[1080px]:-bottom-48"
                    width={600}
                    height={300}
                    alt="service img"
                />
            </WobbleContainer>
            <WobbleContainer 
                color="blue"
                className="max-[1080px]:h-[250px] max-[580px]:h-[150px] max-[350px]:col-span-3"
                centralize
            >
                <h3 className="text-white font-bold text-7xl w-full max-[1080px]:text-6xl max-[670px]:text-4xl max-[450px]:text-lg">Enjoy the site</h3>
            </WobbleContainer>
            <WobbleContainer 
                className="col-span-3 h-[300px] cursor-pointer max-[430px]:h-[150px]"
                href="https://www.linkedin.com/in/alexander-drobyshevski-9656b2330/?trk=opento_sprofile_topcard"
                color="pinkish"
            >
                <h3 className="text-white font-bold text-7xl z-50 max-[565px]:text-5xl max-[430px]:text-4xl max-[350px]:text-3xl">My LinkedIn</h3>
                <Image 
                    src="help_links/linkedin.png"
                    className="absolute -bottom-30 -right-[5%] rounded-2xl max-[1080px]:-bottom-50 max-[1080px]:-right-[15%] max-[750px]:-right-[35%] max-[565px]:-bottom-25 max-[450px]:-bottom-15 max-[430px]:hidden"
                    width={600}
                    height={300}
                    alt="service img"
                />
            </WobbleContainer>
        </section>
    );
};