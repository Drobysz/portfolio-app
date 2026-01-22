"use client"

import cn from "classnames";
import { useContext } from "react";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { DownloadBtn, Navbar, Logo, HeaderWrapper, MenuBtn } from "@/components/index";
import { AppContext } from "../context/app.context";

type HeaderType = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const Header = ({className}: HeaderType)=> {
    const { isVisible } = useContext(AppContext);

    return (
        <HeaderWrapper className={className}>
            <Logo titleClassName={cn({
                ["max-[1210px]:hidden"]: isVisible,
                ["max-[490px]:hidden"]: !isVisible,
            })}/>
            <Navbar className={cn({
                ["max-[890px]:hidden"]: isVisible,
                ["max-[770px]:hidden"]: !isVisible,
            })}/>
            <div className="flex gap-2 items-center">
                <DownloadBtn 
                    href="/resume/CV_Drobyshevski.pdf"
                    downloadFileName="Drobyshevski_CV"
                >
                    Download CV
                </DownloadBtn>
                <MenuBtn className={cn({
                    ["min-[890px]:hidden"]: isVisible,
                    ["min-[770px]:hidden"]: !isVisible,
                })}/>
            </div>
        </HeaderWrapper>
    );
};