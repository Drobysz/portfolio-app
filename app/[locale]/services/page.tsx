import { PageView } from './page/PageView'
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Metadata.services" });

    return {
        title: t("title"),
        description: t("description"),
    };
}

export default function ServicesPage() {
    return (
        <>
            <PageView />
        </>
    )
}
