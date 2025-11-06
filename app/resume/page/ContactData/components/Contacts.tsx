import cn from "classnames";
import { avenir, impact } from "@/fonts/fonts";
import contacts from "./contacts.json";

export const Contacts = ()=> {;
    return (
        <ul className="flex w-full flex-col items-start gap-4">
            {contacts.map( (c, idx)=> (
                <li key={`contact-id-${idx}`}>
                    <h4 className={cn(
                        "text-white/95 text-sm",
                        impact.className
                    )}>
                        {c.contactSource}
                    </h4>
                    <h4 className={cn(
                        "text-white/60 text-sm",
                        avenir.className
                    )}>
                        {c.contact}
                    </h4>
                </li>
            ) )}
        </ul>
    );
};