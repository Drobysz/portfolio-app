"use client"

import { Tab } from "./components/index";
import { usePathname } from "next/navigation";
import { TabListProps } from "./TabList.props";

export const TabList = ({
	setPosition,
	setPositionClicked
}: TabListProps)=> {
	const pathname = usePathname();
	const tabsList = [
        { href: '/', label: 'History' },
        { href: '/projects', label: 'Projects' },
        { href: '/resume', label: 'Resumé' },
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