import s from "./style.module.scss";
import { useTranslations } from "next-intl";

export const Header = ()=> {
    const t = useTranslations("Services.hero");

    return (
        <header className="pt-10 pl-10 max-[995px]:pt-4 max-[400px]:pl-0">
            <div className={s.header_container}>
                <h1 className={s.title}>
                    {t("title")}
                </h1>
                <p className={s.subtitle}>
                    {t("subtitle")}
                </p>
            </div>
        </header>
    )
}
