import s from "./style.module.scss";
import cn from "classnames";

// export type Tag = 
//     "new" 
//     | "soon" 
//     | "pet-project" 
//     | "game" 
//     | "shop" 
//     | "marketplace" 
//     | "saas"
//     | "new"
//     | "suspended";

export const ProjectTag = ({ 
    tagName,
    className
}: { 
    tagName: string;
    className?: string;
})=> {
    const isNotDefaultStyle = [
        "soon", "new", "suspended"
    ].includes(tagName);

    return (
        <span
            className={cn(
                className,
                s.body, {
                    ["text-gray-900 bg-white"]: !isNotDefaultStyle,
                    ["text-white"]: isNotDefaultStyle,
                    ["bg-blue-600"]: tagName == "soon",
                    ["bg-amber-400"]: tagName == "new",
                    ["bg-red-600"]: tagName == "suspended"
                }
            )}
        >
            {tagName}
        </span>
    )
}