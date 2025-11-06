import { DetailedHTMLProps, HTMLAttributes } from "react";
import { Logo, SMbar } from "@/components/index";
import SMList from "@/data_json/SMList.json";
import cn from 'classnames';
import styles from "./Footer.module.scss";
import { DownloadBntSample } from "./components/index";

type FooterType = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const Footer = ({className}: FooterType)=> {
    return (
        <footer className={cn(styles.footer_section, className)}>
            <div className="flex gap-2 max-[400px]:gap-6">
                <Logo titleClassName="max-[400px]:hidden"/>
                <DownloadBntSample mode="mobile"/>
            </div>
            <SMbar SMList={SMList} />
            <DownloadBntSample mode="desktop"/>
        </footer>
    );
};