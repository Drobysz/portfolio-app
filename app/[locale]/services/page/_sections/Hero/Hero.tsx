// import { ShaderBackground } from "@/components/animations/ShaderBackground/ShaderBackground";
import {
    Header,
    SwipingFolders,
} from "./_components";
import s from "./style.module.scss";
import { 
    ASCIIBackground 
} from "@/components/animations/ASCIIBackground/ASCIIBackground";

export const Hero = ()=> {
    return (
        <section className={s.hero_container}>
            <ASCIIBackground />
            <div 
                className={s.shader_background_container} 
            />
            <div 
                className={s.shader_background_container2} 
            />
            <div className={s.content_container}>
                <Header />
            </div>
            <div className="absolute inset-0 h-screen w-full overflow-hidden">
                <SwipingFolders />
            </div>
        </section>
    )
}
