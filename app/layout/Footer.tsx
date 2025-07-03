import { DetailedHTMLProps, HTMLAttributes } from "react";
import { Logo, DownloadBtn, SMbar } from "@/components/index";
import SMList from "@/data_json/SMList.json";
import cn from 'classnames';

type FooterType = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;


export const Footer = ({className}: FooterType)=> {

    return (
        <footer className={cn('border-t py-4 px-3 border-t-neutral-600 flex justify-between items-center', className)}>
            <Logo />
            <SMbar SMList={SMList} />
            <DownloadBtn 
                href="/resume/CV_Drobysz.pdf"
                downloadFileName="Drobyshevski_CV"
            >
                Download CV
            </DownloadBtn>
        </footer>
    );
};