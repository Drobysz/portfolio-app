import { EventDetails, EventImage } from "./components/index";
import { InfoBlockProps } from "./InfoBlock.props";

export const InfoBlock = (
{
    title,
    description, 
    img
}: InfoBlockProps)=> {
    return (
        <div className="flex flex-col gap-10">
            <EventDetails 
                title={title}
                description={description}
            />
            <EventImage img={img}/>
        </div> 
    );
};