"use client"

import cn from "classnames";
import { useContext } from "react";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { AppContext } from "../../context/app.context";
import { useWindowWidth } from "@/hooks";

import { 
    DownloadBtn, 
    Navbar, 
    Logo 
} from "@/components";

import { 
    HeaderWrapper, 
    MenuBtn 
} from "./_components";

type HeaderType = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const Header = ({className}: HeaderType)=> {
    const { isVisible } = useContext(AppContext);
    const width = useWindowWidth();
    const canShowPagination = (!isVisible && width >= 850) || (isVisible && width >= 1080);

    return (
        <HeaderWrapper 
            className={className}
            canShowPagination={canShowPagination}
        >
            <Logo 
                titleClassName={cn({
                    ["max-[490px]:hidden"]: isVisible,
                })}
                isVisible={!isVisible}
            />
            {canShowPagination && <Navbar />}
            <div className="flex gap-2 items-center">
                <DownloadBtn 
                    href="/resume/CV_Drobyshevski.pdf"
                    downloadFileName="Drobyshevski_CV"
                >
                    Download CV
                </DownloadBtn>
                <MenuBtn className={cn({
                    ["min-[850px]:hidden"]: !isVisible,
                    ["min-[1080px]:hidden"]: isVisible,
                })}/>
            </div>
        </HeaderWrapper>
    );
};
