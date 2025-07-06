import cn from "classnames";
import { avenir, impact } from "@/fonts/fonts";

export const Contacts = ()=> {
    const contacts = [
        {
            contactSource: "📱  number",
            contact: "+33 6 63 62 03 95"
        },
        {
            contactSource: "📫  email",
            contact: "alexdrobyszfr@gmail.com"
        },
        {
            contactSource: "📍  location",
            contact: "Champs-sur-Marne, Ile-de-France"
        },
    ];

    return (
        <ul className="flex w-full flex-col items-start gap-4">
            {contacts.map( (c, idx)=> (
                <li
                    key={`contact-id-${idx}`}
                    className=""
                >
                    <h4
                        className={cn("text-white/95 text-sm", impact.className)}
                    >
                        {c.contactSource}
                    </h4>
                    <h4 className={cn("text-white/60 text-sm", avenir.className)}>
                        {c.contact}
                    </h4>
                </li>
            ) )}
        </ul>
    );
};