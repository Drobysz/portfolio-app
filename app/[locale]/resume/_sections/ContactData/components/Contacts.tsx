import cn from "classnames";
import { avenir, impact } from "@/fonts/fonts";
import contacts from "./contacts.json";
import { useTranslations } from "next-intl";

export const Contacts = ()=> {;
    const t = useTranslations("Resume.contact");

    return (
        <ul className="flex w-full flex-col items-start gap-4">
            {contacts.map( (_, idx)=> (
                <li key={`contact-id-${idx}`}>
                    <h4 className={cn(
                        "text-white/95 text-sm",
                        impact.className
                    )}>
                        {t(`items.${idx}.source`)}
                    </h4>
                    <h4 className={cn(
                        "text-white/60 text-sm",
                        avenir.className
                    )}>
                        {t(`items.${idx}.value`)}
                    </h4>
                </li>
            ) )}
        </ul>
    );
};
