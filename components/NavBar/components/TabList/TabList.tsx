"use client"

import { Tab } from "./components/index";
import { usePathname } from "@/i18n/navigation";
import { TabListProps } from "./TabList.props";
import { useTranslations } from "next-intl";

export const TabList = ({
	setPosition,
	setPositionClicked
}: TabListProps)=> {
	const pathname = usePathname();
	const t = useTranslations("Layout");
	const tabsList = [
        { href: '/', label: t('nav.0') },
        { href: '/projects', label: t('nav.1') },
        { href: '/resume', label: t('nav.2') },
    ];
	return (
		<>
			{ tabsList.map(tab=> (
				<Tab
					key={"id_" + tab.label}
					isActive={pathname === tab.href}
					setPosition={setPosition}
					setPositionClicked={setPositionClicked}
					href={tab.href}
				>
					{tab.label}
				</Tab>
			))}
		</>
	)
}
