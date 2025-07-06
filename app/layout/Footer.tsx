import { DetailedHTMLProps, HTMLAttributes } from "react";
import { Logo, DownloadBtn, SMbar } from "@/components/index";
import SMList from "@/data_json/SMList.json";
import cn from 'classnames';

type FooterType = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;


export const Footer = ({className}: FooterType)=> {

    return (
        <footer className={cn('border-t py-4 px-3 border-t-neutral-600 bg-[#0a0a0a] z-10 flex justify-between items-center max-[850px]:flex-col max-[850px]:justify-center max-[850px]:py-2 max-[850px]:gap-2', className)}>
            <div className="flex gap-2 max-[400px]:gap-6">
                <Logo titleClassName="max-[400px]:hidden"/>
                <DownloadBtn 
                    className="hidden max-[850px]:block"
                    href="/resume/CV_Drobysz.pdf"
                    downloadFileName="Drobyshevski_CV"
                >
                    Download CV
                </DownloadBtn>
            </div>
            <SMbar SMList={SMList} />
            <DownloadBtn 
                className="max-[850px]:hidden"
                href="/resume/CV_Drobysz.pdf"
                downloadFileName="Drobyshevski_CV"
            >
                Download CV
            </DownloadBtn>
        </footer>
    );
};